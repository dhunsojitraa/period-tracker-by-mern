# Cycle Prediction System

## Overview

The application uses a Bayesian Gaussian Inference model to predict menstrual cycle dates. The model combines population-level prior knowledge with the user's personal cycle history to generate increasingly accurate predictions over time.

## How It Works

### Bayesian Inference

The model applies Bayes' theorem using a Gaussian (normal) distribution:

- **Prior**: Population average cycle length of 28 days with a standard deviation of 3.5, based on medical research. This represents what we know before seeing any user data.
- **Likelihood**: The user's own observed cycle lengths from logged period data.
- **Posterior**: The updated belief after combining the prior with the user's data. This becomes more personalized with each logged cycle.

### Update Formula

```
posterior_variance = 1 / (1/prior_variance + n/likelihood_variance)
posterior_mean = posterior_variance * (prior_mean/prior_variance + n * sample_mean/likelihood_variance)
```

### What Gets Calculated

1. Next period date
2. Ovulation date (mid-cycle)
3. Fertile window (5 days before ovulation to 1 day after)
4. Current cycle phase (menstrual, follicular, ovulation, luteal)
5. 6-month forecast with confidence intervals
6. Confidence score (0-100%)

### Confidence Interval

The model calculates a 95% confidence interval using 1.96 standard deviations. The interval widens for future predictions, which is mathematically correct behavior as uncertainty increases over time.

## Accuracy

- 0 cycles logged: Uses population average (28 days)
- 1-2 cycles logged: Blends personal data with population prior
- 3+ cycles logged: Increasingly personalized predictions
- 4+ cycles logged: High confidence, minimal population influence

Accuracy for regular cycles: 75-85%

## Smart Cycle Learning

Every time a new period is logged, the system automatically recalculates the average cycle length from the last 3 cycles and updates the user's stored cycle length. This keeps the Bayesian model working with the most current data.

## Irregular Cycle Detection

If the most recent cycle gap differs from the user's average by 5 or more days, the system automatically sends a notification alerting the user to the irregularity.

## Technical Details

- Implemented in pure JavaScript (no external ML libraries)
- Runs on the backend in Node.js
- Cycle history stored in MongoDB CycleData collection
- Predictions calculated on demand via GET /api/cycle/predictions
