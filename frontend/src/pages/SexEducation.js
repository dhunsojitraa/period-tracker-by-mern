import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SexEducation.css';

const qaData = [
  {
    category: 'Fertility & Cycle',
    questions: [
      {
        q: 'When am I most fertile during my cycle?',
        a: 'You are most fertile during your ovulation window — typically 5 days before ovulation and the day of ovulation itself. For a 28-day cycle, this is usually around days 10–16. Sperm can survive up to 5 days inside the body, so having unprotected sex before ovulation can still result in pregnancy.'
      },
      {
        q: 'Can I get pregnant during my period?',
        a: 'It is unlikely but possible. If you have a short cycle (21–24 days), your fertile window can overlap with the end of your period. Sperm can survive up to 5 days, so if you ovulate early, pregnancy is possible. Using contraception is the only reliable way to prevent pregnancy.'
      },
      {
        q: 'How do I know if I am ovulating?',
        a: 'Signs of ovulation include: clear, stretchy cervical mucus (like egg whites), a slight rise in basal body temperature (0.2–0.5°C), mild one-sided pelvic pain (mittelschmerz), increased sex drive, and breast tenderness. Ovulation predictor kits (OPKs) can also detect the LH surge that triggers ovulation.'
      },
      {
        q: 'Does stress affect fertility?',
        a: 'Yes. High stress levels can disrupt hormonal balance, delay or prevent ovulation, and cause irregular cycles. Chronic stress raises cortisol levels which can interfere with reproductive hormones like LH and FSH. Managing stress through exercise, sleep, and relaxation techniques supports reproductive health.'
      },
      {
        q: 'What is the fertile window?',
        a: 'The fertile window is the period during which pregnancy is possible. It spans about 6 days: the 5 days before ovulation and the day of ovulation. The egg survives only 12–24 hours after release, but sperm can live up to 5 days in the reproductive tract, making the days before ovulation equally important.'
      }
    ]
  },
  {
    category: 'Contraception',
    questions: [
      {
        q: 'What are the most effective forms of contraception?',
        a: 'The most effective methods (>99%) include: hormonal IUDs, copper IUDs, implants, and sterilization. Highly effective methods (91–99%) include: birth control pills, patches, injections, and vaginal rings. Barrier methods like condoms are 85–98% effective with correct use. Condoms are the only method that also protects against STIs.'
      },
      {
        q: 'How does the birth control pill work?',
        a: 'Combined oral contraceptive pills contain synthetic estrogen and progestin. They work by: (1) preventing ovulation, (2) thickening cervical mucus to block sperm, and (3) thinning the uterine lining. They must be taken at the same time daily for maximum effectiveness. Missing pills reduces effectiveness significantly.'
      },
      {
        q: 'What is emergency contraception?',
        a: 'Emergency contraception (EC) is used after unprotected sex to prevent pregnancy. Options include: the morning-after pill (levonorgestrel, effective up to 72 hours), ella (ulipristal acetate, effective up to 120 hours), and the copper IUD (most effective, up to 5 days). EC does not terminate an existing pregnancy — it prevents one from occurring.'
      },
      {
        q: 'Can hormonal contraception affect my cycle?',
        a: 'Yes. Hormonal contraception can cause lighter periods, irregular spotting, or no periods at all. After stopping hormonal contraception, it may take 1–3 months for your natural cycle to return. Some people experience post-pill amenorrhea (no period for several months) which usually resolves on its own.'
      }
    ]
  },
  {
    category: 'Sexual Health',
    questions: [
      {
        q: 'What are STIs and how are they transmitted?',
        a: 'Sexually transmitted infections (STIs) are infections passed through sexual contact. Common STIs include chlamydia, gonorrhea, syphilis, herpes (HSV), HPV, and HIV. They are transmitted through vaginal, anal, or oral sex, and some (like herpes and HPV) through skin-to-skin contact. Regular testing and using condoms significantly reduces risk.'
      },
      {
        q: 'How often should I get tested for STIs?',
        a: 'If you are sexually active, annual STI testing is recommended. More frequent testing (every 3–6 months) is advised if you have multiple partners, do not consistently use condoms, or have had a recent exposure. Many STIs have no symptoms, so testing is the only way to know your status. Early detection means easier treatment.'
      },
      {
        q: 'What is HPV and should I get vaccinated?',
        a: 'Human Papillomavirus (HPV) is the most common STI. Most sexually active people will get HPV at some point. Most infections clear on their own, but some strains can cause genital warts or cervical cancer. The HPV vaccine (Gardasil) is highly effective and recommended for ages 9–26, ideally before sexual activity begins. It protects against the most dangerous strains.'
      },
      {
        q: 'Is it normal to experience pain during sex?',
        a: 'Occasional mild discomfort can be normal, but persistent pain during sex (dyspareunia) is not something to ignore. Causes include: insufficient lubrication, infections, endometriosis, vaginismus (involuntary muscle spasms), ovarian cysts, or hormonal changes. If you experience regular pain, consult a gynecologist. Using lubricant and communicating with your partner can help.'
      },
      {
        q: 'What is consent and why does it matter?',
        a: 'Consent is a clear, enthusiastic, and ongoing agreement to engage in sexual activity. It must be freely given (no pressure or coercion), reversible (can be withdrawn at any time), informed (both parties understand what they are agreeing to), enthusiastic (both want to participate), and specific (agreeing to one act does not mean agreeing to others). Consent is the foundation of healthy sexual relationships.'
      }
    ]
  },
  {
    category: 'Body & Anatomy',
    questions: [
      {
        q: 'What happens during the menstrual cycle?',
        a: 'The menstrual cycle has four phases: (1) Menstrual phase (days 1–5): the uterine lining sheds as your period. (2) Follicular phase (days 1–13): FSH stimulates follicle growth in the ovaries; estrogen rises and rebuilds the uterine lining. (3) Ovulation (day 14): LH surge triggers egg release. (4) Luteal phase (days 15–28): progesterone rises to prepare for potential pregnancy; if no fertilization occurs, levels drop and the cycle restarts.'
      },
      {
        q: 'What is the hymen and does it "break"?',
        a: 'The hymen is a thin, flexible membrane that partially covers the vaginal opening. It does not "break" — it stretches and may tear slightly during physical activity, tampon use, or first sexual intercourse. Not all people bleed the first time they have sex, and the presence or absence of an intact hymen is not an indicator of virginity. The hymen varies greatly in shape and size between individuals.'
      },
      {
        q: 'What is vaginal discharge and when is it normal?',
        a: 'Vaginal discharge is normal and healthy — it is how the vagina cleans itself. Normal discharge is clear to white, has a mild odor, and varies in consistency throughout the cycle (watery near ovulation, thicker in the luteal phase). Abnormal discharge that may indicate infection is: yellow/green, cottage cheese-like, has a strong fishy odor, or is accompanied by itching or burning. See a doctor if you notice these changes.'
      }
    ]
  }
];

