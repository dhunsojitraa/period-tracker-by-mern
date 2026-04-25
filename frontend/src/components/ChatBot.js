import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const knowledgeBase = [
  { keywords: ['how long', 'period last', 'period duration', 'days period'],
    answer: 'A normal period lasts between 3 to 7 days. Anything shorter than 2 days or longer than 8 days consistently should be discussed with a doctor. Flow is usually heaviest in the first 1-2 days and lightens toward the end.' },
  { keywords: ['normal cycle', 'cycle length', 'how long cycle', 'cycle days'],
    answer: 'A normal menstrual cycle is between 21 to 35 days, counted from the first day of one period to the first day of the next. The average is 28 days, but every person is different. Cycles can vary slightly month to month.' },
  { keywords: ['late period', 'missed period', 'period not come', 'period delayed', 'no period'],
    answer: 'A late or missed period can be caused by: stress, significant weight changes, excessive exercise, illness, hormonal imbalances, thyroid issues, or pregnancy. If you are sexually active and your period is more than a week late, take a pregnancy test. If periods are consistently irregular, consult a gynecologist.' },
  { keywords: ['period early', 'period came early', 'period before time'],
    answer: 'An early period can be caused by stress, hormonal fluctuations, changes in diet or exercise, or ovulation timing shifts. Occasional early periods are normal. If it happens frequently, it may indicate a hormonal imbalance worth discussing with a doctor.' },
  { keywords: ['skip period', 'missed one period', 'period skipped'],
    answer: 'Skipping one period occasionally can be normal and caused by stress, illness, travel, or hormonal changes. If you skip more than 2-3 periods in a row (and are not pregnant), this is called amenorrhea and should be evaluated by a healthcare provider.' },
  { keywords: ['heavy period', 'heavy bleeding', 'heavy flow', 'lots of blood'],
    answer: 'Heavy periods (menorrhagia) involve soaking through a pad or tampon every hour for several hours. Causes include fibroids, polyps, hormonal imbalances, or thyroid issues. Iron deficiency can result from heavy periods. If this is regular, see a doctor. Iron-rich foods like spinach, lentils, and red meat can help.' },
  { keywords: ['light period', 'very light period', 'barely bleeding', 'light flow'],
    answer: 'Light periods can be normal for some people. They can also be caused by hormonal contraception, low body weight, excessive exercise, stress, or thyroid issues. If your periods suddenly become much lighter than usual, it is worth mentioning to a doctor.' },
  { keywords: ['period pain', 'cramps', 'menstrual cramps', 'stomach pain period', 'period hurts'],
    answer: 'Period cramps (dysmenorrhea) are caused by prostaglandins that make the uterus contract. Relief tips: heating pad on lower abdomen, ibuprofen or naproxen (anti-inflammatory), gentle yoga or walking, staying hydrated, and magnesium-rich foods like dark chocolate and nuts. Severe cramps that interfere with daily life may indicate endometriosis — see a doctor.' },
  { keywords: ['clots', 'blood clots', 'clotting period'],
    answer: 'Small blood clots (smaller than a quarter) during your period are normal, especially on heavy flow days. Larger clots or very frequent clotting can indicate heavy menstrual bleeding, fibroids, or hormonal imbalance. If you regularly pass large clots, consult a gynecologist.' },
  { keywords: ['period smell', 'period odor', 'blood smell'],
    answer: 'A mild metallic smell during your period is completely normal — it comes from the iron in blood. A strong, fishy, or unpleasant odor may indicate bacterial vaginosis or an infection. Good hygiene (changing pads/tampons every 4-6 hours) helps. If the odor is strong or unusual, see a doctor.' },

  { keywords: ['white discharge', 'milky discharge', 'creamy discharge'],
    answer: 'White or milky discharge is usually normal. Before your period it can be thick and white (normal). Mid-cycle it may be creamy. If white discharge is accompanied by itching, burning, or a cottage cheese texture, it may indicate a yeast infection. See a doctor if you have those symptoms.' },
  { keywords: ['clear discharge', 'watery discharge', 'egg white discharge', 'stretchy discharge'],
    answer: 'Clear, stretchy discharge that looks like raw egg whites is a sign of ovulation — this is your most fertile time! Clear watery discharge is also normal throughout the cycle. This type of discharge helps sperm travel to the egg.' },
  { keywords: ['yellow discharge', 'green discharge', 'yellow green discharge'],
    answer: 'Yellow or green discharge is often a sign of infection. It can indicate bacterial vaginosis, trichomoniasis, gonorrhea, or chlamydia. If your discharge is yellow or green, especially with a bad odor or itching, see a doctor for testing and treatment.' },
  { keywords: ['brown discharge', 'dark discharge', 'brown spotting'],
    answer: 'Brown discharge is usually old blood leaving the body. It is common at the beginning or end of your period, or as spotting mid-cycle. Brown discharge after sex can indicate cervical irritation. If brown discharge is heavy, persistent, or accompanied by pain, consult a doctor.' },
  { keywords: ['pink discharge', 'pink spotting', 'light pink'],
    answer: 'Pink discharge is usually light bleeding mixed with normal discharge. It can occur during ovulation, implantation (early pregnancy sign), or at the start/end of a period. Occasional pink discharge is usually not concerning, but if it is frequent or heavy, see a doctor.' },
  { keywords: ['discharge before period', 'discharge before menstruation'],
    answer: 'Discharge before your period is normal. In the luteal phase (after ovulation), discharge tends to be thicker and white or creamy. As your period approaches, you may notice more discharge. This is your body\'s natural cleaning process.' },
  { keywords: ['discharge after period', 'discharge after menstruation'],
    answer: 'After your period, discharge is usually minimal and may be slightly brown (old blood). As estrogen rises in the follicular phase, discharge increases and becomes clearer. This is completely normal.' },
  { keywords: ['lot of discharge', 'too much discharge', 'excessive discharge'],
    answer: 'The amount of discharge varies throughout the cycle and between individuals. More discharge is normal around ovulation. Consistently heavy discharge with odor, color changes, or itching may indicate an infection. If it is just increased volume without other symptoms, it is likely normal.' },
  { keywords: ['no discharge', 'dry vagina', 'vaginal dryness'],
    answer: 'Vaginal dryness or minimal discharge can be caused by hormonal changes, dehydration, certain medications, or menopause. It can cause discomfort during sex. Staying hydrated helps. Water-based lubricants can relieve dryness. If persistent, a doctor can check hormone levels.' },
  { keywords: ['discharge smell', 'discharge odor', 'fishy smell discharge'],
    answer: 'Normal discharge has a mild, slightly acidic smell. A strong fishy odor, especially after sex, is a classic sign of bacterial vaginosis (BV). BV is very common and easily treated with antibiotics. A yeast infection causes a yeasty or bread-like smell with thick white discharge. See a doctor for proper diagnosis.' },

  { keywords: ['ovulation', 'when ovulate', 'ovulation signs', 'ovulation symptoms'],
    answer: 'Ovulation is when your ovary releases an egg. Signs include: clear stretchy discharge (egg white consistency), mild one-sided pelvic pain (mittelschmerz), slight rise in basal body temperature, increased sex drive, and breast tenderness. For a 28-day cycle, ovulation typically occurs around day 14.' },
  { keywords: ['fertile window', 'fertile days', 'when can i get pregnant', 'best time conceive'],
    answer: 'Your fertile window is the 5 days before ovulation plus the day of ovulation — about 6 days total. Sperm can survive up to 5 days inside the body, so having sex in the days leading up to ovulation gives the best chance of conception. For a 28-day cycle, this is roughly days 10-16.' },
  { keywords: ['pregnant period', 'get pregnant during period', 'sex during period pregnancy'],
    answer: 'It is unlikely but possible to get pregnant during your period. If you have a short cycle (21-24 days), your fertile window can overlap with the end of your period. Sperm can survive up to 5 days, so if you ovulate early, pregnancy is possible. Contraception is the only reliable way to prevent pregnancy.' },
  { keywords: ['ovulation pain', 'mittelschmerz', 'pain ovulation', 'side pain ovulation'],
    answer: 'Ovulation pain (mittelschmerz) is a mild, one-sided lower abdominal pain that occurs when the egg is released. It can last from a few minutes to a few hours. It alternates sides each month. It is normal and not dangerous. A heating pad or ibuprofen can help if uncomfortable.' },
  { keywords: ['track ovulation', 'ovulation test', 'ovulation kit', 'lh surge'],
    answer: 'Ways to track ovulation: (1) Ovulation predictor kits (OPKs) detect the LH surge 24-36 hours before ovulation. (2) Basal body temperature (BBT) rises slightly after ovulation. (3) Cervical mucus becomes clear and stretchy at ovulation. (4) Apps like this one can predict ovulation based on your cycle length.' },

  { keywords: ['contraception', 'birth control', 'prevent pregnancy', 'protection'],
    answer: 'Common contraception methods: (1) Hormonal: pill, patch, injection, implant, hormonal IUD — 91-99% effective. (2) Barrier: condoms (male/female) — 85-98% effective, also protect against STIs. (3) IUD: copper or hormonal — over 99% effective. (4) Emergency contraception: morning-after pill (up to 72 hours) or copper IUD (up to 5 days). Always use condoms to protect against STIs.' },
  { keywords: ['birth control pill', 'the pill', 'oral contraceptive'],
    answer: 'The combined pill contains synthetic estrogen and progestin. It works by preventing ovulation, thickening cervical mucus, and thinning the uterine lining. It must be taken at the same time daily. It is 91-99% effective. It does not protect against STIs. Side effects can include nausea, mood changes, and spotting, especially in the first few months.' },
  { keywords: ['emergency contraception', 'morning after pill', 'plan b', 'after sex pill'],
    answer: 'Emergency contraception (EC) prevents pregnancy after unprotected sex. Options: (1) Levonorgestrel pill (Plan B) — take within 72 hours, most effective within 24 hours. (2) Ella (ulipristal acetate) — effective up to 120 hours. (3) Copper IUD — most effective option, works up to 5 days. EC does NOT terminate an existing pregnancy — it prevents one.' },
  { keywords: ['sti', 'std', 'sexually transmitted', 'infection sex', 'chlamydia', 'gonorrhea', 'herpes', 'hpv'],
    answer: 'STIs (sexually transmitted infections) are passed through sexual contact. Common ones: chlamydia, gonorrhea, syphilis, herpes (HSV), HPV, and HIV. Many have no symptoms. Prevention: use condoms consistently, get tested regularly, and get vaccinated for HPV and hepatitis B. If you think you may have been exposed, get tested — most STIs are easily treated when caught early.' },
  { keywords: ['hpv vaccine', 'gardasil', 'cervical cancer vaccine'],
    answer: 'The HPV vaccine (Gardasil) protects against the strains of HPV that cause most cervical cancers and genital warts. It is recommended for ages 9-26, ideally before sexual activity begins. It is given in 2-3 doses. Even if you are already sexually active, the vaccine still provides protection against strains you have not been exposed to.' },
  { keywords: ['consent', 'sexual consent', 'what is consent'],
    answer: 'Consent is a clear, enthusiastic, ongoing agreement to engage in sexual activity. It must be: Freely given (no pressure), Reversible (can be withdrawn anytime), Informed (both understand what they agree to), Enthusiastic (both genuinely want to), Specific (agreeing to one thing does not mean agreeing to everything). Consent cannot be given when someone is intoxicated, asleep, or under pressure.' },
  { keywords: ['pain during sex', 'sex hurts', 'painful intercourse', 'dyspareunia'],
    answer: 'Pain during sex (dyspareunia) is not something to ignore. Common causes: insufficient lubrication (use water-based lubricant), infections (yeast, BV, STIs), vaginismus (involuntary muscle spasms), endometriosis, ovarian cysts, or hormonal changes. Communicate with your partner and see a gynecologist if pain is persistent. It is treatable in most cases.' },
  { keywords: ['first time sex', 'losing virginity', 'first intercourse'],
    answer: 'First-time sex is different for everyone. Not everyone bleeds — the hymen varies greatly between individuals. Some discomfort is common but severe pain is not normal. Use lubrication, go slowly, and communicate with your partner. Use contraception and protection against STIs. Consent and comfort are the most important factors.' },

  { keywords: ['pms', 'premenstrual syndrome', 'before period symptoms', 'mood before period'],
    answer: 'PMS (Premenstrual Syndrome) occurs in the luteal phase (1-2 weeks before your period). Symptoms: mood swings, irritability, bloating, breast tenderness, fatigue, food cravings, and headaches. Management: regular exercise, reducing salt and caffeine, getting enough sleep, and stress management. Severe PMS may be PMDD — talk to a doctor.' },
  { keywords: ['pmdd', 'severe pms', 'extreme mood period'],
    answer: 'PMDD (Premenstrual Dysphoric Disorder) is a severe form of PMS that significantly impacts daily life. Symptoms include severe depression, anxiety, irritability, and mood swings in the week before your period that improve once menstruation begins. It is a recognized medical condition. Treatment options include SSRIs, hormonal therapy, and lifestyle changes. See a doctor for diagnosis.' },
  { keywords: ['endometriosis', 'endo', 'severe cramps condition'],
    answer: 'Endometriosis is a condition where tissue similar to the uterine lining grows outside the uterus. Symptoms: severe period pain, heavy bleeding, pain during sex, pain with bowel movements, and infertility. It affects 1 in 10 people with periods. Diagnosis requires laparoscopy. Treatment includes pain management, hormonal therapy, and surgery. See a gynecologist if you suspect it.' },
  { keywords: ['pcos', 'polycystic ovary', 'irregular periods condition'],
    answer: 'PCOS (Polycystic Ovary Syndrome) is a hormonal condition affecting the ovaries. Symptoms: irregular or absent periods, excess hair growth, acne, weight gain, and difficulty conceiving. It is one of the most common hormonal disorders. Diagnosis involves blood tests and ultrasound. Management includes lifestyle changes, hormonal contraception, and medications like metformin.' },
  { keywords: ['bloating period', 'bloated before period', 'stomach bloating'],
    answer: 'Bloating before and during your period is caused by hormonal changes (especially progesterone) that slow digestion and cause water retention. Tips to reduce bloating: reduce salt intake, avoid carbonated drinks, eat smaller meals, exercise regularly, and stay hydrated. Magnesium supplements may also help.' },
  { keywords: ['breast pain', 'breast tenderness', 'sore breasts period', 'boobs hurt period'],
    answer: 'Breast tenderness before your period is caused by rising progesterone levels. It usually peaks just before your period and improves once bleeding starts. Tips: wear a supportive bra, reduce caffeine, apply a warm or cold compress, and take ibuprofen if needed. If breast pain is severe, one-sided, or accompanied by a lump, see a doctor.' },
  { keywords: ['headache period', 'migraine period', 'headache before period'],
    answer: 'Menstrual migraines and headaches are triggered by the drop in estrogen just before your period. They can be severe. Management: stay hydrated, maintain regular sleep, avoid skipping meals, limit alcohol and caffeine, and take pain relief early. If migraines are severe or frequent, a doctor can prescribe preventive treatments.' },
  { keywords: ['tired period', 'fatigue period', 'exhausted period', 'low energy period'],
    answer: 'Fatigue during your period is caused by blood loss (leading to lower iron levels), hormonal changes, and prostaglandins. Tips: eat iron-rich foods (spinach, lentils, red meat), get enough sleep, stay hydrated, and do gentle exercise. If fatigue is severe, check your iron levels with a blood test — you may need iron supplements.' },
  { keywords: ['nausea period', 'sick during period', 'vomiting period'],
    answer: 'Nausea during your period is caused by prostaglandins (chemicals that cause uterine contractions) entering the bloodstream. Tips: eat small, bland meals, stay hydrated, ginger tea can help, and take ibuprofen (which reduces prostaglandins). If nausea is severe or accompanied by vomiting, see a doctor.' },
  { keywords: ['diarrhea period', 'loose stool period', 'bowel period'],
    answer: 'Diarrhea during your period is caused by prostaglandins affecting the bowel as well as the uterus. It is very common. Tips: eat easily digestible foods, stay hydrated, avoid fatty or spicy foods during your period, and ibuprofen can help reduce prostaglandins. It usually improves after the first 1-2 days.' },
  { keywords: ['back pain period', 'lower back period', 'back ache period'],
    answer: 'Lower back pain during your period is caused by uterine contractions radiating to the back. Tips: heating pad on lower back, ibuprofen or naproxen, gentle stretching or yoga, and staying active. If back pain is severe or extends down the legs, it may indicate endometriosis or other conditions — see a doctor.' },

  { keywords: ['tampon', 'how use tampon', 'tampon safe', 'tampon toxic shock'],
    answer: 'Tampons are safe when used correctly. Change every 4-8 hours — never leave in longer than 8 hours. Use the lowest absorbency needed. Toxic Shock Syndrome (TSS) is rare but serious — symptoms include sudden high fever, rash, and vomiting. If you experience these while using a tampon, remove it and seek emergency care immediately.' },
  { keywords: ['menstrual cup', 'cup period', 'diva cup'],
    answer: 'Menstrual cups are reusable silicone cups inserted into the vagina to collect blood. They can be worn for up to 12 hours, are eco-friendly, and cost-effective long-term. They have a learning curve for insertion and removal. Boil to sterilize between cycles. They are safe and do not increase infection risk when used properly.' },
  { keywords: ['pad', 'sanitary pad', 'sanitary napkin', 'how often change pad'],
    answer: 'Change pads every 4-6 hours, or more frequently on heavy flow days. Leaving a pad on too long can cause skin irritation and odor. Overnight pads are designed for longer wear. Wash the area with water (not soap inside the vagina) when changing. Unscented pads are better for sensitive skin.' },
  { keywords: ['vaginal hygiene', 'clean vagina', 'wash vagina', 'vaginal wash'],
    answer: 'The vagina is self-cleaning — it produces discharge that maintains its pH balance. You should only wash the external area (vulva) with warm water. Avoid douching, scented soaps, or vaginal washes inside the vagina — these disrupt the natural bacterial balance and can cause infections. Wear breathable cotton underwear.' },

  { keywords: ['foods period', 'eat during period', 'diet period', 'what to eat period'],
    answer: 'Best foods during your period: iron-rich foods (spinach, lentils, red meat) to replace lost iron, magnesium-rich foods (dark chocolate, nuts, bananas) for cramps, omega-3s (salmon, walnuts) to reduce inflammation, and plenty of water. Avoid: excess salt (causes bloating), caffeine (worsens cramps and anxiety), and alcohol (worsens mood and bloating).' },
  { keywords: ['exercise period', 'workout period', 'gym period', 'sport period'],
    answer: 'Exercise during your period is beneficial! It releases endorphins that reduce pain and improve mood. Light to moderate exercise like walking, yoga, or swimming is ideal. Avoid very intense workouts on heavy flow days if you feel unwell. Listen to your body — rest if needed, but gentle movement usually helps more than it hurts.' },
  { keywords: ['stress period', 'stress affect period', 'anxiety period'],
    answer: 'Stress significantly affects your menstrual cycle. High cortisol (stress hormone) can delay or prevent ovulation, causing late or missed periods. Chronic stress can lead to irregular cycles. Management: regular exercise, adequate sleep (7-9 hours), meditation, deep breathing, and reducing workload when possible. Your cycle is a good indicator of your overall health.' },
  { keywords: ['sleep period', 'insomnia period', 'cant sleep period'],
    answer: 'Sleep disturbances before and during your period are common, caused by hormonal changes (especially progesterone drop). Tips: maintain a consistent sleep schedule, keep your bedroom cool, avoid screens before bed, try magnesium supplements, and gentle yoga before sleep. Severe insomnia related to your cycle may indicate PMDD.' },
  { keywords: ['when see doctor', 'doctor period', 'gynecologist', 'when consult doctor'],
    answer: 'See a doctor if you experience: periods lasting longer than 8 days, very heavy bleeding (soaking a pad/tampon hourly), severe pain not relieved by ibuprofen, periods more than 35 days apart or fewer than 21 days, bleeding between periods, unusual discharge with odor or itching, or if you are trying to conceive without success after 12 months (6 months if over 35).' },
  { keywords: ['age period', 'first period', 'puberty period', 'menarche'],
    answer: 'The first period (menarche) typically occurs between ages 10-16, with the average being around 12-13. It usually starts 2-3 years after breast development begins. Early periods (before 10) or late periods (after 16) should be evaluated by a doctor. The first few years of periods are often irregular as the hormonal system matures.' },
  { keywords: ['menopause', 'end period', 'stop period age', 'perimenopause'],
    answer: 'Menopause is when periods permanently stop, typically between ages 45-55 (average 51). Perimenopause (the transition) can start years earlier with irregular periods, hot flashes, and mood changes. Menopause is confirmed after 12 consecutive months without a period. Hormone therapy and lifestyle changes can manage symptoms.' },
];

