export interface Module {
  moduleId: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  tag: string;
  sortOrder: number;
}

export interface LearnItem {
  moduleId: string;
  type: "principle" | "key" | "warn";
  text: string;
  sortOrder: number;
}

export interface ComparisonTable {
  moduleId: string;
  tableTitle: string;
  tableKey: string;
  headers: string[];
  rows: string[][];
  sortOrder: number;
}

export interface Prompt {
  moduleId: string;
  phraseText: string;
  sortOrder: number;
}

export interface Takeaway {
  moduleId: string;
  text: string;
  sortOrder: number;
}

export interface SelfAssessmentStatement {
  moduleId: string;
  statement: string;
  sortOrder: number;
}

export interface PracticeScenario {
  moduleId: string;
  title: string;
  scenarioText: string;
  quote: string;
  typeLabel: string;
  signs: string;
  options: ScenarioOption[];
  correctAnswer: number;
  explanation: string;
  sortOrder: number;
}

export interface ScenarioOption {
  text: string;
  correct: boolean;
  feedback: string;
}

export interface DiscoveryStep {
  stepNumber: number;
  title: string;
  icon: string;
  what: string;
  why: string;
  jeanStory: string;
  tip: string;
}

export interface Circle {
  circleId: number;
  name: string;
  shortName: string;
  color: string;
  tagline: string;
}

export interface SwemwbsQuestion {
  questionNumber: number;
  statement: string;
}

export interface RoleSection {
  sectionId: string;
  title: string;
  icon: string;
  subtitle: string;
  introText: string;
  keyLine: string;
  content: Record<string, unknown>;
  sortOrder: number;
}

export interface JourneyStage {
  stageId: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  moduleIds: string[];
  sortOrder: number;
}

export interface FeedbackConfig {
  section: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
}

export interface TrainingSession {
  sessionCode: string;
  date: string;
  location: string;
  facilitator: string;
  status: string;
}

export interface ModuleData {
  module: Module;
  learnContent: LearnItem[];
  tables: ComparisonTable[];
  prompts: Prompt[];
  takeaways: Takeaway[];
  selfAssessment: SelfAssessmentStatement[];
  scenarios: PracticeScenario[];
  discoverySteps: DiscoveryStep[];
  circles: Circle[];
  swemwbsQuestions: SwemwbsQuestion[];
}
