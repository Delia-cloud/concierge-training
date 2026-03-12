import { getModules } from "@/lib/airtable-read";
import PracticeClient from "./PracticeClient";

export default async function PracticePage() {
  const modules = await getModules();
  return <PracticeClient modules={modules} />;
}
