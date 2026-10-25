import { EducationInfo, ProjectInfo, SkillItem, SocialLinks, VerifiedCertificate } from '../types';
import footballTrophyBanner from '../assets/images/football_trophy_banner_1792410546224.jpg';
import footballMatchAction from '../assets/images/football_match_action_1792410527030.jpg';

export const PERSONAL_INFO = {
  name: 'IBRAHIM.S',
  pdfName: 'IBRAHIM IRAHIM',
  role: 'BCA STUDENT / ASPIRING SOFTWARE DEVELOPER',
  college: 'Mohamed Sathak College of Arts and Science',
  graduationYear: '2027',
  currentYear: '3rd Year',
  focus: ['Web', 'Data', 'Design'],
  portraitAsset: '/ibrahim-portrait.png',
  tagline: 'Building with code. Learning by building.',
  shortBio:
    'Third-year Bachelor of Computer Applications (BCA) student at Mohamed Sathak College of Arts and Science (expected graduation 2027). Focused on software development, building responsive web applications, REST APIs, and data-driven platforms like Football Zone.',
  aboutFull:
    'I am a curious builder who enjoys the gap between an idea and a working demo. Most of what I know comes from making things break and fixing them — assignments, mini-projects, and late-night refactors.',
  skillsPhilosophy:
    'Comfortable across front-end fundamentals (HTML, CSS, JavaScript) and now developing full stacks — REST APIs with Node.js and Express, backed by Supabase — shaped through real course projects.',
};

export const SOCIAL_LINKS: SocialLinks = {
  github: 'https://github.com/ibrahimirahim1005-wq',
  linkedin: 'https://www.linkedin.com/in/ibrahim-i-rahim-975a73413/',
  email: 'ibrahimirahim1005@gmail.com',
};

export const EDUCATION: EducationInfo = {
  degree: 'Bachelor of Computer Applications (BCA)',
  institution: 'Mohamed Sathak College of Arts and Science',
  timeline: '2024–2027',
  expectedGraduation: '2027',
  status: '3rd Year (Final Year Candidate)',
  coreSubjects: [
    'Programming',
    'DBMS (Database Management Systems)',
    'Web Technologies',
    'Computer Networking',
  ],
  description:
    'Pursuing comprehensive computer application foundations with strong emphasis on programming paradigms, relational database architecture, modern web standards, and network protocols.',
};

export const SKILLS: SkillItem[] = [
  { name: 'HTML', category: 'frontend', level: 85, tag: 'Semantic Markup' },
  { name: 'CSS', category: 'frontend', level: 85, tag: 'Responsive Layouts & Flex/Grid' },
  { name: 'JavaScript', category: 'frontend', level: 75, tag: 'ES6+ & DOM APIs' },
  { name: 'Node.js', category: 'backend', level: 65, tag: 'JavaScript Runtime' },
  { name: 'Express.js', category: 'backend', level: 65, tag: 'RESTful Routing Framework' },
  { name: 'REST API', category: 'backend', tag: 'Architecture & Endpoints' },
  { name: 'Supabase', category: 'database', level: 50, tag: 'PostgreSQL & Cloud BaaS' },
  { name: 'UI/UX Design', category: 'design', tag: 'Wireframing & Visual Design' },
];

export const FEATURED_PROJECT: ProjectInfo = {
  id: 'football-zone',
  title: 'Football Zone',
  year: '2026',
  tagline: "Ballon d'Or 2026 predictions & football analytics platform",
  description:
    "A football analytics platform covering Ballon d'Or 2026 predictions, nominee rankings, player comparisons, performance indexes and community voting. Built mobile-first with a clean dark interface.",
  highlights: [
    "Ballon d'Or 2026 nominee rankings & algorithmic prediction system",
    'Interactive head-to-head player stat comparisons & performance indexes',
    'Real-time community voting with live result aggregates',
    'Mobile-first responsive architecture with sleek dark cyberpunk aesthetics',
    'REST API backend powered by Express and backed by Supabase',
  ],
  tags: ['HTML', 'CSS', 'JavaScript', 'REST API', 'Supabase'],
  liveUrl: 'https://football-zone-1.onrender.com',
  image: footballTrophyBanner,
  galleryImages: [
    footballTrophyBanner,
    footballMatchAction,
  ],
  stats: [
    { label: 'Edition', value: 'Ballon d’Or 2026' },
    { label: 'Architecture', value: 'Mobile-First Dark' },
    { label: 'Data Store', value: 'Supabase' },
    { label: 'API Layer', value: 'RESTful Node/Express' },
  ],
};

