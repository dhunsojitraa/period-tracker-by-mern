import React from 'react';
import './Fertility.css';

const Fertility = () => {
  return (
    <div className="fertility-page">
      <div className="container">
        <div className="fertility-header">
          <h1>Fertility Education</h1>
          <p>Understanding your reproductive health and fertility awareness</p>
        </div>

        
        <div className="fertility-section">
          <div className="section-card">
            <h2>What is Fertility?</h2>
            <div className="content-grid">
              <div className="content-text">
                <p>
                  Fertility refers to your body's natural ability to conceive and carry a pregnancy to term. 
                  Understanding your fertility involves knowing your menstrual cycle, ovulation patterns, 
                  and the factors that can influence your reproductive health.
                </p>
                <p>
                  Fertility awareness is not just about trying to conceive - it's about understanding 
                  your body's natural rhythms and taking charge of your reproductive health throughout 
                  all stages of life.
                </p>
              </div>
              <div className="content-visual">
                <div className="fertility-icon">🌱</div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="fertility-section">
          <div className="section-card">
            <h2>Understanding Ovulation</h2>
            <div className="ovulation-info">
              <div className="ovulation-process">
                <h3>The Ovulation Process</h3>
                <div className="process-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Follicular Phase</h4>
                      <p>Your brain signals the ovaries to prepare an egg for release</p>
                    </div>
                  </div>
                  
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Ovulation</h4>
                      <p>The mature egg is released from the ovary into the fallopian tube</p>
                    </div>
                  </div>
                  
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Fertile Window</h4>
                      <p>The egg can be fertilized for about 12-24 hours after release</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ovulation-timing">
                <h3>When Does Ovulation Occur?</h3>
                <div className="timing-info">
                  <div className="timing-item">
                    <div className="timing-icon">📅</div>
                    <div>
                      <h4>Typical Timing</h4>
                      <p>Usually occurs around day 14 of a 28-day cycle</p>
                    </div>
                  </div>
                  
                  <div className="timing-item">
                    <div className="timing-icon">🔄</div>
                    <div>
                      <h4>Individual Variation</h4>
                      <p>Can vary from cycle to cycle and person to person</p>
                    </div>
                  </div>
                  
                  <div className="timing-item">
                    <div className="timing-icon">⏰</div>
                    <div>
                      <h4>Fertile Window</h4>
                      <p>5 days before ovulation + day of ovulation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="fertility-section">
          <div className="section-card">
            <h2>Fertility Signs to Track</h2>
            <div className="signs-grid">
              <div className="sign-card">
                <div className="sign-icon">🌡️</div>
                <h3>Basal Body Temperature</h3>
                <p>Your body temperature rises slightly after ovulation due to progesterone</p>
                <div className="sign-details">
                  <h4>How to Track:</h4>
                  <ul>
                    <li>Take temperature first thing in the morning</li>
                    <li>Use a basal body thermometer</li>
                    <li>Track daily for several cycles</li>
                    <li>Look for a sustained temperature rise</li>
                  </ul>
                </div>
              </div>

              <div className="sign-card">
                <div className="sign-icon">💧</div>
                <h3>Cervical Mucus</h3>
                <p>Changes in cervical mucus consistency indicate different phases of your cycle</p>
                <div className="sign-details">
                  <h4>What to Look For:</h4>
                  <ul>
                    <li>Dry or minimal mucus after period</li>
                    <li>Sticky, thick mucus as estrogen rises</li>
                    <li>Creamy, lotion-like mucus approaching ovulation</li>
                    <li>Clear, stretchy "egg white" mucus at ovulation</li>
                  </ul>
                </div>
              </div>

              <div className="sign-card">
                <div className="sign-icon">📍</div>
                <h3>Cervical Position</h3>
                <p>The cervix changes position and texture throughout your cycle</p>
                <div className="sign-details">
                  <h4>Changes to Notice:</h4>
                  <ul>
                    <li>Low, firm, and closed after period</li>
                    <li>Gradually rises and softens</li>
                    <li>High, soft, and open around ovulation</li>
                    <li>Returns to low and firm after ovulation</li>
                  </ul>
                </div>
              </div>

              <div className="sign-card">
                <div className="sign-icon">⚡</div>
                <h3>Ovulation Pain</h3>
                <p>Some women experience mild pain or cramping during ovulation</p>
                <div className="sign-details">
                  <h4>Characteristics:</h4>
                  <ul>
                    <li>One-sided lower abdominal pain</li>
                    <li>Lasts from minutes to hours</li>
                    <li>May alternate sides each month</li>
                    <li>Usually mild and manageable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="fertility-section">
          <div className="section-card">
            <h2>Healthy Habits for Reproductive Health</h2>
            <div className="habits-grid">
              <div className="habit-category">
                <h3>Nutrition</h3>
                <div className="habit-list">
                  <div className="habit-item">
                    <span className="habit-icon">🥗</span>
                    <span>Eat a balanced diet rich in fruits and vegetables</span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-icon">🐟</span>
                    <span>Include omega-3 fatty acids from fish or supplements</span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-icon">🥜</span>
                    <span>Get adequate protein from various sources</span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-icon">💊</span>
                    <span>Consider folic acid supplementation</span>
                  </div>
                </div>
              </div>

              <div className="habit-category">
                <h3>Lifestyle</h3>
                <div className="habit-list">
                  <div className="habit-item">
                    <span className="habit-icon">🏃‍♀️</span>
                    <span>Maintain regular, moderate exercise</span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-icon">😴</span>
                    <span>Get 7-9 hours of quality sleep</span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-icon">🧘‍♀️</span>
                    <span>Manage stress through relaxation techniques</span>
                  </div>
                  <div className="habit-item">
                    <span className="habit-icon">💧</span>
                    <span>Stay well-hydrated throughout the day</span>
                  </div>
                </div>
              </div>

              <div className="habit-category">
                <h3>Avoid</h3>
                <div className="habit-list">
                  <div className="habit-item avoid">
                    <span className="habit-icon">🚭</span>
                    <span>Smoking and tobacco products</span>
                  </div>
                  <div className="habit-item avoid">
                    <span className="habit-icon">🍷</span>
                    <span>Excessive alcohol consumption</span>
                  </div>
                  <div className="habit-item avoid">
                    <span className="habit-icon">☕</span>
                    <span>Too much caffeine (limit to 1-2 cups/day)</span>
                  </div>
                  <div className="habit-item avoid">
                    <span className="habit-icon">⚖️</span>
                    <span>Extreme weight loss or gain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="fertility-section">
          <div className="section-card">
            <h2>Age and Fertility</h2>
            <div className="age-info">
              <div className="age-content">
                <p>
                  Fertility naturally changes with age, and understanding these changes can help 
                  you make informed decisions about your reproductive health.
                </p>
                
                <div className="age-stages">
                  <div className="age-stage">
                    <h4>20s</h4>
                    <p>Peak fertility years with the highest chance of conception and lowest risk of pregnancy complications.</p>
                  </div>
                  
                  <div className="age-stage">
                    <h4>Early 30s</h4>
                    <p>Fertility remains high, though it begins to gradually decline after age 32.</p>
                  </div>
                  
                  <div className="age-stage">
                    <h4>Late 30s</h4>
                    <p>More noticeable decline in fertility, with increased time to conception and higher miscarriage risk.</p>
                  </div>
                  
                  <div className="age-stage">
                    <h4>40s and Beyond</h4>
                    <p>Significant fertility decline, but pregnancy is still possible with proper medical support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="fertility-section">
          <div className="section-card medical-advice">
            <h2>When to Consult a Healthcare Provider</h2>
            <div className="medical-grid">
              <div className="medical-item">
                <div className="medical-icon">⏰</div>
                <div>
                  <h4>Trying to Conceive</h4>
                  <p>If you're under 35 and have been trying for 12 months, or over 35 and trying for 6 months</p>
                </div>
              </div>
              
              <div className="medical-item">
                <div className="medical-icon">📅</div>
                <div>
                  <h4>Irregular Cycles</h4>
                  <p>Cycles shorter than 21 days or longer than 35 days, or highly unpredictable timing</p>
                </div>
              </div>
              
              <div className="medical-item">
                <div className="medical-icon">🤕</div>
                <div>
                  <h4>Painful Periods</h4>
                  <p>Severe menstrual pain that interferes with daily activities</p>
                </div>
              </div>
              
              <div className="medical-item">
                <div className="medical-icon">🩸</div>
                <div>
                  <h4>Heavy Bleeding</h4>
                  <p>Periods lasting longer than 7 days or requiring frequent pad/tampon changes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="fertility-section">
          <div className="section-card">
            <h2>Continue Learning</h2>
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">📚</div>
                <h4>Recommended Reading</h4>
                <ul>
                  <li>"Taking Charge of Your Fertility" by Toni Weschler</li>
                  <li>"The Fifth Vital Sign" by Lisa Hendrickson-Jack</li>
                  <li>"Period Repair Manual" by Lara Briden</li>
                </ul>
              </div>
              
              <div className="resource-card">
                <div className="resource-icon">🏥</div>
                <h4>Professional Support</h4>
                <ul>
                  <li>Reproductive endocrinologists</li>
                  <li>Fertility awareness educators</li>
                  <li>Gynecologists specializing in fertility</li>
                </ul>
              </div>
              
              <div className="resource-card">
                <div className="resource-icon">📱</div>
                <h4>Tracking Tools</h4>
                <ul>
                  <li>Basal body temperature charts</li>
                  <li>Fertility tracking apps</li>
                  <li>Ovulation predictor kits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fertility;