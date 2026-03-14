import { useState } from "react";

export default function SearchBar({ onSearch, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search tasks, projects, slots, templates..." />
      <button type="submit">Search</button>
    </form>
  );
}