export const COURSEWORK_EXPERIENCE = [
  {
    period: '2024 – Present',
    role: 'BCA Undergraduate & Developer',
    institution: 'Mohamed Sathak College of Arts and Science',
    type: 'Academic & Practical Degree',
    details: [
      'Implemented relational schema design, SQL querying, and normalization exercises in DBMS coursework.',
      'Developed dynamic web applications utilizing vanilla JavaScript, asynchronous DOM manipulation, and responsive CSS.',
      'Built custom REST APIs with Node.js and Express to interface with Supabase cloud database tables.',
      'Explored computer networking topologies, IP routing fundamentals, and client-server socket communication.',
    ],
  },
  {
    period: '2026',
    role: 'Full-Stack Project Lead & Creator',
    institution: 'Football Zone Platform',
    type: 'Featured Practical Project',
    details: [
      'Architected end-to-end analytics platform from scratch without external commercial templates.',
      'Integrated live community voting persistence using Supabase backend-as-a-service.',
      'Engineered mobile-friendly dark theme visual hierarchy tailored for sports data enthusiasts.',
    ],
  },
];

export const VERIFIED_CERTIFICATES: VerifiedCertificate[] = [
  {
    id: 'alfido-tech-fullstack',
    title: '1 Month Internship in Full Stack Development',
    issuer: 'Alfido Tech – Registered Training Organization',
    recipient: 'IBRAHIM S',
    issueDate: 'June 25, 2026',
    duration: '25th May 2026 to 25th June 2026',
    candidateId: 'BS/REG/123779',
    credentialType: 'Internship',
    accreditation: ['AICTE Approved', 'ISO 9001:2015 Certified', 'MSME Registered'],
    description:
      'Awarded in recognition of efforts and achievements in successfully completing an intensive 1 Month internship in Full Stack Development. Demonstrates hands-on proficiency in building modern web applications, architecting responsive frontend interfaces, integrating backend logic, and developing RESTful services.',
    previewImage: '/certificates/alfido_certificate_preview.png',
    originalDocumentUrl: '/certificates/BSREG123779_8cab6351.pdf',
    documentType: 'pdf',
    skills: ['Full Stack Development', 'Frontend & Backend', 'REST APIs', 'Web Architecture', 'Database Connectivity'],
  },
  {
    id: 'infosys-spring-rest',
    title: 'Spring REST Course Completion Certificate',
    issuer: 'Infosys Springboard • Infosys Limited',
    recipient: 'IBRAHIM S',
    issueDate: 'October 1, 2026',
    duration: 'Professional Coursework Milestone',
    candidateId: 'Wingspan Verification',
    credentialType: 'Industry Certification',
    accreditation: ['Infosys Limited', 'Infosys Springboard'],
    description:
      'Successfully completed the comprehensive Spring REST engineering course on Infosys Springboard. Validates in-depth understanding of enterprise RESTful architecture, HTTP methods, Spring Boot request mapping, REST controllers, and production-grade API development.',
    verificationUrl: 'https://verify.onwingspan.com',
    previewImage: '/certificates/infosys_certificate_preview.png',
    originalDocumentUrl: '/certificates/infosys_certificate_preview.png',
    documentType: 'image',
    skills: ['Spring REST', 'RESTful API Engineering', 'HTTP Protocols', 'Java / Spring Boot', 'API Security & Design'],
  },
];
