import { useEffect, useState } from "react";

export default function TemplateEditor({ template, onSave }) {
  const [name, setName] = useState("Default Template");
  const [items, setItems] = useState([""]);

  useEffect(() => {
    if (template) {
      setName(template.name || "Default Template");
      setItems(template.items?.length ? template.items : [""]);
    }
  }, [template]);

  const updateItem = (index, value) => setItems((prev) => prev.map((item, i) => (i === index ? value : item)));
  const addItem = () => setItems((prev) => [...prev, ""]);
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  const submit = async (e) => {
    e.preventDefault();
    await onSave({ name: name.trim(), items: items.map((x) => x.trim()).filter(Boolean) });
  };

  return (
    <form className="card stack" onSubmit={submit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Template name" />
      {items.map((item, index) => (
        <div key={index} className="row">
          <input value={item} onChange={(e) => updateItem(index, e.target.value)} placeholder={`Template item ${index + 1}`} />
          <button type="button" onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addItem}>Add template item</button>
      <button type="submit">Save template</button>
    </form>
  );
}
