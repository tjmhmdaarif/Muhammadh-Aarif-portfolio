export const palette = {
  obsidian: '#090909',
  bone: '#F1EBDD',
  vermilion: '#E52B24',
  crimson: '#8C101B',
  ember: '#FF6A2A',
  gold: '#BFA36A',
} as const

export const profile = {
  name: 'Muhammadh Aarif T J',
  shortName: 'Aarif',
  kicker: '燃桜 · THE BURNING SAKURA',
  positioning:
    'Final-year ECE undergraduate building at the seam of software, automation and agentic AI — from wind-turbine SCADA intelligence to voice-driven RAG systems.',
  tagline: 'Automate the repetitive. Reason about the rest.',
  location: 'Coimbatore, India',
  education: {
    degree: 'B.E. Electronics & Communication Engineering',
    institution: 'Dr. N.G.P. Institute of Technology',
    period: '2023 – 2027',
    cgpa: '7.64',
  },
  openTo: 'Software roles · hybrid software + automation roles',
  currently: [
    'Sharpening Python + DSA on a 120-day roadmap',
    'Shipping WindSense AI and the Voice-RAG Pipeline',
    'Deepening real-time systems thinking (RTOS / QNX)',
  ],
  statusLabel: 'Final-year · shipping agentic AI projects',
  portrait: '/portrait.png',
  portraitFallback: 'https://avatars.githubusercontent.com/u/193417283?v=4&s=800',
  // TODO: Replace /portrait.png with a verified high-resolution portrait photograph.
  // The current file (1,563 bytes) is insufficient — it triggers the fallback below.
  // See: docs/current-state-audit.md#defect-1-real-photograph-does-not-appear
} as const

export type Project = {
  id: string
  name: string
  tagline: string
  problem: string
  why: string
  solution: string
  technologies: string[]
  team?: string
  metrics: { value: string; label: string }[]
  status: string
  statusLabel: string
  recognition?: string
  repoUrl?: string
  liveUrl?: string
  evidence: { label: string; url: string }[]
  verification: string
  featured: boolean
  priority: number
  category: string
  sigil: string
}

