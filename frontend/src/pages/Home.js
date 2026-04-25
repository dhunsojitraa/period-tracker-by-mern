import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Your Digital Best Friend for 
                <span className="gradient-text"> Menstrual Wellness</span>
              </h1>
              <p className="hero-description">
                Track your cycle, understand your body, and embrace your journey with 
                compassionate guidance, educational resources, and personalized insights.
              </p>
              <div className="hero-buttons">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn btn-primary btn-large">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-large">
                      Start Your Journey
                    </Link>
                    <Link to="/cycle-phases" className="btn btn-outline btn-large">
                      Learn More
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-illustration">
                
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="features">
        <div className="container">
          <h2 className="section-title">Everything You Need for Wellness</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Period Tracking</h3>
              <p>Smart predictions and personalized cycle insights to help you plan ahead with confidence.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">😊</div>
              <h3>Mood Tracking</h3>
              <p>Understand your emotional patterns and connect them with your cycle phases.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Educational Content</h3>
              <p>Learn about your body, hormones, and wellness with evidence-based information.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💊</div>
              <h3>Symptom Relief</h3>
              <p>Get personalized remedies, yoga poses, and self-care tips for common symptoms.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h3>Music Therapy</h3>
              <p>Curated playlists to match your mood and support emotional wellness.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Holistic Wellness</h3>
              <p>Comprehensive support for fertility awareness and menopause guidance.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="why-choose-us">
        <div className="container">
          <div className="why-content">
            <div className="why-text">
              <h2>Why A Girl's Best Friend?</h2>
              <div className="why-points">
                <div className="why-point">
                  <div className="point-icon">🔒</div>
                  <div>
                    <h4>Privacy First</h4>
                    <p>Your health data is encrypted and never shared with third parties.</p>
                  </div>
                </div>
                <div className="why-point">
                  <div className="point-icon">💝</div>
                  <div>
                    <h4>Compassionate Design</h4>
                    <p>Built with empathy and understanding for your unique journey.</p>
                  </div>
                </div>
                <div className="why-point">
                  <div className="point-icon">📚</div>
                  <div>
                    <h4>Evidence-Based</h4>
                    <p>All content is backed by medical research and expert guidance.</p>
                  </div>
                </div>
                <div className="why-point">
                  <div className="point-icon">🌈</div>
                  <div>
                    <h4>Inclusive & Supportive</h4>
                    <p>Welcoming space for all bodies and experiences.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-image">
              <div className="testimonial-card">
                <p>"This app has helped me understand my body better and feel more confident about my health decisions."</p>
                <div className="testimonial-author">
                  <div className="author-avatar">👩</div>
                  <span>Sarah, 28</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Wellness Journey?</h2>
            <p>Join thousands of women who trust A Girl's Best Friend for their menstrual health.</p>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started Free
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;