const SexEducation = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = searchQuery.trim()
    ? qaData.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.questions.length > 0)
    : qaData;

  return (
    <div className="sex-ed-page">
      <div className="container">

        
        <div className="sex-ed-header">
          <h1>Sex Education & Reproductive Health</h1>
          <p>Evidence-based answers to your most important questions about sexual health, fertility, and your body.</p>
          <div className="disclaimer-banner">
            <span>ℹ️</span>
            <span>This content is for educational purposes only. Always consult a qualified healthcare provider for personal medical advice.</span>
          </div>
        </div>

        
        <div className="fertility-connection-card">
          <div className="fc-content">
            <div className="fc-icon">🌱</div>
            <div className="fc-text">
              <h3>Connected to Your Fertility Tracker</h3>
              <p>Understanding sex education helps you make sense of your cycle data. Your fertile window, ovulation signs, and cycle phases are all directly related to reproductive health.</p>
            </div>
            <Link to="/fertility" className="btn btn-primary fc-btn">View Fertility Tracker</Link>
          </div>
        </div>

        
        <div className="sex-ed-search">
          <input
            type="text"
            placeholder="Search questions... (e.g. 'ovulation', 'contraception', 'STI')"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        
        {!searchQuery && (
          <div className="category-tabs">
            {qaData.map((cat, idx) => (
              <button
                key={idx}
                className={`category-tab ${activeCategory === idx ? 'active' : ''}`}
                onClick={() => setActiveCategory(idx)}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        
        <div className="qa-section">
          {(searchQuery ? filteredData : [filteredData[activeCategory]]).map((cat, catIdx) => (
            <div key={catIdx} className="qa-category">
              {searchQuery && <h2 className="qa-category-title">{cat.category}</h2>}
              <div className="qa-list">
                {cat.questions.map((item, idx) => {
                  const key = `${catIdx}-${idx}`;
                  return (
                    <div
                      key={key}
                      className={`qa-item ${openQuestion === key ? 'open' : ''}`}
                    >
                      <button
                        className="qa-question"
                        onClick={() => setOpenQuestion(openQuestion === key ? null : key)}
                      >
                        <span className="q-icon">Q</span>
                        <span className="q-text">{item.q}</span>
                        <span className="q-arrow">{openQuestion === key ? '▲' : '▼'}</span>
                      </button>
                      {openQuestion === key && (
                        <div className="qa-answer">
                          <span className="a-icon">A</span>
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="no-results">
              <p>No questions found for "{searchQuery}". Try different keywords.</p>
            </div>
          )}
        </div>

        
        <div className="related-topics">
          <h2>Related Topics</h2>
          <div className="related-grid">
            <Link to="/fertility" className="related-card">
              <span className="related-icon">🌱</span>
              <h4>Fertility Tracking</h4>
              <p>Track your fertile window and ovulation signs</p>
            </Link>
            <Link to="/cycle-phases" className="related-card">
              <span className="related-icon">🔄</span>
              <h4>Cycle Phases</h4>
              <p>Understand each phase of your menstrual cycle</p>
            </Link>
            <Link to="/symptoms" className="related-card">
              <span className="related-icon">💊</span>
              <h4>Symptom Guide</h4>
              <p>Learn about common symptoms and relief</p>
            </Link>
            <Link to="/menopause" className="related-card">
              <span className="related-icon">🌸</span>
              <h4>Menopause</h4>
              <p>Reproductive health through all life stages</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SexEducation;