export const projects: Project[] = [
  {
    id: 'windsense-ai',
    name: 'WindSense AI',
    tagline: 'Intelligent alarm management & predictive maintenance for wind turbines',
    problem:
      'Wind-turbine SCADA systems generate thousands of alarm events; without intelligent prioritisation, critical alarms are buried under repetitive, low-impact noise — driving downtime and lost production.',
    why: 'Moving wind-farm operations from reactive alarm handling to predictive, intelligence-led maintenance.',
    solution:
      'A machine-learning pipeline that classifies alarms with a Random Forest, detects anomalous operating conditions with Isolation Forest, balances rare fault classes with SMOTE oversampling, then prioritises alarms through root-cause analysis — surfaced in an interactive Streamlit dashboard with live OPC UA monitoring and WhatsApp / email alerting.',
    technologies: ['Python', 'Scikit-learn', 'Random Forest', 'Isolation Forest', 'SMOTE', 'Streamlit', 'OPC UA', 'Twilio'],
    team: 'Team TG0907494 — with Divyalakshmi (data analysis & documentation) and Aparajithaa (system development & validation)',
    metrics: [
      { value: '94.8%', label: 'reported model accuracy' },
      { value: '−60%', label: 'false alarms after SMOTE' },
      { value: 'Finalist', label: 'TECHgium 9th Edition, L&T TS' },
    ],
    status: 'live-demo',
    statusLabel: 'Live demo',
    recognition: 'TECHgium 9th Edition Finalist — L&T Technology Services',
    repoUrl: 'https://github.com/tjmhmdaarif/windsense-ai',
    liveUrl: 'https://windsense-ai.streamlit.app',
    evidence: [
      { label: 'Repository', url: 'https://github.com/tjmhmdaarif/windsense-ai' },
      { label: 'Live demo', url: 'https://windsense-ai.streamlit.app' },
    ],
    verification: 'verified-repo',
    featured: true,
    priority: 1,
    category: 'software-ai',
    sigil: 'wind',
  },
  {
    id: 'voice-rag',
    name: 'Voice-Enabled RAG Pipeline',
    tagline: 'Low-latency voice-driven retrieval-augmented generation',
    problem:
      'Hackathon brief: make retrieval-augmented generation usable by voice, end-to-end, with the latency and guardrails a live demo demands.',
    why: 'Voice is the most natural interface to knowledge — and a hard test of retrieval, orchestration and latency engineering.',
    solution:
      'A FastAPI pipeline: multi-provider speech-to-text (Sarvam AI, ElevenLabs, or a sub-200 ms mock transcriber), an in-memory vector index over the MSMARCO-XI dataset with all-MiniLM-L6-v2 embeddings, five switchable chunking strategies, multi-stage input/output guardrails, and P50–P100 latency analytics rendered in a glassmorphism UI with procedural audio-reactive waves.',
    technologies: ['Python', 'FastAPI', 'Sentence-Transformers', 'Vector Search', 'Web Audio API', 'Canvas 2D', 'Render'],
    team: 'Team “Lord of the Logics” — built collaboratively under hackathon time pressure',
    metrics: [
      { value: '5', label: 'switchable chunking strategies' },
      { value: '<200 ms', label: 'mock-transcriber test path' },
      { value: 'P50–P100', label: 'latency percentile analytics' },
    ],
    status: 'live-demo',
    statusLabel: 'Live demo',
    recognition: 'Built at Hacker House Goa 2026',
    repoUrl: 'https://github.com/tjmhmdaarif/Voice-RAG-Pipeline',
    liveUrl: 'https://voice-rag-pipeline-wtbn.onrender.com/',
    evidence: [
      { label: 'Repository', url: 'https://github.com/tjmhmdaarif/Voice-RAG-Pipeline' },
      { label: 'Live demo', url: 'https://voice-rag-pipeline-wtbn.onrender.com/' },
    ],
    verification: 'verified-repo',
    featured: true,
    priority: 2,
    category: 'software-ai',
    sigil: 'voice',
  },
  {
    id: 'agentops',
    name: 'AgentOps 2.0',
    tagline: 'Autonomous IoT fleet intelligence with a self-driving incident agent',
    problem:
      'Fleet telemetry floods operators with anomalies; real operations need an agent that investigates, decides, remediates — and proves recovery before closing an incident.',
    why: 'A study in agentic systems done properly: deterministic by default, LLM-optional, every step persisted and auditable.',
    solution:
      'A simulated 12-device fleet streams telemetry into a hybrid detector (robust z-score, fast/slow EWMA divergence, gated rate-of-change, per-device Isolation Forests fused into one explainable score). An autonomous agent runs an OBSERVE → INVESTIGATE → DECIDE → ACT → VERIFY → RESOLVE state machine with a risk-classed tool registry, recovery verification against learned baselines, and a live SSE-driven dark dashboard.',
    technologies: ['TypeScript', 'React', 'Node.js', 'SQLite', 'Isolation Forest', 'Server-Sent Events', 'Docker'],
    metrics: [
      { value: '12', label: 'simulated edge devices' },
      { value: '4-way', label: 'fused anomaly detection' },
      { value: '12', label: 'named failure scenarios' },
    ],
    status: 'live-demo',
    statusLabel: 'Live demo',
    repoUrl: 'https://github.com/tjmhmdaarif/agentops',
    liveUrl: 'https://agentops-o50e.onrender.com/',
    evidence: [
      { label: 'Repository', url: 'https://github.com/tjmhmdaarif/agentops' },
      { label: 'Live demo', url: 'https://agentops-o50e.onrender.com/' },
    ],
    verification: 'verified-repo',
    featured: true,
    priority: 3,
    category: 'software-ai',
    sigil: 'agent',
  },
  {
    id: 'neurovix',
    name: 'NeuroVix — Parkinson’s Voice Screening',
    tagline: 'Early, non-invasive Parkinson’s screening from voice biomarkers',
    problem:
      'Parkinson’s disease is often diagnosed only after irreversible neurological damage; costly scans limit early screening access.',
    why: 'Voice carries measurable motor signatures — a screening tool that needs only a microphone could widen early detection.',
    solution:
      'A prototype analysis platform extracting 15 voice biomarkers — jitter, shimmer, harmonicity (NHR/HNR) and nonlinear complexity measures (RPDE, DFA, PPE) — with noise reduction, bandpass filtering and voice-activity detection, classifying detection and four progression stages through a weighted voting mechanism in a Gradio interface. A research prototype, not a clinically validated device.',
    technologies: ['Python', 'Signal Processing', 'MATLAB', 'Gradio', 'Machine Learning'],
    metrics: [
      { value: '15', label: 'voice biomarkers analysed' },
      { value: '4', label: 'progression stages classified' },
      { value: 'Runner-Up', label: 'SRMIST electronics event' },
    ],
    status: 'prototype',
    statusLabel: 'Research prototype',
    recognition: 'SRMIST Runner-Up — Electronics event',
    repoUrl: 'https://github.com/tjmhmdaarif/Parkinson-s-Disease-Screening-System',
    evidence: [{ label: 'Repository', url: 'https://github.com/tjmhmdaarif/Parkinson-s-Disease-Screening-System' }],
    verification: 'verified-repo',
    featured: true,
    priority: 4,
    category: 'software-ai',
    sigil: 'mind',
  },
  {
    id: 'infraguard-2',
    name: 'InfraGuard 2.0',
    tagline: 'Interactive bridge digital twin with synthetic telemetry',
    problem:
      'Structural-health monitoring concepts are hard to explore without real sensors, brokers and bridges.',
    why: 'A browser-side digital twin makes telemetry, scenarios and 3D geometry explorable by anyone — with honest labelling that all data is simulated.',
    solution:
      'A Vite + TypeScript app rendering a procedural 3D truss bridge with orbit controls and sensor / vehicle / zone overlays, traffic-weather-anomaly scenarios driving synthetic vibration, strain, displacement, temperature and rainfall feeds, plus in-browser OBJ / GLB / glTF model import and comparison.',
    technologies: ['TypeScript', 'Three.js', 'Vite', 'Browser Simulation', 'Vercel'],
    metrics: [
      { value: '3D', label: 'procedural bridge twin' },
      { value: '6+', label: 'synthetic telemetry channels' },
    ],
    status: 'live-demo',
    statusLabel: 'Live demo · simulated data',
    repoUrl: 'https://github.com/tjmhmdaarif/InfraGuard-2.0',
    liveUrl: 'https://infraguard-twin.vercel.app/',
    evidence: [
      { label: 'Repository', url: 'https://github.com/tjmhmdaarif/InfraGuard-2.0' },
      { label: 'Live demo', url: 'https://infraguard-twin.vercel.app/' },
    ],
    verification: 'verified-repo',
    featured: true,
    priority: 5,
    category: 'software-ai',
    sigil: 'bridge',
  },
  {
    id: 'esp32-vehicle',
    name: 'Smart ESP-32 Vehicle',
    tagline: 'Real-time zone & speed alert system',
    problem: 'Coursework build: zone-aware speed alerts on a moving vehicle platform.',
    why: 'Embedded foundations — sensing, actuation and latency discipline on bare metal.',
    solution:
      'RC522 RFID over SPI with a 16x2 LCD over I²C, PWM motor control through an L298N driver, sub-150 ms response.',
    technologies: ['ESP32', 'Embedded C', 'RFID', 'PWM', 'I²C / SPI'],
    metrics: [{ value: '<150 ms', label: 'alert latency' }],
    status: 'coursework',
    statusLabel: 'ECE coursework',
    evidence: [],
    verification: 'verified-profile',
    featured: false,
    priority: 10,
    category: 'embedded',
    sigil: 'chip',
  },
  {
    id: 'infraguard-iot',
    name: 'InfraGuard — IoT Bridge Monitoring',
    tagline: 'Structural health monitoring over LoRa',
    problem: 'Coursework build: watch bridge strain and vibration without wired infrastructure.',
    why: 'The hardware ancestor of the InfraGuard digital twin.',
    solution: 'STM32 sensor node fusing strain and vibration readings, telemetered over long-range LoRa links.',
    technologies: ['STM32', 'LoRa', 'Sensor Fusion', 'Embedded C'],
    metrics: [],
    status: 'coursework',
    statusLabel: 'ECE coursework',
    evidence: [],
    verification: 'verified-profile',
    featured: false,
    priority: 11,
    category: 'embedded',
    sigil: 'bridge',
  },
  {
    id: 'lawnmower',
    name: 'Bluetooth-Controlled Lawnmower',
    tagline: 'IoT robotic lawnmower',
    problem: 'Coursework build: phone-controlled mowing with obstacle awareness.',
    why: 'Robotics fundamentals — control loops, drivers and RF links.',
    solution: 'HC-05 Bluetooth link, L298N motor driver and IR obstacle detection under smartphone PWM control.',
    technologies: ['Embedded C', 'Bluetooth HC-05', 'L298N', 'IR Sensing'],
    metrics: [],
    status: 'coursework',
    statusLabel: 'ECE coursework',
    evidence: [],
    verification: 'verified-profile',
    featured: false,
    priority: 12,
    category: 'embedded',
    sigil: 'chip',
  },
  {
    id: 'safety-wearable',
    name: 'ESP32 Women’s Safety Wearable',
    tagline: 'GPS-tagged emergency alerts',
    problem: 'Coursework build: a wearable that can call for help with location attached.',
    why: 'Engineering aimed at a problem that matters.',
    solution: 'ESP32 with GPS tracking, raising emergency alerts through a Telegram bot integration.',
    technologies: ['ESP32', 'GPS', 'Telegram Bot API'],
    metrics: [],
    status: 'coursework',
    statusLabel: 'ECE coursework',
    evidence: [],
    verification: 'verified-profile',
    featured: false,
    priority: 13,
    category: 'embedded',
    sigil: 'chip',
  },
  {
    id: 'python-dsa-120',
    name: 'Python DSA — 120-Day Roadmap',
    tagline: 'Public, consecutive-day problem-solving practice',
    problem:
      'Skill compounds in public: 120 consecutive days of Python data structures and algorithms, from scratch.',
    why: 'The discipline layer under everything else on this site.',
    solution:
      'A living repository of daily DSA work, mirrored by a LeetCode journey repo tracking solved problems. On LeetCode: 83 problems solved in Python 3 and 39 in Java, strongest in Math, Arrays, Strings and Hash Tables.',
    technologies: ['Python', 'Data Structures', 'Algorithms', 'LeetCode'],
    metrics: [
      { value: '120', label: 'consecutive-day roadmap' },
      { value: '122+', label: 'LeetCode solves (Python3 + Java)' },
    ],
    status: 'ongoing',
    statusLabel: 'Ongoing practice',
    repoUrl: 'https://github.com/tjmhmdaarif/Python-dsa-120',
    liveUrl: 'https://leetcode.com/u/mhmdaarif/',
    evidence: [
      { label: 'Repository', url: 'https://github.com/tjmhmdaarif/Python-dsa-120' },
      { label: 'LeetCode journey', url: 'https://github.com/tjmhmdaarif/muhammadh_aarif_leetcode-journey' },
    ],
    verification: 'verified-repo',
    featured: false,
    priority: 14,
    category: 'learning',
    sigil: 'mind',
  },
]

