import { useEffect, useState } from "react";
import { templatesApi } from "../api/templates.api";
import TemplateEditor from "../components/TemplateEditor";

export default function TemplatePage() {
  const [template, setTemplate] = useState(null);
  const load = async () => { const res = await templatesApi.getDefault(); setTemplate(res.data); };
  useEffect(() => { load(); }, []);

  return (
    <div className="stack">
      <h2>Template</h2>
      <TemplateEditor template={template} onSave={async (payload) => { await templatesApi.saveDefault(payload); await load(); }} />
    </div>
  );
}
