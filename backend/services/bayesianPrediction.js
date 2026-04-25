const POPULATION_MEAN = 28;
const POPULATION_STD = 3.5;
const POPULATION_VAR = POPULATION_STD ** 2;

const bayesianUpdate = (priorMean, priorVar, observations, likelihoodVar) => {
  if (!observations || observations.length === 0) {
    return { posteriorMean: priorMean, posteriorVar: priorVar };
  }
  const n = observations.length;
  const sampleMean = observations.reduce((a, b) => a + b, 0) / n;
  const posteriorVar = 1 / (1 / priorVar + n / likelihoodVar);
  const posteriorMean = posteriorVar * (priorMean / priorVar + (n * sampleMean) / likelihoodVar);
  return { posteriorMean, posteriorVar };
};

const bayesianCyclePrediction = (cycleHistory, user) => {
  const observedCycleLengths = [];
  for (let i = 0; i < cycleHistory.length - 1; i++) {
    const current = new Date(cycleHistory[i].startDate);
    const previous = new Date(cycleHistory[i + 1].startDate);
    const gap = Math.round((current - previous) / (1000 * 60 * 60 * 24));
    if (gap >= 21 && gap <= 45) observedCycleLengths.push(gap);
  }

  let likelihoodVar = POPULATION_VAR;
  if (observedCycleLengths.length >= 2) {
    const mean = observedCycleLengths.reduce((a, b) => a + b, 0) / observedCycleLengths.length;
    const sampleVar = observedCycleLengths.reduce((s, x) => s + (x - mean) ** 2, 0) / observedCycleLengths.length;
    likelihoodVar = Math.max(sampleVar, 1);
  }

  const { posteriorMean, posteriorVar } = bayesianUpdate(POPULATION_MEAN, POPULATION_VAR, observedCycleLengths, likelihoodVar);
  const posteriorStd = Math.sqrt(posteriorVar);
  const predictedCycleLength = Math.round(posteriorMean);
  const lastPeriod = new Date(user.lastPeriodDate);

  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + predictedCycleLength);

  const ovulationDate = new Date(lastPeriod);
  ovulationDate.setDate(lastPeriod.getDate() + Math.floor(predictedCycleLength / 2));

  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(ovulationDate.getDate() - 5);

  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(ovulationDate.getDate() + 1);

  const sixMonthForecast = [];
  for (let i = 1; i <= 6; i++) {
    const forecastPeriod = new Date(lastPeriod);
    forecastPeriod.setDate(lastPeriod.getDate() + predictedCycleLength * i);
    const forecastOvulation = new Date(forecastPeriod);
    forecastOvulation.setDate(forecastPeriod.getDate() - predictedCycleLength + Math.floor(predictedCycleLength / 2));
    const forecastFertileStart = new Date(forecastOvulation);
    forecastFertileStart.setDate(forecastOvulation.getDate() - 5);
    const forecastFertileEnd = new Date(forecastOvulation);
    forecastFertileEnd.setDate(forecastOvulation.getDate() + 1);
    const confidenceMarginI = Math.round(1.96 * posteriorStd * Math.sqrt(i));
    sixMonthForecast.push({
      cycleNumber: i,
      periodDate: forecastPeriod,
      ovulationDate: forecastOvulation,
      fertileWindowStart: forecastFertileStart,
      fertileWindowEnd: forecastFertileEnd,
      earliestDate: new Date(new Date(forecastPeriod).setDate(forecastPeriod.getDate() - confidenceMarginI)),
      latestDate: new Date(new Date(forecastPeriod).setDate(forecastPeriod.getDate() + confidenceMarginI)),
      month: forecastPeriod.toLocaleString('default', { month: 'long', year: 'numeric' })
    });
  }

  const confidenceMargin = Math.round(1.96 * posteriorStd);
  const earliestPeriod = new Date(nextPeriod);
  earliestPeriod.setDate(nextPeriod.getDate() - confidenceMargin);
  const latestPeriod = new Date(nextPeriod);
  latestPeriod.setDate(nextPeriod.getDate() + confidenceMargin);

  const confidenceScore = Math.round(Math.max(0, Math.min(100,
    (1 - posteriorVar / POPULATION_VAR) * 60 + (observedCycleLengths.length * 8)
  )));

  const today = new Date();
  const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
  const periodLength = user.periodLength || 5;

  let currentPhase;
  if (daysSinceLastPeriod <= periodLength) currentPhase = 'menstrual';
  else if (daysSinceLastPeriod <= Math.floor(predictedCycleLength / 2) - 2) currentPhase = 'follicular';
  else if (daysSinceLastPeriod <= Math.floor(predictedCycleLength / 2) + 2) currentPhase = 'ovulation';
  else currentPhase = 'luteal';

  const dataPoints = observedCycleLengths.length;
  let modelNote;
  if (dataPoints === 0) modelNote = 'Using population average (log more cycles for personalized predictions)';
  else if (dataPoints === 1) modelNote = 'Based on 1 cycle + population data (log more cycles to improve accuracy)';
  else if (dataPoints < 4) modelNote = `Based on ${dataPoints} cycles + Bayesian prior (accuracy improving)`;
  else modelNote = `High confidence — based on ${dataPoints} personal cycles`;

  return {
    nextPeriod, ovulationDate, fertileWindowStart, fertileWindowEnd,
    currentPhase, daysSinceLastPeriod, sixMonthForecast,
    predictedCycleLength, confidenceScore, confidenceMargin,
    earliestPeriod, latestPeriod,
    posteriorMean: Math.round(posteriorMean * 10) / 10,
    posteriorStd: Math.round(posteriorStd * 10) / 10,
    observedCycles: observedCycleLengths, dataPoints, modelNote,
    model: 'Bayesian Gaussian Inference',
    priorMean: POPULATION_MEAN,
    priorStd: POPULATION_STD,
  };
};

module.exports = { bayesianCyclePrediction };