const getBotResponse = (input) => {
  const lower = input.toLowerCase().trim();

  if (!lower) return null;

  if (/^(hi|hello|hey|hii|helo|sup|yo|good morning|good evening|good afternoon)\b/.test(lower)) {
    return "Hi there! 🌸 I'm your health assistant. Ask me anything about periods, discharge, symptoms, sex education, fertility, contraception, or general reproductive health. What's on your mind?";
  }

  if (/thank|thanks|ty|thx|thank you/.test(lower)) {
    return "You're welcome! 💕 Feel free to ask anything else. I'm always here to help!";
  }

  if (/how are you|how r u|how do you do/.test(lower)) {
    return "I'm doing great, thanks for asking! 🌸 I'm here and ready to help you with any health questions. What would you like to know?";
  }

  if (/what can you|what do you|help me|what are you/.test(lower)) {
    return "I can answer questions about: 🩸 Periods & cycles, 💧 Discharge & vaginal health, 😣 Symptoms like cramps, bloating, PMS, 🌱 Fertility & ovulation, 💊 Contraception & birth control, 🔬 STIs & sexual health, 🧘 Wellness tips for your cycle, and much more! Just ask me anything!";
  }

  let bestMatch = null;  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  if (/period|menstrual|menstruation|bleed/.test(lower)) {
    return "I understand you have a question about periods. Could you be more specific? For example: 'Why is my period late?', 'How long should my period last?', 'What causes heavy periods?' I'll do my best to help! 🌸";
  }
  if (/discharge|vagina|vaginal/.test(lower)) {
    return "I can help with discharge questions! Try asking something like: 'What does white discharge mean?', 'Is yellow discharge normal?', or 'What is egg white discharge?' 💧";
  }
  if (/pregnant|pregnancy|conceive|conception/.test(lower)) {
    return "For pregnancy-related questions, I can help with topics like: fertile window, ovulation timing, early pregnancy signs, and when to take a pregnancy test. What specifically would you like to know? 🌱";
  }
  if (/sex|intercourse|contraception|condom|birth control/.test(lower)) {
    return "I can answer questions about sexual health and contraception. Try asking about: types of birth control, how contraception works, STI prevention, or consent. What would you like to know? 💊";
  }
  if (/pain|cramp|hurt|ache/.test(lower)) {
    return "Pain during your cycle is common but manageable. You can ask me about: period cramps, back pain, breast tenderness, ovulation pain, or pain during sex. What type of pain are you experiencing? 💙";
  }

  return "I'm not sure about that specific question. 🤔 I can help with: periods, discharge, cramps, ovulation, fertility, contraception, STIs, PMS, and general reproductive health. Try rephrasing or ask something like 'What causes cramps?' or 'What is normal discharge?' 💕";
};

