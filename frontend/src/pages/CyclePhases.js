import React, { useState } from 'react';
import './CyclePhases.css';

const CyclePhases = () => {
  const [selectedPhase, setSelectedPhase] = useState('menstrual');

  const phases = {
    menstrual: {
      name: 'Menstrual Phase',
      emoji: '🩸',
      duration: 'Days 1-5',
      color: '#e53e3e',
      description: 'Your period begins as the uterine lining sheds. This is day 1 of your cycle.',
      hormones: {
        estrogen: 'Low',
        progesterone: 'Low',
        description: 'Both estrogen and progesterone are at their lowest levels, triggering menstruation.'
      },
      physicalChanges: [
        'Menstrual bleeding',
        'Uterine contractions (cramps)',
        'Lower energy levels',
        'Possible bloating',
        'Breast tenderness may decrease'
      ],
      emotionalChanges: [
        'May feel more introspective',
        'Possible mood swings',
        'Need for rest and comfort',
        'Relief that cycle has started',
        'Emotional sensitivity'
      ],
      dietRecommendations: {
        eat: [
          'Iron-rich foods (spinach, red meat, lentils)',
          'Magnesium (dark chocolate, nuts, seeds)',
          'Anti-inflammatory foods (turmeric, ginger)',
          'Warm, comforting foods',
          'Plenty of water'
        ],
        avoid: [
          'Excessive caffeine',
          'High sodium foods',
          'Processed sugars',
          'Alcohol',
          'Very cold foods'
        ]
      },
      exercises: [
        'Gentle yoga',
        'Light walking',
        'Stretching',
        'Meditation',
        'Restorative poses'
      ],
      yogaPoses: [
        {
          name: 'Child\'s Pose',
          benefit: 'Relieves cramps and calms the mind',
          videoUrl: 'https://www.youtube.com/watch?v=2Y8K8w_b_Vw'
        },
        {
          name: 'Cat-Cow Stretch',
          benefit: 'Eases back pain and improves circulation',
          videoUrl: 'https://www.youtube.com/watch?v=kqnua4rHVVA'
        },
        {
          name: 'Supine Twist',
          benefit: 'Relieves lower back tension',
          videoUrl: 'https://www.youtube.com/watch?v=6H2H2tXZE94'
        }
      ],
      selfCareTips: [
        'Use a heating pad for cramps',
        'Take warm baths',
        'Get extra sleep',
        'Practice gentle self-massage',
        'Stay hydrated',
        'Listen to your body\'s needs'
      ]
    },
    follicular: {
      name: 'Follicular Phase',
      emoji: '🌱',
      duration: 'Days 1-13',
      color: '#38a169',
      description: 'Your body prepares for ovulation. Energy and mood typically improve as hormones rise.',
      hormones: {
        estrogen: 'Rising',
        progesterone: 'Low',
        description: 'Estrogen gradually increases, preparing the body for potential pregnancy.'
      },
      physicalChanges: [
        'Increased energy levels',
        'Clearer skin',
        'Stronger hair and nails',
        'Improved metabolism',
        'Better sleep quality'
      ],
      emotionalChanges: [
        'Increased optimism',
        'Better focus and concentration',
        'Higher motivation',
        'Social confidence',
        'Creative energy'
      ],
      dietRecommendations: {
        eat: [
          'Fresh fruits and vegetables',
          'Lean proteins',
          'Whole grains',
          'Healthy fats (avocado, nuts)',
          'Probiotic foods (yogurt, kefir)'
        ],
        avoid: [
          'Heavy, processed foods',
          'Excessive sugar',
          'Too much caffeine late in day',
          'Fried foods',
          'Artificial additives'
        ]
      },
      exercises: [
        'Cardio workouts',
        'Strength training',
        'High-intensity interval training',
        'Dancing',
        'Outdoor activities'
      ],
      yogaPoses: [
        {
          name: 'Sun Salutations',
          benefit: 'Builds energy and strength',
          videoUrl: 'https://www.youtube.com/watch?v=73sjOgWZO7I'
        },
        {
          name: 'Warrior II',
          benefit: 'Increases confidence and stamina',
          videoUrl: 'https://www.youtube.com/watch?v=4BSJAAqzBl8'
        },
        {
          name: 'Tree Pose',
          benefit: 'Improves balance and focus',
          videoUrl: 'https://www.youtube.com/watch?v=NoRbzjVd6nY'
        }
      ],
      selfCareTips: [
        'Start new projects',
        'Plan social activities',
        'Try new workouts',
        'Set goals and intentions',
        'Engage in creative pursuits',
        'Take advantage of high energy'
      ]
    },
    ovulation: {
      name: 'Ovulation Phase',
      emoji: '✨',
      duration: 'Days 14-16',
      color: '#d69e2e',
      description: 'Peak fertility time when an egg is released. You may feel most confident and energetic.',
      hormones: {
        estrogen: 'Peak',
        progesterone: 'Beginning to rise',
        description: 'Estrogen peaks just before ovulation, then progesterone begins to rise.'
      },
      physicalChanges: [
        'Peak energy and strength',
        'Glowing skin',
        'Increased libido',
        'Cervical mucus changes',
        'Slight temperature rise'
      ],
      emotionalChanges: [
        'Peak confidence',
        'Enhanced communication skills',
        'Increased social desire',
        'Heightened intuition',
        'Feeling attractive and powerful'
      ],
      dietRecommendations: {
        eat: [
          'Antioxidant-rich foods (berries, leafy greens)',
          'Healthy fats for hormone production',
          'Zinc-rich foods (pumpkin seeds, oysters)',
          'Fiber-rich foods',
          'Plenty of water'
        ],
        avoid: [
          'Inflammatory foods',
          'Excessive alcohol',
          'High sugar intake',
          'Processed meats',
          'Trans fats'
        ]
      },
      exercises: [
        'High-intensity workouts',
        'Competitive sports',
        'Group fitness classes',
        'Rock climbing or challenging activities',
        'Dance or martial arts'
      ],
      yogaPoses: [
        {
          name: 'Camel Pose',
          benefit: 'Opens heart chakra and boosts confidence',
          videoUrl: 'https://www.youtube.com/watch?v=VloeOUOZ_Qc'
        },
        {
          name: 'Goddess Pose',
          benefit: 'Celebrates feminine power',
          videoUrl: 'https://www.youtube.com/watch?v=Hs7jYNabdHs'
        },
        {
          name: 'Crow Pose',
          benefit: 'Builds strength and confidence',
          videoUrl: 'https://www.youtube.com/watch?v=Hml8GP4kRbE'
        }
      ],
      selfCareTips: [
        'Schedule important conversations',
        'Plan presentations or meetings',
        'Engage in social activities',
        'Try new challenges',
        'Express creativity',
        'Celebrate your peak energy'
      ]
    },
    luteal: {
      name: 'Luteal Phase',
      emoji: '🌙',
      duration: 'Days 17-28',
      color: '#805ad5',
      description: 'The longest phase where your body prepares for either pregnancy or menstruation.',
      hormones: {
        estrogen: 'Declining',
        progesterone: 'High then declining',
        description: 'Progesterone rises then falls if pregnancy doesn\'t occur, leading to PMS symptoms.'
      },
      physicalChanges: [
        'Possible bloating',
        'Breast tenderness',
        'Food cravings',
        'Fatigue',
        'Skin changes'
      ],
      emotionalChanges: [
        'Possible mood swings',
        'Increased sensitivity',
        'Need for comfort',
        'Introspection',
        'Nesting instincts'
      ],
      dietRecommendations: {
        eat: [
          'Complex carbohydrates (sweet potato, quinoa)',
          'Magnesium-rich foods (dark chocolate, nuts)',
          'B-vitamin foods (leafy greens, eggs)',
          'Calcium-rich foods (dairy, sardines)',
          'Comfort foods in moderation'
        ],
        avoid: [
          'Excessive caffeine',
          'High sodium foods',
          'Refined sugars',
          'Alcohol',
          'Spicy foods if sensitive'
        ]
      },
      exercises: [
        'Moderate cardio',
        'Yoga and stretching',
        'Pilates',
        'Walking in nature',
        'Swimming'
      ],
      yogaPoses: [
        {
          name: 'Forward Fold',
          benefit: 'Calms the nervous system',
          videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A'
        },
        {
          name: 'Legs Up the Wall',
          benefit: 'Reduces bloating and calms mind',
          videoUrl: 'https://www.youtube.com/watch?v=F3xWk_et2Ag'
        },
        {
          name: 'Pigeon Pose',
          benefit: 'Releases hip tension and emotions',
          videoUrl: 'https://www.youtube.com/watch?v=0_zPqA65Nok'
        }
      ],
      selfCareTips: [
        'Practice self-compassion',
        'Create cozy environments',
        'Journal your thoughts',
        'Prepare for upcoming period',
        'Focus on completion of projects',
        'Allow for emotional processing'
      ]
    }
  };

  const currentPhase = phases[selectedPhase];

  return (
    <div className="cycle-phases">
      <div className="container">
        <div className="phases-header">
          <h1>Understanding Your Menstrual Cycle</h1>
          <p>Learn about the four phases of your cycle and how to support your body through each one</p>
        </div>

        <div className="phase-navigation">
          {Object.entries(phases).map(([key, phase]) => (
            <button
              key={key}
              className={`phase-nav-btn ${selectedPhase === key ? 'active' : ''}`}
              onClick={() => setSelectedPhase(key)}
              style={{
                borderColor: phase.color,
                backgroundColor: selectedPhase === key ? phase.color : 'transparent',
                color: selectedPhase === key ? 'white' : phase.color
              }}
            >
              <span className="phase-emoji">{phase.emoji}</span>
              <div className="phase-nav-text">
                <div className="phase-nav-name">{phase.name}</div>
                <div className="phase-nav-duration">{phase.duration}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="phase-content">
          <div className="phase-header" style={{ borderColor: currentPhase.color }}>
            <div className="phase-title">
              <span className="phase-emoji-large">{currentPhase.emoji}</span>
              <div>
                <h2>{currentPhase.name}</h2>
                <p className="phase-duration">{currentPhase.duration}</p>
                <p className="phase-description">{currentPhase.description}</p>
              </div>
            </div>
          </div>

          <div className="phase-details-grid">
            <div className="detail-card">
              <h3>Hormonal Changes</h3>
              <div className="hormone-info">
                <div className="hormone-item">
                  <strong>Estrogen:</strong> {currentPhase.hormones.estrogen}
                </div>
                <div className="hormone-item">
                  <strong>Progesterone:</strong> {currentPhase.hormones.progesterone}
                </div>
                <p className="hormone-description">{currentPhase.hormones.description}</p>
              </div>
            </div>

            <div className="detail-card">
              <h3>Physical Changes</h3>
              <ul className="changes-list">
                {currentPhase.physicalChanges.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </div>

            <div className="detail-card">
              <h3>Emotional Changes</h3>
              <ul className="changes-list">
                {currentPhase.emotionalChanges.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </div>

            
            <div className="detail-card diet-card">
              <h3>Nutrition Guide</h3>
              <div className="diet-section">
                <h4 className="diet-title eat">Foods to Embrace 🥗</h4>
                <ul className="diet-list">
                  {currentPhase.dietRecommendations.eat.map((food, index) => (
                    <li key={index}>{food}</li>
                  ))}
                </ul>
              </div>
              <div className="diet-section">
                <h4 className="diet-title avoid">Foods to Limit 🚫</h4>
                <ul className="diet-list">
                  {currentPhase.dietRecommendations.avoid.map((food, index) => (
                    <li key={index}>{food}</li>
                  ))}
                </ul>
              </div>
            </div>

            
            <div className="detail-card">
              <h3>Recommended Exercises</h3>
              <div className="exercise-list">
                {currentPhase.exercises.map((exercise, index) => (
                  <span key={index} className="exercise-tag">{exercise}</span>
                ))}
              </div>
            </div>


            <div className="detail-card yoga-card">
              <h3>Yoga Poses for This Phase</h3>
              <div className="yoga-poses">
                {currentPhase.yogaPoses.map((pose, index) => (
                  <div key={index} className="yoga-pose">
                    <h4>{pose.name}</h4>
                    <p>{pose.benefit}</p>
                    <a 
                      href={pose.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="yoga-link"
                    >
                      Watch Tutorial 🎥
                    </a>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="detail-card self-care-card">
              <h3>Self-Care Tips</h3>
              <div className="self-care-tips">
                {currentPhase.selfCareTips.map((tip, index) => (
                  <div key={index} className="self-care-tip">
                    <span className="tip-icon">💝</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="educational-note">
          <h3>Remember</h3>
          <p>
            Every woman's cycle is unique. These are general guidelines - listen to your body 
            and consult with healthcare providers for personalized advice. Cycle lengths can 
            vary from 21-35 days, and symptoms can differ greatly between individuals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CyclePhases;