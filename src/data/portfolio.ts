/**
 * Portfolio Data File — Mahima Kanoujiya
 * Centralized, type-safe data source for all sections.
 * All project details, links, descriptions, and placeholders are kept strictly verified.
 */

export interface ProjectItem {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  fullDetails?: string;
  featured?: boolean;
  githubUrl?: string | null;
  liveUrl?: string | null;
  technologies: string[];
  category: string;
  statusBadge?: string;
  isPlaceholderDescription?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string; // Optional categorical tag like 'Core', 'Exploring', 'Practiced' (no fake % numbers)
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  websiteUrl: string;
  period: string;
  description: string;
  contribution: string;
  isPlaceholderContribution: boolean;
  tags: string[];
}

export interface LeadershipItem {
  role: string;
  organization: string;
  institution: string;
}

export interface OngoingProgramItem {
  id: string;
  title: string;
  organization: string;
  status: string;
}

export interface CertificateItem {
  id: string;
  issuer: string;
  title: string;
  prominent?: boolean;
}

export interface CurrentlyBuildingItem {
  name: string;
  githubUrl: string;
  status: string;
  description: string;
  isPlaceholderDescription: boolean;
  tags: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Mahima Kanoujiya',
    logo: 'MK',
    websiteTitle: 'Mahima Kanoujiya | Digital Portfolio',
    heroGreeting: "Hi, I'm Mahima Kanoujiya.",
    tagline: 'Exploring Intelligence. Building Possibilities.',
    professionalIdentity: 'AI & ML Student | Developer | Creative Thinker | Hackathon builder',
    subtitle: 'AI & ML Student | Developer | Creative Thinker',
    shortIntro:
      'I am a Computer Science student specializing in Artificial Intelligence and Machine Learning. I enjoy exploring emerging technologies, building creative digital products, and turning ideas into practical experiences. I am continuously learning, experimenting, and building my journey in technology.',
    personalStatement:
      'I believe meaningful technology begins with curiosity and grows through experimentation.',
    education: {
      degree: 'B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)',
      institution:
        'Centre for Advanced Studies, Dr. A.P.J. Abdul Kalam Technical University, Lucknow.',
      status: 'Undergraduate Student',
    },
    resumePath: '/Mahima_Kanoujiya_Resume.pdf',
    contact: {
      email: 'mahikanoujiya69@gmail.com',
      github: 'https://github.com/mahimakanoujiya',
      linkedin: 'https://www.linkedin.com/in/mahima-kanoujiya-041a87411',
      instagram: 'https://www.instagram.com/gloryy_13_?exln=MXI4Y2Nxamd2MXdxeA==',
    },
  },

  // EXACT 5 PROJECTS IN EXACT SPECIFIED ORDER
  projects: [
    {
      id: 'flipread',
      name: 'FlipRead',
      subtitle: 'Interactive PDF Reading Experience',
      description:
        'An interactive PDF reading project designed to create a more engaging digital reading experience.',
      fullDetails:
        'FlipRead transforms standard PDF document interactions into an intuitive, responsive reading experience with realistic document transitions, enhanced typography contrast, and fluid navigation mechanics built for modern web viewports.',
      featured: true,
      githubUrl: 'https://github.com/mahimakanoujiya/FlipRead-PDF',
      liveUrl: 'https://flip-read.vercel.app',
      technologies: ['React', 'PDF Viewer UI', 'Responsive Design', 'Vercel'],
      category: 'Web Experience / Reader',
      statusBadge: 'Featured Project',
      isPlaceholderDescription: false,
    },
    {
      id: 'sketchbloom',
      name: 'SketchBloom',
      subtitle: 'Creative Digital Canvas & Tutorial App',
      description:
        'An interactive AI-assisted learning concept for guided drawing tutorials, sketching practice, and artwork management.',
      fullDetails:
        'SketchBloom is a creative digital canvas and drawing tutorial application experimenting with interactive sketching guides, fluid stylus/touch interactions, and guided creative workflows.',
      featured: false,
      githubUrl: 'https://github.com/mahimakanoujiya/Sketchbloom',
      liveUrl: 'https://sketchbloom-itap.vercel.app',
      technologies: ['Creative Canvas', 'Interactive Web', 'Visual Sketching', 'Vercel'],
      category: 'Creative Tech',
      isPlaceholderDescription: false,
    },
    {
      id: 'curera-ai',
      name: 'CURERA AI', // EXACT name: CURERA AI only. Not Neural Nexus.
      subtitle: 'Intelligent Healthcare Routing Concept',
      description:
        'A voice and text-first healthcare communication concept that organizes patient inquiries into structured case summaries for professional review.',
      fullDetails:
        'CURERA AI explores structured clinical communication and inquiry routing with human-in-the-loop oversight. Repository: CURERA_AI_Neural_Nexus. (Visible project name is CURERA AI only).',
      featured: false,
      githubUrl: 'https://github.com/mahimakanoujiya/CURERA_AI_Neural_Nexus',
      liveUrl: null, // No live website supplied
      technologies: ['Healthcare Concepts', 'AI Exploration', 'Architecture Prototype'],
      category: 'AI & Health Tech',
      isPlaceholderDescription: false,
    },
    {
      id: 'mindvault',
      name: 'MindVault',
      subtitle: 'Personal AI-Powered Journaling',
      description:
        'A personal AI-powered journaling project designed to support private journal entries and AI-assisted reflection.',
      fullDetails:
        'MindVault combines secure private journaling with AI-assisted self-reflection, sentiment analysis, and intelligent summarization using Gemini. Configured with user authentication and real-time cloud document persistence.',
      featured: false,
      githubUrl: 'https://github.com/mahimakanoujiya/mindvault-personal-gemini-journal',
      liveUrl: 'https://mindvault-journal-7k4p9x.ai.studio',
      technologies: ['Gemini', 'Firebase Authentication', 'Cloud Firestore'],
      category: 'AI & Cloud Application',
      isPlaceholderDescription: false,
    },
    {
      id: 'flora-pulse',
      name: 'Flora Pulse',
      subtitle: 'Botanical Vitality Concept',
      description:
        'A smart botanical monitoring and plant vitality exploration concept with interactive environmental visualization.',
      fullDetails:
        'Flora Pulse investigates digital plant wellness tracking concepts, environmental parameter visualization, and smart botanical care assistance.',
      featured: false,
      githubUrl: null, // No repo supplied
      liveUrl: 'https://mahimakanoujiya.github.io/Flora-pulse/',
      technologies: ['Botanical Monitoring Concept', 'Smart Vitality', 'GitHub Pages'],
      category: 'IoT & Smart Systems',
      isPlaceholderDescription: false,
    },
  ] as ProjectItem[],

  // SKILLS CATEGORIES (No fake percentages or progress bars)
  skillCategories: [
    {
      title: 'Programming Languages',
      description: 'Foundational syntax and algorithmic problem-solving',
      skills: [
        { name: 'Python', highlight: true },
        { name: 'C / C++', highlight: false },
        { name: 'Java', highlight: false },
        { name: 'JavaScript', highlight: true },
        { name: 'TypeScript', highlight: true },
        { name: 'SQL', highlight: false },
      ],
    },
    {
      title: 'AI & Machine Learning',
      description: 'Core concepts, experimentation, and model integration',
      skills: [
        { name: 'Machine Learning Fundamentals', highlight: true },
        { name: 'Deep Learning Concepts', highlight: true },
        { name: 'LLM Integration & Prompting', highlight: true },
        { name: 'Data Preprocessing', highlight: false },
        { name: 'Model Evaluation & Testing', highlight: false },
        { name: 'Gemini API', highlight: true },
      ],
    },
    {
      title: 'Web Development',
      description: 'Modern component-driven frontends and responsive interfaces',
      skills: [
        { name: 'React.js', highlight: true },
        { name: 'Modern HTML5 & CSS3', highlight: false },
        { name: 'Tailwind CSS', highlight: true },
        { name: 'RESTful API Integration', highlight: false },
        { name: 'Node.js Basics', highlight: false },
      ],
    },
    {
      title: 'Tools & Platforms',
      description: 'Version control, cloud environments, and deployment pipelines',
      skills: [
        { name: 'Git & GitHub', highlight: true },
        { name: 'Google Cloud Platform', highlight: false },
        { name: 'Firebase & Firestore', highlight: true },
        { name: 'Linux / Bash Basics', highlight: false },
        { name: 'VS Code', highlight: false },
        { name: 'Vercel', highlight: false },
      ],
    },
    {
      title: 'Creative & Productivity Tools',
      description: 'Design thinking, wireframing, and structured collaboration',
      skills: [
        { name: 'UI/UX Wireframing', highlight: true },
        { name: 'Figma Basics', highlight: false },
        { name: 'Technical Documentation', highlight: false },
        { name: 'Problem Solving & Logic', highlight: true },
      ],
    },
  ] as SkillCategory[],

  // EXPERIENCE — GREENBASKET
  experience: {
    company: 'GreenBasket',
    role: 'E-Commerce Platform Contributor',
    websiteUrl: 'https://greenbasketshop.in',
    period: 'Practical Exposure & Collaboration',
    description: 'A plant-focused e-commerce platform offering gardening-related products.',
    contribution:
      '[Contribution placeholder: Practical exposure to e-commerce product structuring, user flow optimization, and catalog presentation for a gardening retail platform. Editable for Mahima to specify exact role & tasks.]',
    isPlaceholderContribution: true,
    tags: ['E-Commerce', 'Product Catalog', 'Digital Retail Experience', 'User Flow'],
  } as ExperienceItem,

  // LEADERSHIP — AWS STUDENT BUILDER GROUP
  leadership: {
    role: 'AWS Student Builder Group Leader',
    organization: 'AWS Student Builder Group',
    institution:
      'Centre for Advanced Studies, Dr. A.P.J. Abdul Kalam Technical University, Lucknow',
  } as LeadershipItem,

  // ONGOING PROGRAMS — STUDENT INITIATIVES
  ongoingPrograms: [
    {
      id: 'microsoft-learn-ambassador',
      title: 'Microsoft Learn Student Ambassador',
      organization: 'Microsoft Learn',
      status: 'Ongoing',
    },
    {
      id: 'unstop-campus-champion',
      title: 'Unstop Campus Champion',
      organization: 'Unstop',
      status: 'Ongoing',
    },
  ] as OngoingProgramItem[],

  // CERTIFICATIONS & LEARNING — EXACT 10 CERTIFICATES IN EXACT ORDER
  certifications: [
    {
      id: 'hcl-ui-ux',
      issuer: 'HCL',
      title: 'Certified UI/UX and VI Designer',
      prominent: true,
    },
    {
      id: 'great-learning-net-sec',
      issuer: 'Great Learning',
      title: 'Network Security Course',
      prominent: true,
    },
    {
      id: 'tcs-ion-ai-foundation',
      issuer: 'TCS iON',
      title: 'AI Foundation Certification',
      prominent: true,
    },
    {
      id: 'skill-india-net-sec',
      issuer: 'Skill India',
      title: 'Network Security Engineer Certification',
      prominent: false,
    },
    {
      id: 'be10x-ai-workshop',
      issuer: 'be10x',
      title: 'AI Workshop Certification',
      prominent: false,
    },
    {
      id: 'great-learning-fin-acct',
      issuer: 'Great Learning',
      title: 'Financial Accounting Course',
      prominent: false,
    },
    {
      id: 'sololearn-prompt-eng',
      issuer: 'SoloLearn',
      title: 'Prompt Engineering',
      prominent: false,
    },
    {
      id: 'sololearn-robotics-ai',
      issuer: 'SoloLearn',
      title: 'Robotics & AI',
      prominent: false,
    },
    {
      id: 'sololearn-seo-ai',
      issuer: 'SoloLearn',
      title: 'SEO with AI',
      prominent: false,
    },
    {
      id: 'sololearn-chatgpt-marketing',
      issuer: 'SoloLearn',
      title: 'ChatGPT for Marketing',
      prominent: false,
    },
  ] as CertificateItem[],

  // CURRENTLY BUILDING — SPEAKSPHERE
  currentlyBuilding: {
    name: 'SpeakSphere',
    githubUrl: 'https://github.com/mahimakanoujiya/SpeakSphere',
    status: 'In Development',
    description:
      'A voice, speech, or conversational audio intelligence concept exploring real-time vocal interactions and speech processing. Currently under active design and prototyping. (In Development - Description placeholder).',
    isPlaceholderDescription: true,
    tags: ['Voice AI Concept', 'Audio Processing', 'Speech Interaction', 'Prototyping'],
  } as CurrentlyBuildingItem,
};
