import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchApi } from "../api/search.api";

export default function SearchPage() {
  const [results, setResults] = useState(null);

  const onSearch = async (q) => {
    if (!q) return setResults(null);
    const res = await searchApi.query(q);
    setResults(res.data);
  };

  return (
    <div className="stack">
      <h2>Universal Search</h2>
      <SearchBar onSearch={onSearch} />
      {results && (
        <>
          <div className="card"><h3>Tasks</h3>{results.tasks.length ? results.tasks.map((t) => <div key={t._id}>{t.title}</div>) : <div className="muted">No matches</div>}</div>
          <div className="card"><h3>Projects</h3>{results.projects.length ? results.projects.map((p) => <div key={p._id}>{p.name}</div>) : <div className="muted">No matches</div>}</div>
          <div className="card"><h3>Slots</h3>{results.slots.length ? results.slots.map((s) => <div key={s._id}>{s.name}</div>) : <div className="muted">No matches</div>}</div>
          <div className="card"><h3>Template</h3>{results.templates.length ? results.templates.map((t) => <div key={t._id}>{t.name}</div>) : <div className="muted">No matches</div>}</div>
        </>
      )}
    </div>
  );
}