export const achievements = [
  {
    id: 'techgium',
    title: 'TECHgium 9th Edition — Finalist',
    result: 'Finalist',
    issuer: 'L&T Technology Services',
    date: 'May 2026',
    context:
      'National engineering innovation competition — reached the finalist stage with WindSense AI (Team TG0907494).',
    evidence: [{ label: 'WindSense AI repository', url: 'https://github.com/tjmhmdaarif/windsense-ai' }],
  },
  {
    id: 'ecotronics',
    title: 'Ecotronics Hackathon — Runner-Up',
    result: 'Runner-Up · ₹30,000 prize',
    issuer: 'SRM IST, Ramapuram',
    date: 'Feb 2026',
    context: 'Hackathon runner-up finish with a ₹30,000 prize, as listed on the public profile.',
    evidence: [],
  },
  {
    id: 'neurovix-srmist',
    title: 'NeuroVix — Runner-Up, Electronics Event',
    result: 'Runner-Up',
    issuer: 'SRMIST',
    date: '2026',
    context: 'Voice-based Parkinson’s screening prototype recognised at an SRMIST electronics event.',
    evidence: [
      { label: 'Project repository', url: 'https://github.com/tjmhmdaarif/Parkinson-s-Disease-Screening-System' },
    ],
  },
  {
    id: 'yi-yuva',
    title: 'Student Chair — Yi Yuva Innovation Vertical',
    result: 'Leadership',
    issuer: 'Yi Yuva',
    date: 'Jun 2025 – Jun 2026',
    context: 'Chaired the Innovation Vertical of the Yi Yuva student chapter for a full term.',
    evidence: [],
  },
  {
    id: 'skill-on-wheels',
    title: 'Institution Representative — Skill on Wheels v2.0',
    result: 'Representation',
    issuer: 'Skill on Wheels',
    date: 'Sep 2025',
    context: 'Represented Dr. N.G.P. Institute of Technology at the Skill on Wheels v2.0 program.',
    evidence: [],
  },
  {
    id: 'hitech-embedded',
    title: 'Embedded Systems Trainee',
    result: 'Training',
    issuer: 'Hi Tech Solutions, Nagercoil',
    date: 'Undated',
    context: 'Hands-on embedded systems training completed at Hi Tech Solutions.',
    evidence: [],
  },
] as const

