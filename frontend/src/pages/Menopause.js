import React, { useState } from 'react';
import './Menopause.css';

const Menopause = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = {
    overview: 'What is Menopause?',
    symptoms: 'Symptoms & Stages',
    hormones: 'Hormonal Changes',
    nutrition: 'Nutrition & Diet',
    exercise: 'Exercise & Wellness',
    support: 'Emotional Support'
  };

  return (
    <div className="menopause-page">
      <div className="container">
        <div className="menopause-header">
          <h1>Menopause Guide</h1>
          <p>Understanding and navigating this natural life transition with confidence</p>
        </div>

        {/* Navigation */}
        <div className="section-navigation">
          {Object.entries(sections).map(([key, title]) => (
            <button
              key={key}
              className={`nav-btn ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              {title}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="section-content">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="content-panel">
              <h2>What is Menopause?</h2>
              
              <div className="overview-grid">
                <div className="overview-text">
                  <p>
                    Menopause is a natural biological process that marks the end of your menstrual cycles. 
                    It's diagnosed after you've gone 12 months without a menstrual period. Menopause can 
                    happen in your 40s or 50s, but the average age is 51 in the United States.
                  </p>
                  
                  <p>
                    While menopause is a natural part of aging, the physical symptoms and emotional changes 
                    can be challenging. Understanding what to expect and how to manage symptoms can help 
                    you navigate this transition with greater ease and confidence.
                  </p>
                </div>
                
                <div className="overview-visual">
                  <div className="menopause-icon">🌅</div>
                  <h4>A New Chapter</h4>
                  <p>Menopause represents freedom from periods and a new phase of life to embrace</p>
                </div>
              </div>

              <div className="stages-overview">
                <h3>The Three Stages</h3>
                <div className="stages-grid">
                  <div className="stage-card">
                    <div className="stage-icon">🌱</div>
                    <h4>Perimenopause</h4>
                    <p>The transition period when hormone levels begin to fluctuate. Can last 4-10 years.</p>
                  </div>
                  
                  <div className="stage-card">
                    <div className="stage-icon">🌸</div>
                    <h4>Menopause</h4>
                    <p>When you haven't had a period for 12 consecutive months. Marks the end of fertility.</p>
                  </div>
                  
                  <div className="stage-card">
                    <div className="stage-icon">🌺</div>
                    <h4>Postmenopause</h4>
                    <p>The years after menopause. Symptoms may continue but often become less intense.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Symptoms Section */}
          {activeSection === 'symptoms' && (
            <div className="content-panel">
              <h2>Symptoms & Stages</h2>
              
              <div className="symptoms-categories">
                <div className="symptom-category">
                  <h3>Early Symptoms (Perimenopause)</h3>
                  <div className="symptoms-list">
                    <div className="symptom-item">
                      <span className="symptom-icon">📅</span>
                      <div>
                        <h4>Irregular Periods</h4>
                        <p>Changes in cycle length, flow, and timing</p>
                      </div>
                    </div>
                    
                    <div className="symptom-item">
                      <span className="symptom-icon">🔥</span>
                      <div>
                        <h4>Hot Flashes</h4>
                        <p>Sudden feelings of heat, often with sweating</p>
                      </div>
                    </div>
                    
                    <div className="symptom-item">
                      <span className="symptom-icon">😴</span>
                      <div>
                        <h4>Sleep Disturbances</h4>
                        <p>Difficulty falling asleep or staying asleep</p>
                      </div>
                    </div>
                    
                    <div className="symptom-item">
                      <span className="symptom-icon">🧠</span>
                      <div>
                        <h4>Brain Fog</h4>
                        <p>Memory issues and difficulty concentrating</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="symptom-category">
                  <h3>Later Symptoms (Menopause & Beyond)</h3>
                  <div className="symptoms-list">
                    <div className="symptom-item">
                      <span className="symptom-icon">💧</span>
                      <div>
                        <h4>Vaginal Dryness</h4>
                        <p>Decreased lubrication and tissue changes</p>
                      </div>
                    </div>
                    
                    <div className="symptom-item">
                      <span className="symptom-icon">🦴</span>
                      <div>
                        <h4>Bone Density Loss</h4>
                        <p>Increased risk of osteoporosis</p>
                      </div>
                    </div>
                    
                    <div className="symptom-item">
                      <span className="symptom-icon">❤️</span>
                      <div>
                        <h4>Heart Health Changes</h4>
                        <p>Increased cardiovascular risk</p>
                      </div>
                    </div>
                    
                    <div className="symptom-item">
                      <span className="symptom-icon">⚖️</span>
                      <div>
                        <h4>Weight Changes</h4>
                        <p>Slower metabolism and weight redistribution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="management-tips">
                <h3>Symptom Management Strategies</h3>
                <div className="tips-grid">
                  <div className="tip-card">
                    <h4>Hot Flash Relief</h4>
                    <ul>
                      <li>Dress in layers</li>
                      <li>Keep a fan nearby</li>
                      <li>Avoid triggers (spicy foods, alcohol)</li>
                      <li>Practice deep breathing</li>
                    </ul>
                  </div>
                  
                  <div className="tip-card">
                    <h4>Sleep Improvement</h4>
                    <ul>
                      <li>Keep bedroom cool</li>
                      <li>Maintain regular sleep schedule</li>
                      <li>Limit caffeine and screens before bed</li>
                      <li>Try relaxation techniques</li>
                    </ul>
                  </div>
                  
                  <div className="tip-card">
                    <h4>Mood Support</h4>
                    <ul>
                      <li>Regular exercise</li>
                      <li>Stress management</li>
                      <li>Social connections</li>
                      <li>Professional counseling if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hormones Section */}
          {activeSection === 'hormones' && (
            <div className="content-panel">
              <h2>Hormonal Changes</h2>
              
              <div className="hormones-overview">
                <p>
                  During menopause, your ovaries gradually produce less estrogen and progesterone. 
                  These hormonal changes are responsible for most menopausal symptoms and long-term health effects.
                </p>
              </div>

              <div className="hormones-grid">
                <div className="hormone-card">
                  <div className="hormone-header">
                    <h3>Estrogen</h3>
                    <div className="hormone-trend declining">↓ Declining</div>
                  </div>
                  <div className="hormone-effects">
                    <h4>Effects of Decline:</h4>
                    <ul>
                      <li>Hot flashes and night sweats</li>
                      <li>Vaginal dryness and tissue changes</li>
                      <li>Bone density loss</li>
                      <li>Changes in cholesterol levels</li>
                      <li>Mood fluctuations</li>
                    </ul>
                  </div>
                </div>

                <div className="hormone-card">
                  <div className="hormone-header">
                    <h3>Progesterone</h3>
                    <div className="hormone-trend declining">↓ Declining</div>
                  </div>
                  <div className="hormone-effects">
                    <h4>Effects of Decline:</h4>
                    <ul>
                      <li>Irregular periods</li>
                      <li>Sleep disturbances</li>
                      <li>Mood changes and anxiety</li>
                      <li>Breast tenderness changes</li>
                      <li>Changes in body temperature regulation</li>
                    </ul>
                  </div>
                </div>

                <div className="hormone-card">
                  <div className="hormone-header">
                    <h3>Testosterone</h3>
                    <div className="hormone-trend declining">↓ Gradually Declining</div>
                  </div>
                  <div className="hormone-effects">
                    <h4>Effects of Decline:</h4>
                    <ul>
                      <li>Decreased libido</li>
                      <li>Reduced muscle mass</li>
                      <li>Lower energy levels</li>
                      <li>Changes in mood and motivation</li>
                      <li>Bone density effects</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="hormone-support">
                <h3>Supporting Hormonal Balance</h3>
                <div className="support-methods">
                  <div className="support-category">
                    <h4>Natural Approaches</h4>
                    <ul>
                      <li>Phytoestrogen-rich foods (soy, flax seeds)</li>
                      <li>Regular exercise</li>
                      <li>Stress reduction techniques</li>
                      <li>Adequate sleep</li>
                      <li>Herbal supplements (with medical guidance)</li>
                    </ul>
                  </div>
                  
                  <div className="support-category">
                    <h4>Medical Options</h4>
                    <ul>
                      <li>Hormone replacement therapy (HRT)</li>
                      <li>Non-hormonal medications</li>
                      <li>Bioidentical hormones</li>
                      <li>Selective estrogen receptor modulators</li>
                      <li>Regular health monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nutrition Section */}
          {activeSection === 'nutrition' && (
            <div className="content-panel">
              <h2>Nutrition & Diet</h2>
              
              <div className="nutrition-intro">
                <p>
                  Proper nutrition during menopause can help manage symptoms, support bone health, 
                  maintain a healthy weight, and reduce the risk of chronic diseases.
                </p>
              </div>

              <div className="nutrition-categories">
                <div className="nutrition-card foods-to-eat">
                  <h3>Foods to Embrace 🥗</h3>
                  <div className="food-groups">
                    <div className="food-group">
                      <h4>Calcium-Rich Foods</h4>
                      <p>For bone health</p>
                      <ul>
                        <li>Dairy products (milk, yogurt, cheese)</li>
                        <li>Leafy greens (kale, collard greens)</li>
                        <li>Sardines and canned salmon with bones</li>
                        <li>Fortified plant-based milks</li>
                      </ul>
                    </div>
                    
                    <div className="food-group">
                      <h4>Phytoestrogen Sources</h4>
                      <p>Natural hormone support</p>
                      <ul>
                        <li>Soy products (tofu, tempeh, edamame)</li>
                        <li>Flax seeds and chia seeds</li>
                        <li>Legumes (lentils, chickpeas)</li>
                        <li>Whole grains</li>
                      </ul>
                    </div>
                    
                    <div className="food-group">
                      <h4>Omega-3 Rich Foods</h4>
                      <p>Heart and brain health</p>
                      <ul>
                        <li>Fatty fish (salmon, mackerel, sardines)</li>
                        <li>Walnuts and flax seeds</li>
                        <li>Chia seeds</li>
                        <li>Algae-based supplements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="nutrition-card foods-to-limit">
                  <h3>Foods to Limit 🚫</h3>
                  <div className="limit-groups">
                    <div className="limit-group">
                      <h4>Hot Flash Triggers</h4>
                      <ul>
                        <li>Spicy foods</li>
                        <li>Caffeine</li>
                        <li>Alcohol</li>
                        <li>Hot beverages</li>
                      </ul>
                    </div>
                    
                    <div className="limit-group">
                      <h4>Bone Health Inhibitors</h4>
                      <ul>
                        <li>Excessive sodium</li>
                        <li>Too much caffeine</li>
                        <li>Excessive alcohol</li>
                        <li>High phosphorus foods</li>
                      </ul>
                    </div>
                    
                    <div className="limit-group">
                      <h4>Weight Management</h4>
                      <ul>
                        <li>Processed foods</li>
                        <li>Refined sugars</li>
                        <li>Trans fats</li>
                        <li>Large portion sizes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="supplements-section">
                <h3>Important Supplements to Consider</h3>
                <div className="supplements-grid">
                  <div className="supplement-card">
                    <h4>Calcium & Vitamin D</h4>
                    <p>Essential for bone health. Aim for 1,200mg calcium and 800-1,000 IU vitamin D daily.</p>
                  </div>
                  
                  <div className="supplement-card">
                    <h4>Omega-3 Fatty Acids</h4>
                    <p>Support heart health and may help with mood. Consider 1-2g daily from fish oil or algae.</p>
                  </div>
                  
                  <div className="supplement-card">
                    <h4>Magnesium</h4>
                    <p>Helps with sleep, bone health, and muscle function. 320mg daily for women.</p>
                  </div>
                  
                  <div className="supplement-card">
                    <h4>B-Complex Vitamins</h4>
                    <p>Support energy metabolism and nervous system function during hormonal changes.</p>
                  </div>
                </div>
                
                <div className="supplement-note">
                  <p><strong>Note:</strong> Always consult with your healthcare provider before starting new supplements, especially if you're taking medications.</p>
                </div>
              </div>
            </div>
          )}

          {/* Exercise Section */}
          {activeSection === 'exercise' && (
            <div className="content-panel">
              <h2>Exercise & Wellness</h2>
              
              <div className="exercise-benefits">
                <h3>Benefits of Exercise During Menopause</h3>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span className="benefit-icon">🦴</span>
                    <span>Maintains bone density</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">❤️</span>
                    <span>Supports heart health</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">😊</span>
                    <span>Improves mood and reduces anxiety</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">😴</span>
                    <span>Enhances sleep quality</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">⚖️</span>
                    <span>Helps maintain healthy weight</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🔥</span>
                    <span>May reduce hot flash frequency</span>
                  </div>
                </div>
              </div>

              <div className="exercise-types">
                <div className="exercise-category">
                  <h3>Strength Training</h3>
                  <div className="exercise-details">
                    <p><strong>Frequency:</strong> 2-3 times per week</p>
                    <p><strong>Benefits:</strong> Maintains muscle mass, supports bone health, boosts metabolism</p>
                    <div className="exercise-examples">
                      <h4>Examples:</h4>
                      <ul>
                        <li>Weight lifting</li>
                        <li>Resistance bands</li>
                        <li>Bodyweight exercises</li>
                        <li>Pilates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="exercise-category">
                  <h3>Cardiovascular Exercise</h3>
                  <div className="exercise-details">
                    <p><strong>Frequency:</strong> 150 minutes moderate or 75 minutes vigorous per week</p>
                    <p><strong>Benefits:</strong> Heart health, weight management, mood improvement</p>
                    <div className="exercise-examples">
                      <h4>Examples:</h4>
                      <ul>
                        <li>Brisk walking</li>
                        <li>Swimming</li>
                        <li>Cycling</li>
                        <li>Dancing</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="exercise-category">
                  <h3>Flexibility & Balance</h3>
                  <div className="exercise-details">
                    <p><strong>Frequency:</strong> Daily or most days</p>
                    <p><strong>Benefits:</strong> Maintains mobility, reduces fall risk, stress relief</p>
                    <div className="exercise-examples">
                      <h4>Examples:</h4>
                      <ul>
                        <li>Yoga</li>
                        <li>Tai Chi</li>
                        <li>Stretching routines</li>
                        <li>Balance exercises</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="yoga-section">
                <h3>Recommended Yoga Poses for Menopause</h3>
                <div className="yoga-poses">
                  <div className="yoga-pose">
                    <h4>Child's Pose</h4>
                    <p>Calms the nervous system and reduces stress</p>
                    <a href="https://www.youtube.com/watch?v=2Y8K8w_b_Vw" target="_blank" rel="noopener noreferrer" className="yoga-link">
                      Watch Tutorial 🎥
                    </a>
                  </div>
                  
                  <div className="yoga-pose">
                    <h4>Legs Up the Wall</h4>
                    <p>Improves circulation and promotes relaxation</p>
                    <a href="https://www.youtube.com/watch?v=F3xWk_et2Ag" target="_blank" rel="noopener noreferrer" className="yoga-link">
                      Watch Tutorial 🎥
                    </a>
                  </div>
                  
                  <div className="yoga-pose">
                    <h4>Bridge Pose</h4>
                    <p>Strengthens back muscles and opens the chest</p>
                    <a href="https://www.youtube.com/watch?v=rl1eTdoaUmg" target="_blank" rel="noopener noreferrer" className="yoga-link">
                      Watch Tutorial 🎥
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Section */}
          {activeSection === 'support' && (
            <div className="content-panel">
              <h2>Emotional Support & Mental Health</h2>
              
              <div className="emotional-overview">
                <p>
                  Menopause can bring emotional challenges alongside physical symptoms. Hormonal changes 
                  can affect mood, memory, and overall mental well-being. Remember that these feelings 
                  are normal and there are many ways to find support and maintain emotional health.
                </p>
              </div>

              <div className="emotional-challenges">
                <h3>Common Emotional Changes</h3>
                <div className="challenges-grid">
                  <div className="challenge-item">
                    <div className="challenge-icon">😢</div>
                    <h4>Mood Swings</h4>
                    <p>Sudden changes in emotions due to hormonal fluctuations</p>
                  </div>
                  
                  <div className="challenge-item">
                    <div className="challenge-icon">😰</div>
                    <h4>Anxiety</h4>
                    <p>Increased worry, nervousness, or panic attacks</p>
                  </div>
                  
                  <div className="challenge-item">
                    <div className="challenge-icon">😔</div>
                    <h4>Depression</h4>
                    <p>Persistent sadness, loss of interest, or hopelessness</p>
                  </div>
                  
                  <div className="challenge-item">
                    <div className="challenge-icon">😤</div>
                    <h4>Irritability</h4>
                    <p>Increased sensitivity and shorter temper</p>
                  </div>
                </div>
              </div>

              <div className="coping-strategies">
                <h3>Coping Strategies</h3>
                <div className="strategies-grid">
                  <div className="strategy-card">
                    <h4>Self-Care Practices</h4>
                    <ul>
                      <li>Regular sleep schedule</li>
                      <li>Mindfulness and meditation</li>
                      <li>Journaling</li>
                      <li>Relaxation techniques</li>
                      <li>Hobbies and creative activities</li>
                    </ul>
                  </div>
                  
                  <div className="strategy-card">
                    <h4>Social Support</h4>
                    <ul>
                      <li>Connect with friends and family</li>
                      <li>Join menopause support groups</li>
                      <li>Online communities</li>
                      <li>Share experiences with others</li>
                      <li>Maintain social activities</li>
                    </ul>
                  </div>
                  
                  <div className="strategy-card">
                    <h4>Professional Help</h4>
                    <ul>
                      <li>Counseling or therapy</li>
                      <li>Support groups</li>
                      <li>Psychiatric evaluation if needed</li>
                      <li>Hormone therapy consultation</li>
                      <li>Regular check-ups</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="positive-mindset">
                <h3>Embracing This Life Stage</h3>
                <div className="mindset-content">
                  <div className="mindset-text">
                    <h4>Reframe Your Perspective</h4>
                    <p>
                      Menopause marks the beginning of a new chapter in your life. Many women find 
                      this stage liberating - freedom from periods, no worry about unplanned pregnancy, 
                      and often more time to focus on personal goals and relationships.
                    </p>
                    
                    <h4>Celebrate Your Wisdom</h4>
                    <p>
                      You've gained decades of life experience, wisdom, and strength. This is a time 
                      to honor your journey and embrace the confidence that comes with maturity.
                    </p>
                  </div>
                  
                  <div className="positive-aspects">
                    <h4>Positive Aspects of Menopause</h4>
                    <ul>
                      <li>No more periods or PMS</li>
                      <li>No need for contraception</li>
                      <li>Often increased self-confidence</li>
                      <li>More time for personal pursuits</li>
                      <li>Deeper, more meaningful relationships</li>
                      <li>Greater emotional stability (post-transition)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="when-to-seek-help">
                <h3>When to Seek Professional Help</h3>
                <div className="help-indicators">
                  <div className="indicator-item">
                    <span className="indicator-icon">⚠️</span>
                    <span>Persistent sadness or depression lasting more than two weeks</span>
                  </div>
                  <div className="indicator-item">
                    <span className="indicator-icon">⚠️</span>
                    <span>Severe anxiety that interferes with daily activities</span>
                  </div>
                  <div className="indicator-item">
                    <span className="indicator-icon">⚠️</span>
                    <span>Thoughts of self-harm or suicide</span>
                  </div>
                  <div className="indicator-item">
                    <span className="indicator-icon">⚠️</span>
                    <span>Inability to function at work or in relationships</span>
                  </div>
                  <div className="indicator-item">
                    <span className="indicator-icon">⚠️</span>
                    <span>Substance abuse as a coping mechanism</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menopause;