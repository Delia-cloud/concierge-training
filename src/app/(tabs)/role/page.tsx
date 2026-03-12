import { getRoleContent, getModules } from "@/lib/airtable-read";
import RoleClient from "./RoleClient";

export default async function RolePage() {
  const [sections, modules] = await Promise.all([
    getRoleContent(),
    getModules(),
  ]);

  return <RoleClient sections={sections} modules={modules} />;
}
