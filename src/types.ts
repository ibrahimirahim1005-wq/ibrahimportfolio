export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'design';
  level?: number; // Self-assessed %
  tag: string;
}

export interface ProjectInfo {
  id: string;
  title: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  liveUrl: string;
  stats?: { label: string; value: string }[];
  image?: string;
  galleryImages?: string[];
}

export interface EducationInfo {
  degree: string;
  institution: string;
  timeline: string;
  expectedGraduation: string;
  status: string;
  coreSubjects: string[];
  description: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface VerifiedCertificate {
  id: string;
  title: string;
  issuer: string;
  recipient: string;
  issueDate: string;
  duration?: string;
  candidateId?: string;
  credentialType: 'Internship' | 'Coursework' | 'Industry Certification';
  accreditation?: string[];
  description: string;
  verificationUrl?: string;
  previewImage: string;
  originalDocumentUrl: string;
  documentType: 'pdf' | 'image';
  skills: string[];
}
