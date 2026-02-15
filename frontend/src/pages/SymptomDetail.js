import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './SymptomDetail.css';

const SymptomDetail = () => {
  const { symptomId } = useParams();

  const symptomsData = {
    cramps: {
      name: 'Menstrual Cramps',
      emoji: '🤕',
      color: '#e53e3e',
      description: 'Menstrual cramps are painful contractions in the lower abdomen and back that occur during menstruation.',
      whatItIs: 'Menstrual cramps, also called dysmenorrhea, are throbbing or cramping pains in the lower abdomen. They occur just before and during menstrual periods.',
      whyItHappens: 'During menstruation, your uterus contracts to help expel its lining. Hormone-like substances (prostaglandins) involved in pain and inflammation trigger the uterine muscle contractions. Higher levels of prostaglandins are associated with more severe menstrual cramps.',
      whatToDo: [
        'Apply heat to your lower abdomen or back',
        'Take over-the-counter pain relievers (ibuprofen, naproxen)',
        'Gentle exercise like walking or yoga',
        'Massage your abdomen',
        'Take warm baths',
        'Stay hydrated'
      ],
      whatNotToDo: [
        'Don\'t ignore severe pain that interferes with daily activities',
        'Avoid excessive caffeine which can worsen cramps',
        'Don\'t use heating pads for extended periods',
        'Avoid smoking as it can worsen cramps'
      ],
      dietRecommendations: [
        'Anti-inflammatory foods (turmeric, ginger, leafy greens)',
        'Magnesium-rich foods (dark chocolate, nuts, seeds)',
        'Omega-3 fatty acids (salmon, walnuts, flax seeds)',
        'Calcium-rich foods (dairy, sardines, kale)',
        'Plenty of water to stay hydrated'
      ],
      exercises: [
        'Gentle yoga poses',
        'Light walking',
        'Pelvic tilts',
        'Knee-to-chest stretches',
        'Cat-cow stretches'
      ],
      yogaPoses: [
        {
          name: 'Child\'s Pose',
          benefit: 'Relieves lower back tension and calms the nervous system',
          videoUrl: 'https://www.youtube.com/watch?v=2Y8K8w_b_Vw'
        },
        {
          name: 'Cat-Cow Stretch',
          benefit: 'Improves spinal flexibility and reduces back pain',
          videoUrl: 'https://www.youtube.com/watch?v=kqnua4rHVVA'
        },
        {
          name: 'Supine Twist',
          benefit: 'Releases tension in the lower back and hips',
          videoUrl: 'https://www.youtube.com/watch?v=6H2H2tXZE94'
        }
      ],
      lifestyleTips: [
        'Regular exercise throughout the month can reduce cramp severity',
        'Stress management through meditation or deep breathing',
        'Adequate sleep (7-9 hours per night)',
        'Consider keeping a symptom diary to track patterns',
        'Maintain a healthy weight'
      ]
    },
    fatigue: {
      name: 'Fatigue',
      emoji: '😴',
      color: '#805ad5',
      description: 'Feeling unusually tired and low on energy during your menstrual cycle.',
      whatItIs: 'Menstrual fatigue is a common symptom characterized by feeling unusually tired, sluggish, or lacking energy before and during your period.',
      whyItHappens: 'Hormonal fluctuations, particularly drops in estrogen and progesterone, can affect your energy levels. Iron deficiency from menstrual blood loss and disrupted sleep patterns also contribute to fatigue.',
      whatToDo: [
        'Prioritize sleep and maintain a regular sleep schedule',
        'Eat iron-rich foods to combat potential deficiency',
        'Stay hydrated throughout the day',
        'Engage in light exercise to boost energy',
        'Take short naps if needed (20-30 minutes)',
        'Practice stress-reduction techniques'
      ],
      whatNotToDo: [
        'Don\'t rely on excessive caffeine for energy',
        'Avoid skipping meals or eating poorly',
        'Don\'t ignore persistent fatigue that affects daily life',
        'Avoid overexertion when feeling tired'
      ],
      dietRecommendations: [
        'Iron-rich foods (red meat, spinach, lentils, tofu)',
        'Complex carbohydrates for sustained energy',
        'B-vitamin rich foods (eggs, leafy greens, whole grains)',
        'Protein to maintain stable blood sugar',
        'Avoid excessive sugar which can cause energy crashes'
      ],
      exercises: [
        'Gentle yoga',
        'Light walking',
        'Stretching routines',
        'Swimming at a comfortable pace',
        'Tai chi or qigong'
      ],
      yogaPoses: [
        {
          name: 'Legs Up the Wall',
          benefit: 'Promotes relaxation and improves circulation',
          videoUrl: 'https://www.youtube.com/watch?v=F3xWk_et2Ag'
        },
        {
          name: 'Restorative Forward Fold',
          benefit: 'Calms the nervous system and reduces stress',
          videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A'
        },
        {
          name: 'Supported Bridge Pose',
          benefit: 'Gently energizes while promoting relaxation',
          videoUrl: 'https://www.youtube.com/watch?v=rl1eTdoaUmg'
        }
      ],
      lifestyleTips: [
        'Create a relaxing bedtime routine',
        'Limit screen time before bed',
        'Consider iron supplements if deficient (consult doctor)',
        'Practice mindfulness or meditation',
        'Listen to your body and rest when needed'
      ]
    },
    bloating: {
      name: 'Bloating',
      emoji: '🎈',
      color: '#d69e2e',
      description: 'Feeling of fullness, tightness, or swelling in the abdomen.',
      whatItIs: 'Menstrual bloating is the feeling of fullness, tightness, or swelling in the abdomen that commonly occurs before and during menstruation.',
      whyItHappens: 'Hormonal changes, particularly fluctuations in estrogen and progesterone, can cause your body to retain water and sodium. This leads to temporary weight gain and abdominal swelling.',
      whatToDo: [
        'Reduce sodium intake',
        'Stay well hydrated',
        'Eat smaller, more frequent meals',
        'Include potassium-rich foods in your diet',
        'Gentle abdominal massage',
        'Light exercise to promote digestion'
      ],
      whatNotToDo: [
        'Don\'t eat large, heavy meals',
        'Avoid foods high in sodium',
        'Don\'t drink carbonated beverages',
        'Avoid foods that commonly cause gas'
      ],
      dietRecommendations: [
        'Potassium-rich foods (bananas, spinach, avocados)',
        'Natural diuretics (cucumber, watermelon, asparagus)',
        'Fiber-rich foods to aid digestion',
        'Herbal teas (peppermint, ginger, fennel)',
        'Limit refined carbohydrates and processed foods'
      ],
      exercises: [
        'Walking to aid digestion',
        'Gentle twisting yoga poses',
        'Light cardio exercises',
        'Abdominal breathing exercises',
        'Swimming'
      ],
      yogaPoses: [
        {
          name: 'Wind-Relieving Pose',
          benefit: 'Aids digestion and reduces bloating',
          videoUrl: 'https://www.youtube.com/watch?v=ChOKNdVBEzE'
        },
        {
          name: 'Seated Spinal Twist',
          benefit: 'Stimulates digestion and relieves bloating',
          videoUrl: 'https://www.youtube.com/watch?v=cn4LPfPeVXE'
        },
        {
          name: 'Happy Baby Pose',
          benefit: 'Massages abdominal organs and reduces gas',
          videoUrl: 'https://www.youtube.com/watch?v=4BSJAAqzBl8'
        }
      ],
      lifestyleTips: [
        'Keep a food diary to identify trigger foods',
        'Eat slowly and chew thoroughly',
        'Manage stress levels',
        'Consider probiotics for digestive health',
        'Wear comfortable, loose-fitting clothing'
      ]
    },
    'back-pain': {
      name: 'Back Pain',
      emoji: '🔥',
      color: '#e53e3e',
      description: 'Lower back discomfort and tension during menstruation.',
      whatItIs: 'Menstrual back pain typically affects the lower back and can range from a dull ache to sharp, intense pain that may radiate to the hips and thighs.',
      whyItHappens: 'Prostaglandins that cause uterine contractions can also affect nearby muscles, including those in your back. The uterus may also press against blood vessels and nerves in the pelvic area.',
      whatToDo: [
        'Apply heat to the lower back',
        'Gentle stretching and yoga',
        'Over-the-counter pain relievers',
        'Maintain good posture',
        'Sleep with a pillow between your knees',
        'Light massage or self-massage'
      ],
      whatNotToDo: [
        'Don\'t stay in one position for too long',
        'Avoid heavy lifting during your period',
        'Don\'t ignore severe pain',
        'Avoid sleeping on your stomach'
      ],
      dietRecommendations: [
        'Anti-inflammatory foods (turmeric, ginger, berries)',
        'Magnesium-rich foods (nuts, seeds, leafy greens)',
        'Calcium for muscle function',
        'Omega-3 fatty acids to reduce inflammation',
        'Stay hydrated to maintain muscle function'
      ],
      exercises: [
        'Gentle back stretches',
        'Pelvic tilts',
        'Knee-to-chest stretches',
        'Walking',
        'Swimming (backstroke)'
      ],
      yogaPoses: [
        {
          name: 'Cat-Cow Stretch',
          benefit: 'Improves spinal mobility and reduces back tension',
          videoUrl: 'https://www.youtube.com/watch?v=kqnua4rHVVA'
        },
        {
          name: 'Knee-to-Chest Pose',
          benefit: 'Stretches lower back muscles and relieves tension',
          videoUrl: 'https://www.youtube.com/watch?v=YQampHsOws4'
        },
        {
          name: 'Pigeon Pose',
          benefit: 'Opens hips and releases lower back tension',
          videoUrl: 'https://www.youtube.com/watch?v=0_zPqA65Nok'
        }
      ],
      lifestyleTips: [
        'Use ergonomic furniture and maintain good posture',
        'Sleep on a supportive mattress',
        'Take frequent breaks from sitting',
        'Consider a warm bath with Epsom salts',
        'Practice stress management techniques'
      ]
    },
    headache: {
      name: 'Headaches',
      emoji: '🤯',
      color: '#f56565',
      description: 'Head pain often related to hormonal changes during menstruation.',
      whatItIs: 'Menstrual headaches are head pains that occur in relation to your menstrual cycle, often appearing before, during, or after your period.',
      whyItHappens: 'Fluctuating hormone levels, particularly drops in estrogen, can trigger headaches. Dehydration, stress, and changes in sleep patterns during menstruation can also contribute.',
      whatToDo: [
        'Stay well hydrated',
        'Maintain regular sleep patterns',
        'Apply cold or warm compress to head/neck',
        'Practice relaxation techniques',
        'Take over-the-counter pain relievers as directed',
        'Gentle neck and shoulder massage'
      ],
      whatNotToDo: [
        'Don\'t skip meals or delay eating',
        'Avoid excessive caffeine or sudden caffeine withdrawal',
        'Don\'t ignore severe or persistent headaches',
        'Avoid bright lights and loud noises when possible'
      ],
      dietRecommendations: [
        'Regular, balanced meals to maintain blood sugar',
        'Magnesium-rich foods (almonds, spinach, avocado)',
        'Riboflavin (B2) sources (eggs, dairy, leafy greens)',
        'Plenty of water throughout the day',
        'Limit processed foods and artificial additives'
      ],
      exercises: [
        'Gentle neck stretches',
        'Shoulder rolls',
        'Light walking in fresh air',
        'Relaxation exercises',
        'Gentle yoga'
      ],
      yogaPoses: [
        {
          name: 'Neck Rolls',
          benefit: 'Releases tension in neck and shoulders',
          videoUrl: 'https://www.youtube.com/watch?v=X3-gKPNyrTA'
        },
        {
          name: 'Eagle Arms',
          benefit: 'Stretches shoulders and upper back',
          videoUrl: 'https://www.youtube.com/watch?v=JQq2UvD3OvQ'
        },
        {
          name: 'Legs Up the Wall',
          benefit: 'Promotes relaxation and reduces stress',
          videoUrl: 'https://www.youtube.com/watch?v=F3xWk_et2Ag'
        }
      ],
      lifestyleTips: [
        'Keep a headache diary to identify triggers',
        'Maintain consistent sleep schedule',
        'Manage stress through meditation or deep breathing',
        'Consider a dark, quiet room for rest',
        'Limit screen time during headaches'
      ]
    },
    'mood-swings': {
      name: 'Mood Swings',
      emoji: '🎭',
      color: '#9f7aea',
      description: 'Emotional ups and downs throughout the menstrual cycle.',
      whatItIs: 'Mood swings during menstruation involve rapid or intense changes in emotions, from feeling happy to sad, irritable, or anxious within short periods.',
      whyItHappens: 'Hormonal fluctuations, particularly changes in estrogen and progesterone levels, can affect neurotransmitters in the brain that regulate mood, including serotonin.',
      whatToDo: [
        'Practice mindfulness and meditation',
        'Maintain regular exercise routine',
        'Get adequate sleep',
        'Talk to supportive friends or family',
        'Keep a mood journal',
        'Practice deep breathing exercises'
      ],
      whatNotToDo: [
        'Don\'t make major decisions during emotional lows',
        'Avoid isolating yourself completely',
        'Don\'t dismiss your feelings as "just hormones"',
        'Avoid excessive alcohol or caffeine'
      ],
      dietRecommendations: [
        'Complex carbohydrates for serotonin production',
        'Omega-3 fatty acids for brain health',
        'B-vitamins (especially B6) for mood regulation',
        'Magnesium to help with anxiety',
        'Limit sugar and processed foods'
      ],
      exercises: [
        'Regular cardio exercise',
        'Yoga for stress relief',
        'Dancing or other enjoyable activities',
        'Walking in nature',
        'Strength training'
      ],
      yogaPoses: [
        {
          name: 'Heart Opening Poses',
          benefit: 'Improves mood and reduces anxiety',
          videoUrl: 'https://www.youtube.com/watch?v=VloeOUOZ_Qc'
        },
        {
          name: 'Forward Fold',
          benefit: 'Calms the nervous system',
          videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A'
        },
        {
          name: 'Savasana',
          benefit: 'Promotes deep relaxation and emotional balance',
          videoUrl: 'https://www.youtube.com/watch?v=1VYlOKUdylM'
        }
      ],
      lifestyleTips: [
        'Practice self-compassion and patience',
        'Establish supportive social connections',
        'Consider counseling if mood swings are severe',
        'Create a calming environment at home',
        'Engage in creative or enjoyable activities'
      ]
    },
    nausea: {
      name: 'Nausea',
      emoji: '🤢',
      color: '#38a169',
      description: 'Feeling sick to your stomach during menstruation.',
      whatItIs: 'Menstrual nausea is the feeling of queasiness or the urge to vomit that can occur before or during your period.',
      whyItHappens: 'Prostaglandins that cause uterine contractions can also affect the digestive system. Hormonal changes and pain from cramps can also trigger nausea.',
      whatToDo: [
        'Eat small, frequent meals',
        'Try ginger tea or ginger supplements',
        'Stay hydrated with small sips of water',
        'Rest in a comfortable position',
        'Use peppermint aromatherapy',
        'Apply cool compress to forehead'
      ],
      whatNotToDo: [
        'Don\'t eat large, heavy meals',
        'Avoid strong odors that trigger nausea',
        'Don\'t lie flat immediately after eating',
        'Avoid spicy or greasy foods'
      ],
      dietRecommendations: [
        'Ginger in various forms (tea, capsules, fresh)',
        'Plain crackers or toast',
        'Bananas for potassium',
        'Clear broths and soups',
        'Peppermint tea'
      ],
      exercises: [
        'Gentle walking',
        'Deep breathing exercises',
        'Light stretching',
        'Restorative yoga poses',
        'Fresh air activities'
      ],
      yogaPoses: [
        {
          name: 'Child\'s Pose',
          benefit: 'Calms the digestive system',
          videoUrl: 'https://www.youtube.com/watch?v=2Y8K8w_b_Vw'
        },
        {
          name: 'Seated Forward Fold',
          benefit: 'Aids digestion and reduces nausea',
          videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A'
        },
        {
          name: 'Legs Up the Wall',
          benefit: 'Promotes relaxation and reduces stress',
          videoUrl: 'https://www.youtube.com/watch?v=F3xWk_et2Ag'
        }
      ],
      lifestyleTips: [
        'Keep crackers by your bedside',
        'Avoid triggers like strong perfumes',
        'Get plenty of fresh air',
        'Rest in a cool, quiet environment',
        'Consider acupressure on wrist points'
      ]
    },
    'breast-tenderness': {
      name: 'Breast Tenderness',
      emoji: '💔',
      color: '#f8b4d9',
      description: 'Soreness and sensitivity in the breasts during menstrual cycle.',
      whatItIs: 'Breast tenderness involves soreness, swelling, or sensitivity in one or both breasts, typically occurring before and during menstruation.',
      whyItHappens: 'Hormonal fluctuations, particularly increases in estrogen and progesterone, cause breast tissue to swell and become more sensitive.',
      whatToDo: [
        'Wear a well-fitting, supportive bra',
        'Apply warm or cold compress',
        'Gentle breast massage',
        'Take over-the-counter pain relievers',
        'Reduce caffeine intake',
        'Wear a sports bra for extra support'
      ],
      whatNotToDo: [
        'Don\'t wear tight or ill-fitting bras',
        'Avoid excessive caffeine',
        'Don\'t ignore sudden changes in breast tissue',
        'Avoid sleeping on your stomach'
      ],
      dietRecommendations: [
        'Reduce caffeine and chocolate',
        'Limit salt to reduce water retention',
        'Vitamin E rich foods (nuts, seeds, spinach)',
        'Evening primrose oil (consult doctor first)',
        'Increase fiber intake'
      ],
      exercises: [
        'Low-impact cardio with good sports bra',
        'Upper body stretches',
        'Gentle arm circles',
        'Swimming (with proper support)',
        'Walking'
      ],
      yogaPoses: [
        {
          name: 'Chest Opening Stretches',
          benefit: 'Relieves tension in chest muscles',
          videoUrl: 'https://www.youtube.com/watch?v=VloeOUOZ_Qc'
        },
        {
          name: 'Arm Circles',
          benefit: 'Improves circulation and reduces stiffness',
          videoUrl: 'https://www.youtube.com/watch?v=X3-gKPNyrTA'
        },
        {
          name: 'Gentle Backbends',
          benefit: 'Opens chest and improves posture',
          videoUrl: 'https://www.youtube.com/watch?v=rl1eTdoaUmg'
        }
      ],
      lifestyleTips: [
        'Track symptoms to identify patterns',
        'Choose comfortable, breathable fabrics',
        'Consider a supportive sleep bra',
        'Practice stress management',
        'Perform regular breast self-exams'
      ]
    }
  };

  const symptom = symptomsData[symptomId];

  if (!symptom) {
    return (
      <div className="symptom-detail">
        <div className="container">
          <div className="not-found">
            <h1>Symptom Not Found</h1>
            <p>The symptom you're looking for doesn't exist.</p>
            <Link to="/symptoms" className="btn btn-primary">
              Back to Symptoms
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="symptom-detail">
      <div className="container">
        {/* Header */}
        <div className="symptom-header" style={{ borderColor: symptom.color }}>
          <Link to="/symptoms" className="back-link">
            ← Back to Symptoms
          </Link>
          <div className="symptom-title">
            <span className="symptom-emoji-large">{symptom.emoji}</span>
            <div>
              <h1>{symptom.name}</h1>
              <p className="symptom-description">{symptom.description}</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="symptom-content">
          {/* What It Is */}
          <div className="content-section">
            <h2>What It Is</h2>
            <p>{symptom.whatItIs}</p>
          </div>

          {/* Why It Happens */}
          <div className="content-section">
            <h2>Why It Happens</h2>
            <p>{symptom.whyItHappens}</p>
          </div>

          {/* What To Do */}
          <div className="content-section">
            <h2>What You Can Do</h2>
            <ul className="action-list positive">
              {symptom.whatToDo.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>

          {/* What Not To Do */}
          <div className="content-section">
            <h2>What to Avoid</h2>
            <ul className="action-list negative">
              {symptom.whatNotToDo.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>

          {/* Diet Recommendations */}
          <div className="content-section">
            <h2>Helpful Foods</h2>
            <div className="diet-grid">
              {symptom.dietRecommendations.map((food, index) => (
                <div key={index} className="diet-item">
                  <span className="diet-icon">🥗</span>
                  <span>{food}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exercises */}
          <div className="content-section">
            <h2>Recommended Exercises</h2>
            <div className="exercise-grid">
              {symptom.exercises.map((exercise, index) => (
                <div key={index} className="exercise-item">
                  <span className="exercise-icon">🏃‍♀️</span>
                  <span>{exercise}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Yoga Poses */}
          <div className="content-section">
            <h2>Yoga Poses</h2>
            <div className="yoga-grid">
              {symptom.yogaPoses.map((pose, index) => (
                <div key={index} className="yoga-card">
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

          {/* Lifestyle Tips */}
          <div className="content-section">
            <h2>Lifestyle Tips</h2>
            <div className="tips-grid">
              {symptom.lifestyleTips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <span className="tip-icon">💡</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* When to See a Doctor */}
        <div className="medical-advice-section">
          <h2>When to Consult a Healthcare Provider</h2>
          <div className="medical-warning">
            <p>
              <strong>Seek medical attention if:</strong>
            </p>
            <ul>
              <li>Symptoms are severe and interfere with daily activities</li>
              <li>Pain doesn't respond to over-the-counter treatments</li>
              <li>Symptoms worsen over time or change significantly</li>
              <li>You experience new or unusual symptoms</li>
              <li>Symptoms persist outside of your menstrual cycle</li>
            </ul>
          </div>
        </div>

        {/* Related Symptoms */}
        <div className="related-section">
          <h2>Explore Other Symptoms</h2>
          <div className="related-grid">
            {Object.entries(symptomsData)
              .filter(([key]) => key !== symptomId)
              .slice(0, 3)
              .map(([key, relatedSymptom]) => (
                <Link key={key} to={`/symptoms/${key}`} className="related-card">
                  <span className="related-emoji">{relatedSymptom.emoji}</span>
                  <span className="related-name">{relatedSymptom.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomDetail;