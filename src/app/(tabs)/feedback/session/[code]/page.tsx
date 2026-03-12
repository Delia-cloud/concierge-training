import { getFeedbackConfig, getModules } from "@/lib/airtable-read";
import SessionClient from "./SessionClient";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function SessionPage({ params }: Props) {
  const { code } = await params;
  const [config, modules] = await Promise.all([
    getFeedbackConfig(),
    getModules(),
  ]);

  return <SessionClient sessionCode={code} config={config} modules={modules} />;
}
