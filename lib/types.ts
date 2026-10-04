export interface Link {
  label: string;
  url: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface SiteConfig {
  url: string;
  title: string;
  description: string;
  locale: string;
  lastUpdated: string;
}

export interface Personal {
  name: string;
  initials: string;
  title: string;
  location: string;
  email: string;
  profileImage: string;
  profileImageAlt: string;
}

export interface Hero {
  eyebrow: string;
  description: string;
  goal: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
}

export interface AcademicStat {
  label: string;
  value: string;
  detail: string;
  href?: string;
}

export interface About {
  summary: string[];
  researchDirection: string;
  academicInterests: string[];
  goals: string[];
  academicStrengths: string[];
}

export interface Education {
  degree: string;
  programme: string;
  institution: string;
  location: string;
  period: string;
  graduation: string;
  graduationYear: string;
  cgpa: string;
  creditHours: number;
  status: string;
  mediumOfInstruction: string;
  coursework: string[];
  highlights: string[];
}

export interface KeyFigure {
  label: string;
  value: string;
  detail: string;
}

export interface Hypothesis {
  id: string;
  text: string;
  outcome: string;
}

export interface Methodology {
  approach: string;
  design: string;
  sampling: string;
  participants: string;
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  dataCollection: string;
  ethics: string[];
}

export interface Instrument {
  name: string;
  abbreviation: string;
  citation: string;
  items: number;
  measures: string;
  sampleAlpha: string;
}

export interface Variable {
  name: string;
  role: string;
  measure: string;
}

export interface DescriptiveResult {
  measure: string;
  n: number;
  min: number;
  max: number;
  mean: string;
  sd: string;
}

export interface ReliabilityResult {
  scale: string;
  items: number;
  alpha: string;
}

export interface CorrelationResult {
  variables: string;
  r: string;
  p: string;
  n: number;
}

export interface GroupComparison {
  measure: string;
  t: string;
  p: string;
  significant: boolean;
}

export interface ResearchResults {
  descriptives: DescriptiveResult[];
  reliability: ReliabilityResult[];
  correlation: CorrelationResult;
  groupComparisons: GroupComparison[];
}

export interface WorkflowStep {
  step: string;
  detail: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export interface ResearchDocument {
  label: string;
  url: string;
  type: string;
  note: string;
}

export interface ResearchProject {
  slug: string;
  featured: boolean;
  title: string;
  shortTitle: string;
  type: string;
  status: string;
  year: string;
  course: string;
  institution: string;
  supervisor: string;
  teamContext: string;
  metaDescription: string;
  summary: string;
  keyFigures: KeyFigure[];
  objectives: string[];
  researchQuestion: string;
  hypotheses: Hypothesis[];
  background: string[];
  methodology: Methodology;
  instruments: Instrument[];
  variables: Variable[];
  analysis: { software: string; procedures: string[] };
  results: ResearchResults;
  findings: string[];
  conclusion: string;
  limitations: string[];
  implications: string[];
  reflection: string;
  role: string[];
  skills: string[];
  workflow: WorkflowStep[];
  timeline: TimelineEntry[];
  documents: ResearchDocument[];
  reportNote: string;
  keywords: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  context: string;
  year: string;
  description: string;
  skills: string[];
  outcome: string;
  link: Link | null;
  confidentialityNote: string;
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  supervision: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  learningOutcomes: string[];
  scopeNote: string;
  evidence: Link[];
}

export interface ResearchInterest {
  id: string;
  topic: string;
  description: string;
  relatedWork: Link[];
  evidence: string[];
}

export interface Certificate {
  id: string;
  title: string;
  provider: string;
  date: string;
  topic: string;
  category: string;
  credentialId: string;
  verification: string;
  verificationUrl: string;
  image: string;
  file: string;
}

export interface LearningActivity {
  title: string;
  provider: string;
  date: string;
  topic: string;
  evidence: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface CvInfo {
  pdfUrl: string;
  fileName: string;
  lastUpdated: string;
  references: string;
}

export interface ContactInfo {
  intro: string;
  email: string;
  availability: string;
  responseNote: string;
}

export interface SocialLinks {
  linkedin: string;
  googleScholar: string;
  orcid: string;
}

export interface PortfolioData {
  site: SiteConfig;
  personal: Personal;
  hero: Hero;
  academicSnapshot: AcademicStat[];
  about: About;
  education: Education[];
  research: ResearchProject[];
  projects: Project[];
  experience: Experience[];
  researchInterests: ResearchInterest[];
  certificates: Certificate[];
  otherLearning: LearningActivity[];
  awards: Award[];
  skills: SkillGroup[];
  cv: CvInfo;
  contact: ContactInfo;
  socialLinks: SocialLinks;
}