const suggestedQuestions = [
  "What does white discharge mean?",
  "Why are my cramps so bad?",
  "When am I most fertile?",
  "What is PMS?",
  "Can I get pregnant on my period?",
  "What causes late periods?",
  "What is normal discharge?",
  "How do I track ovulation?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm your AI health assistant 🌸 Powered by GPT. Ask me anything about periods, discharge, symptoms, sex education, fertility, or reproductive health. Everything is private and confidential.",
      time: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [usingAI, setUsingAI] = useState(true);
  const messagesEndRef = useRef(null);

  const conversationHistory = useRef([]);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg = { role: 'user', text: msg, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    conversationHistory.current.push({ role: 'user', content: msg });

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:5000/api/chatbot/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: msg,
            conversationHistory: conversationHistory.current.slice(-8)
          })
        });

        const data = await response.json();

        if (response.ok && data.reply) {
          conversationHistory.current.push({ role: 'assistant', content: data.reply });
          setMessages(prev => [...prev, { role: 'bot', text: data.reply, time: new Date(), isAI: true }]);
          setUsingAI(true);
          setIsTyping(false);
          return;
        }

        if (data.error === 'OPENAI_API_KEY not set') {
          setUsingAI(false);
        }
      }

      setUsingAI(false);
      const fallbackResponse = getBotResponse(msg);
      setMessages(prev => [...prev, { role: 'bot', text: fallbackResponse, time: new Date(), isAI: false }]);

    } catch (error) {
      setUsingAI(false);
      const fallbackResponse = getBotResponse(msg);
      setMessages(prev => [...prev, { role: 'bot', text: fallbackResponse, time: new Date(), isAI: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <button
        className={`chatbot-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open health assistant"
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && <span className="fab-label">Ask me anything</span>}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">🌸</div>
            <div className="chatbot-header-info">
              <h4>Health Assistant</h4>
              <span className="chatbot-status">
                {usingAI ? '✨ AI Powered' : '📚 Knowledge Base'}
              </span>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-disclaimer">
            ℹ️ For educational purposes only. Not a substitute for medical advice.
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                {msg.role === 'bot' && <div className="bot-avatar">🌸</div>}
                <div className="message-bubble">
                  <p>{msg.text}</p>
                  <div className="message-meta">
                    <span className="message-time">{formatTime(msg.time)}</span>
                    {msg.role === 'bot' && (
                      <span className="message-source">
                        {msg.isAI ? '✨ GPT' : '📚 KB'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <div className="bot-avatar">🌸</div>
                <div className="message-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="suggested-questions">
              <p className="suggested-label">Quick questions:</p>
              <div className="suggested-list">
                {suggestedQuestions.map((q, idx) => (
                  <button key={idx} className="suggested-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything about your health..."
              className="chatbot-input"
            />
            <button
              className="chatbot-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
