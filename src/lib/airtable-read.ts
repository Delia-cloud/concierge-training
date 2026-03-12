import { fetchTable } from "./airtable";
import { TABLE_NAMES } from "./constants";
import type {
  Module, LearnItem, ComparisonTable, Prompt, Takeaway,
  SelfAssessmentStatement, PracticeScenario, DiscoveryStep,
  Circle, SwemwbsQuestion, RoleSection, JourneyStage, FeedbackConfig,
} from "./types";

// Helper to safely parse JSON fields
function parseJSON<T>(val: unknown, fallback: T): T {
  if (!val || typeof val !== "string") return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
}

export async function getModules(): Promise<Module[]> {
  const rows = await fetchTable(TABLE_NAMES.modules, {
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    moduleId: r["Module ID"] as string,
    title: r["Title"] as string,
    icon: r["Icon"] as string,
    color: r["Color"] as string,
    description: r["Description"] as string,
    tag: r["Tag"] as string,
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getLearnContent(moduleId?: string): Promise<LearnItem[]> {
  const rows = await fetchTable(TABLE_NAMES.learnContent, {
    ...(moduleId && { filterByFormula: `{Module ID}="${moduleId}"` }),
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    moduleId: r["Module ID"] as string,
    type: r["Type"] as "principle" | "key" | "warn",
    text: r["Text"] as string,
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getComparisonTables(moduleId?: string): Promise<ComparisonTable[]> {
  const rows = await fetchTable(TABLE_NAMES.comparisonTables, {
    ...(moduleId && { filterByFormula: `{Module ID}="${moduleId}"` }),
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    moduleId: r["Module ID"] as string,
    tableTitle: r["Table Title"] as string,
    tableKey: r["Table Key"] as string,
    headers: parseJSON<string[]>(r["Headers"], []),
    rows: parseJSON<string[][]>(r["Rows"], []),
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getPrompts(moduleId?: string): Promise<Prompt[]> {
  const rows = await fetchTable(TABLE_NAMES.prompts, {
    ...(moduleId && { filterByFormula: `{Module ID}="${moduleId}"` }),
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    moduleId: r["Module ID"] as string,
    phraseText: r["Phrase Text"] as string,
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getTakeaways(moduleId?: string): Promise<Takeaway[]> {
  const rows = await fetchTable(TABLE_NAMES.takeaways, {
    ...(moduleId && { filterByFormula: `{Module ID}="${moduleId}"` }),
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    moduleId: r["Module ID"] as string,
    text: r["Text"] as string,
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getSelfAssessment(moduleId?: string): Promise<SelfAssessmentStatement[]> {
  const rows = await fetchTable(TABLE_NAMES.selfAssessment, {
    ...(moduleId && { filterByFormula: `{Module ID}="${moduleId}"` }),
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    moduleId: r["Module ID"] as string,
    statement: r["Statement"] as string,
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getPracticeScenarios(moduleId?: string): Promise<PracticeScenario[]> {
  const rows = await fetchTable(TABLE_NAMES.practiceScenarios, {
    ...(moduleId && { filterByFormula: `{Module ID}="${moduleId}"` }),
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    moduleId: r["Module ID"] as string,
    title: (r["Title"] as string) || "",
    scenarioText: r["Scenario Text"] as string,
    quote: (r["Quote"] as string) || "",
    typeLabel: (r["Type Label"] as string) || "",
    signs: (r["Signs"] as string) || "",
    options: parseJSON<{ text: string; correct: boolean; feedback: string }[]>(r["Options"], []),
    correctAnswer: (r["Correct Answer"] as number) || 0,
    explanation: (r["Explanation"] as string) || "",
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getDiscoverySteps(): Promise<DiscoveryStep[]> {
  const rows = await fetchTable(TABLE_NAMES.discoverySteps, {
    sort: [{ field: "Step Number" }],
  });
  return rows.map((r) => ({
    stepNumber: r["Step Number"] as number,
    title: r["Title"] as string,
    icon: r["Icon"] as string,
    what: r["What"] as string,
    why: r["Why"] as string,
    jeanStory: r["Jean Story"] as string,
    tip: r["Tip"] as string,
  }));
}

export async function getCircles(): Promise<Circle[]> {
  const rows = await fetchTable(TABLE_NAMES.circles, {
    sort: [{ field: "Circle ID" }],
  });
  return rows.map((r) => ({
    circleId: r["Circle ID"] as number,
    name: r["Name"] as string,
    shortName: r["Short Name"] as string,
    color: r["Color"] as string,
    tagline: r["Tagline"] as string,
  }));
}

export async function getSwemwbsQuestions(): Promise<SwemwbsQuestion[]> {
  const rows = await fetchTable(TABLE_NAMES.swemwbs, {
    sort: [{ field: "Question Number" }],
  });
  return rows.map((r) => ({
    questionNumber: r["Question Number"] as number,
    statement: r["Statement"] as string,
  }));
}

export async function getRoleContent(): Promise<RoleSection[]> {
  const rows = await fetchTable(TABLE_NAMES.roleContent, {
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    sectionId: r["Section ID"] as string,
    title: r["Title"] as string,
    icon: r["Icon"] as string,
    subtitle: r["Subtitle"] as string,
    introText: (r["Intro Text"] as string) || "",
    keyLine: (r["Key Line"] as string) || "",
    content: parseJSON<Record<string, unknown>>(r["Content"], {}),
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getJourneyStages(): Promise<JourneyStage[]> {
  const rows = await fetchTable(TABLE_NAMES.journeyStages, {
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    stageId: r["Stage ID"] as string,
    title: r["Title"] as string,
    subtitle: r["Subtitle"] as string,
    icon: r["Icon"] as string,
    description: r["Description"] as string,
    moduleIds: ((r["Module IDs"] as string) || "").split(",").map((s) => s.trim()),
    sortOrder: r["Sort Order"] as number,
  }));
}

export async function getFeedbackConfig(section?: string): Promise<FeedbackConfig[]> {
  const rows = await fetchTable(TABLE_NAMES.feedbackConfig, {
    ...(section && { filterByFormula: `{Section}="${section}"` }),
    sort: [{ field: "Sort Order" }],
  });
  return rows.map((r) => ({
    section: r["Section"] as string,
    title: (r["Title"] as string) || "",
    description: r["Description"] as string,
    icon: (r["Icon"] as string) || "",
    sortOrder: r["Sort Order"] as number,
  }));
}
