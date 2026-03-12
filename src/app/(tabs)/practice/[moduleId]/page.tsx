import {
  getModules, getLearnContent, getComparisonTables, getPrompts,
  getTakeaways, getSelfAssessment, getPracticeScenarios,
  getDiscoverySteps, getCircles, getSwemwbsQuestions,
  getFeedbackConfig,
} from "@/lib/airtable-read";
import ModuleClient from "./ModuleClient";

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { moduleId } = await params;
  const modules = await getModules();
  const module = modules.find((m) => m.moduleId === moduleId);

  if (!module) {
    return <div className="p-4">Module not found</div>;
  }

  const [learnContent, tables, prompts, takeaways, selfAssessment, scenarios] =
    await Promise.all([
      getLearnContent(moduleId),
      getComparisonTables(moduleId),
      getPrompts(moduleId),
      getTakeaways(moduleId),
      getSelfAssessment(moduleId),
      getPracticeScenarios(moduleId),
    ]);

  // Fetch module-specific data
  let discoverySteps, circles, swemwbsQuestions, noteModel, noteChecklist;
  if (moduleId === "discovery") {
    discoverySteps = await getDiscoverySteps();
  }
  if (moduleId === "circles") {
    circles = await getCircles();
  }
  if (moduleId === "swemwbs") {
    swemwbsQuestions = await getSwemwbsQuestions();
  }
  if (moduleId === "notes") {
    const configs = await getFeedbackConfig();
    noteModel = configs.find((c) => c.section === "note_model");
    noteChecklist = configs.find((c) => c.section === "note_checklist");
  }

  return (
    <ModuleClient
      module={module}
      learnContent={learnContent}
      tables={tables}
      prompts={prompts}
      takeaways={takeaways}
      selfAssessment={selfAssessment}
      scenarios={scenarios}
      discoverySteps={discoverySteps || []}
      circles={circles || []}
      swemwbsQuestions={swemwbsQuestions || []}
      noteModel={noteModel}
      noteChecklist={noteChecklist}
    />
  );
}