export const certifications = [
  { id: 'qnx-rtos', title: 'RTOS — QNX Everywhere Program', issuer: 'Pi Square Technologies', url: '' },
  { id: 'prompt-engineering', title: 'Prompt Engineering', issuer: 'Great Learning', url: '' },
  { id: 'genai-google', title: 'Introduction to Generative AI', issuer: 'Google', url: '' },
  { id: 'signal-processing', title: 'Signal Processing — MATLAB', issuer: 'MathWorks training', url: '' },
  {
    id: 'azure-fundamentals',
    title: 'Azure Fundamentals: Describe Cloud Concepts — Trophy',
    issuer: 'Microsoft Learn',
    date: 'Jan 2025',
    url: 'https://learn.microsoft.com/en-us/users/muhammadaariftj-2909/',
  },
  {
    id: 'ms-search',
    title: 'Microsoft Search Fundamentals — Trophy',
    issuer: 'Microsoft Learn',
    date: 'Oct 2024',
    url: 'https://learn.microsoft.com/en-us/users/muhammadaariftj-2909/',
  },
  {
    id: 'ms-fabric',
    title: 'End-to-End Analytics with Microsoft Fabric',
    issuer: 'Microsoft Learn',
    date: 'Oct 2024',
    url: 'https://learn.microsoft.com/en-us/users/muhammadaariftj-2909/',
  },
] as const

