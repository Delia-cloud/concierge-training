"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import LearnTab from "@/components/practice/LearnTab";
import CirclesPractice from "@/components/practice/CirclesPractice";
import DiscoveryPractice from "@/components/practice/DiscoveryPractice";
import SwemwbsPractice from "@/components/practice/SwemwbsPractice";
import BoundariesPractice from "@/components/practice/BoundariesPractice";
import SafeguardingPractice from "@/components/practice/SafeguardingPractice";
import NotesPractice from "@/components/practice/NotesPractice";
import type {
  Module, LearnItem, ComparisonTable, Prompt, Takeaway,
  SelfAssessmentStatement, PracticeScenario, DiscoveryStep,
  Circle, SwemwbsQuestion, FeedbackConfig,
} from "@/lib/types";

interface Props {
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
  noteModel?: FeedbackConfig;
  noteChecklist?: FeedbackConfig;
}

export default function ModuleClient({
  module: mod,
  learnContent,
  tables,
  prompts,
  takeaways,
  selfAssessment,
  scenarios,
  discoverySteps,
  circles,
  swemwbsQuestions,
  noteModel,
  noteChecklist,
}: Props) {
  const [activeTab, setActiveTab] = useState("learn");
  const router = useRouter();

  const renderPractice = () => {
    const onBack = () => router.push("/practice");

    switch (mod.moduleId) {
      case "circles":
        return <CirclesPractice scenarios={scenarios} circles={circles} onBack={onBack} />;
      case "discovery":
        return <DiscoveryPractice steps={discoverySteps} onBack={onBack} />;
      case "swemwbs":
        return <SwemwbsPractice questions={swemwbsQuestions} onBack={onBack} />;
      case "boundaries":
        return <BoundariesPractice scenarios={scenarios} onBack={onBack} />;
      case "safeguarding":
        return <SafeguardingPractice scenarios={scenarios} onBack={onBack} />;
      case "notes":
        return <NotesPractice noteModel={noteModel} noteChecklist={noteChecklist} onBack={onBack} />;
      default:
        return <div className="p-4">Practice coming soon</div>;
    }
  };

  return (
    <>
      <Header
        title={mod.title}
        subtitle={mod.description}
        onBack={() => router.push("/practice")}
        tabs={[
          { id: "learn", label: "📖 Learn" },
          { id: "practice", label: "🏋️ Practice" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === "learn" ? (
        <LearnTab
          learnContent={learnContent}
          tables={tables}
          prompts={prompts}
          takeaways={takeaways}
          selfAssessment={selfAssessment}
          color={mod.color}
        />
      ) : (
        renderPractice()
      )}
    </>
  );
}
