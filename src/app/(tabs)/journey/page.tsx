import { getJourneyStages, getModules } from "@/lib/airtable-read";
import JourneyClient from "./JourneyClient";

export default async function JourneyPage() {
  const [stages, modules] = await Promise.all([
    getJourneyStages(),
    getModules(),
  ]);

  return <JourneyClient stages={stages} modules={modules} />;
}