export const events = [
  {
    id: 'ev-techgium',
    title: 'TECHgium 9th Edition',
    organizer: 'L&T Technology Services',
    date: 'May 2026',
    role: 'Finalist',
    description:
      'Presented WindSense AI — predictive alarm management for wind turbines — through to the finalist stage as Team TG0907494, owning AI/ML development and the technical presentation.',
  },
  {
    id: 'ev-hackerhouse',
    title: 'Hacker House Goa 2026',
    organizer: 'Hacker House',
    date: '2026',
    role: 'Participant',
    description:
      'Built and deployed the Voice-Enabled RAG Pipeline end-to-end with team “Lord of the Logics”, live on Render for the demo.',
  },
  {
    id: 'ev-ecotronics',
    title: 'Ecotronics Hackathon',
    organizer: 'SRM IST, Ramapuram',
    date: 'Feb 2026',
    role: 'Runner-Up',
    description: 'Runner-up finish with a ₹30,000 prize.',
  },
  {
    id: 'ev-yiyuva',
    title: 'Yi Yuva — Innovation Vertical',
    organizer: 'Yi Yuva, Coimbatore chapter',
    date: 'Jun 2025 – Jun 2026',
    role: 'Chair',
    description:
      'Student Chair of the Innovation Vertical — a year of organising and representing student innovation activity, including AI-for-students sessions.',
  },
  {
    id: 'ev-sow',
    title: 'Skill on Wheels v2.0',
    organizer: 'Skill on Wheels program',
    date: 'Sep 2025',
    role: 'Representative',
    description: 'Served as institution representative for Dr. N.G.P. Institute of Technology.',
  },
  {
    id: 'ev-hitech',
    title: 'Embedded Systems Training',
    organizer: 'Hi Tech Solutions, Nagercoil',
    date: 'Undated',
    role: 'Trainee',
    description:
      'Hands-on embedded systems training — the hardware foundation beneath later IoT and digital-twin work.',
  },
] as const

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    kanji: '言',
    skills: [
      { name: 'Python', usedIn: ['windsense-ai', 'voice-rag', 'neurovix', 'python-dsa-120'] },
      { name: 'Java', usedIn: [] },
      { name: 'C', usedIn: ['esp32-vehicle', 'lawnmower'] },
      { name: 'Embedded C / Arduino', usedIn: ['esp32-vehicle', 'safety-wearable', 'lawnmower'] },
      { name: 'TypeScript', usedIn: ['agentops', 'infraguard-2'] },
      { name: 'SQL / MySQL', usedIn: [] },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI · ML · Agentic',
    kanji: '知',
    skills: [
      { name: 'Scikit-learn', usedIn: ['windsense-ai', 'agentops'] },
      { name: 'Random Forest / Isolation Forest', usedIn: ['windsense-ai', 'agentops'] },
      { name: 'SMOTE', usedIn: ['windsense-ai'] },
      { name: 'RAG pipelines', usedIn: ['voice-rag'] },
      { name: 'Sentence-Transformers', usedIn: ['voice-rag'] },
      { name: 'Prompt engineering', usedIn: ['voice-rag'] },
      { name: 'Agentic systems', usedIn: ['agentops'] },
      { name: 'Signal processing', usedIn: ['neurovix'] },
    ],
  },
  {
    id: 'data',
    label: 'Data & Apps',
    kanji: '数',
    skills: [
      { name: 'Pandas', usedIn: ['windsense-ai'] },
      { name: 'Streamlit', usedIn: ['windsense-ai'] },
      { name: 'FastAPI', usedIn: ['voice-rag'] },
      { name: 'Gradio', usedIn: ['neurovix'] },
      { name: 'React', usedIn: ['agentops', 'infraguard-2'] },
      { name: 'Three.js', usedIn: ['infraguard-2'] },
      { name: 'Power BI', usedIn: [] },
      { name: 'MATLAB', usedIn: ['neurovix'] },
    ],
  },
  {
    id: 'embedded',
    label: 'Automation & Embedded',
    kanji: '器',
    skills: [
      { name: 'ESP32', usedIn: ['esp32-vehicle', 'safety-wearable'] },
      { name: 'STM32', usedIn: ['infraguard-iot'] },
      { name: 'LoRa', usedIn: ['infraguard-iot'] },
      { name: 'QNX / RTOS', usedIn: [] },
      { name: 'OPC UA', usedIn: ['windsense-ai'] },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Tools',
    kanji: '雲',
    skills: [
      { name: 'Azure (fundamentals)', usedIn: [] },
      { name: 'Render', usedIn: ['voice-rag', 'agentops'] },
      { name: 'Vercel', usedIn: ['infraguard-2'] },
      { name: 'Docker', usedIn: ['agentops'] },
      {
        name: 'Git / GitHub',
        usedIn: ['windsense-ai', 'voice-rag', 'agentops', 'infraguard-2', 'python-dsa-120'],
      },
      { name: 'Twilio', usedIn: ['windsense-ai'] },
      { name: 'Telegram Bot API', usedIn: ['safety-wearable'] },
    ],
  },
] as const

export const journey = [
  {
    id: 'j-2023',
    date: '2023',
    title: 'Engineering begins',
    description:
      'Enrolled in B.E. Electronics & Communication Engineering at Dr. N.G.P. Institute of Technology, Coimbatore.',
    kind: 'education',
  },
  {
    id: 'j-embedded',
    date: 'Early years',
    title: 'Hardware first',
    description:
      'Embedded systems training at Hi Tech Solutions, Nagercoil — followed by coursework builds: an ESP32 smart vehicle, a LoRa bridge monitor, a robotic lawnmower and a safety wearable.',
    kind: 'education',
  },
  {
    id: 'j-mslearn',
    date: 'Oct 2024 – Jan 2025',
    title: 'Cloud & AI foundations',
    description:
      'Microsoft Learn trophies across Azure fundamentals, Microsoft Search and Fabric analytics; Google’s Introduction to Generative AI; prompt engineering with Great Learning.',
    kind: 'certification',
  },
  {
    id: 'j-yiyuva',
    date: 'Jun 2025',
    title: 'Leading the Innovation Vertical',
    description:
      'Became Student Chair of the Yi Yuva Innovation Vertical — organising and representing student innovation for a full year.',
    kind: 'leadership',
  },
  {
    id: 'j-sow',
    date: 'Sep 2025',
    title: 'Representing the institution',
    description: 'Institution representative at Skill on Wheels v2.0.',
    kind: 'leadership',
  },
  {
    id: 'j-ecotronics',
    date: 'Feb 2026',
    title: 'First hackathon podium',
    description: 'Runner-up at the Ecotronics Hackathon, SRM IST Ramapuram — with a ₹30,000 prize.',
    kind: 'achievement',
  },
  {
    id: 'j-goa',
    date: '2026',
    title: 'Hacker House Goa',
    description:
      'Voice-Enabled RAG Pipeline — built with team “Lord of the Logics”, shipped live on Render under hackathon pressure.',
    kind: 'project',
  },
  {
    id: 'j-techgium',
    date: 'May 2026',
    title: 'TECHgium national finalist',
    description:
      'WindSense AI — AI/ML lead and technical presenter of Team TG0907494 — reached the finalist stage of L&T Technology Services’ TECHgium 9th Edition.',
    kind: 'achievement',
  },
  {
    id: 'j-agentic',
    date: 'Oct 2026',
    title: 'The agentic turn',
    description:
      'AgentOps 2.0 — a self-driving incident agent over a simulated IoT fleet — and InfraGuard 2.0, an honest, fully simulated bridge digital twin.',
    kind: 'project',
  },
  {
    id: 'j-now',
    date: 'Now',
    title: 'Deepening the craft',
    description:
      '120 consecutive days of Python DSA in public, sharpening real-time systems thinking, and applying for software and hybrid software-automation roles.',
    kind: 'now',
  },
] as const

export const interests = [
  {
    id: 'trail',
    title: 'Trail Riding',
    kanji: '駆',
    description:
      'Off-road miles and ridge lines — the same appetite for terrain that shows up in long debugging sessions.',
  },
  {
    id: 'video',
    title: 'Videography',
    kanji: '影',
    description: 'Framing, light and cut — storytelling through a lens, not just through code.',
  },
  {
    id: 'craft',
    title: 'Craft Work',
    kanji: '作',
    description: 'Making physical things by hand — patience measured in materials, not sprints.',
  },
  {
    id: 'speaking',
    title: 'Public Speaking',
    kanji: '声',
    description: 'On stage and on the mic — from TECHgium presentations to student-chapter sessions.',
  },
] as const

export const contacts = [
  { id: 'email', label: 'Email', url: 'mailto:muhammadhaarif2000@gmail.com', handle: 'muhammadhaarif2000@gmail.com', kind: 'email' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/tjmhmdaarif', handle: '@tjmhmdaarif', kind: 'github' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/tjmhmdaarif', handle: '/in/tjmhmdaarif', kind: 'linkedin' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/muhammadh.aarif/', handle: '@muhammadh.aarif', kind: 'instagram' },
  { id: 'leetcode', label: 'LeetCode', url: 'https://leetcode.com/u/mhmdaarif/', handle: '@mhmdaarif', kind: 'leetcode' },
] as const

export const leetcodeStats = {
  python3: 83,
  java: 39,
  python: 4,
  strongest: [
    { tag: 'Math', count: 44 },
    { tag: 'Array', count: 40 },
    { tag: 'String', count: 28 },
    { tag: 'Hash Table', count: 26 },
    { tag: 'Two Pointers', count: 21 },
    { tag: 'Tree', count: 18 },
    { tag: 'Dynamic Programming', count: 14 },
  ],
  badge: 'Oct LeetCoding Challenge',
} as const

export const verificationNote =
  'Content verified against the public GitHub profile and repository READMEs (github.com/tjmhmdaarif) and the public LeetCode profile (leetcode.com/u/mhmdaarif). LinkedIn was not directly accessible; only public search-indexed snippets were used. Competition metrics such as accuracy and ROI are the project team’s reported figures.'

export const sections = [
  { id: 'gate', num: '壱', label: 'The Gate', jp: '鳥居' },
  { id: 'forge', num: '弐', label: 'The Forge', jp: '鍛冶' },
  { id: 'projects', num: '参', label: 'Creations', jp: '作品' },
  { id: 'hall', num: '肆', label: 'Hall of Honour', jp: '殿堂' },
  { id: 'skills', num: '伍', label: 'Constellation', jp: '技能' },
  { id: 'journey', num: '陸', label: 'The Path', jp: '道程' },
  { id: 'lantern', num: '漆', label: 'The Lantern', jp: '灯籠' },
] as const
