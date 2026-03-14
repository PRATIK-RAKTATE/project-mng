import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="brand">Project-mng</Link>
      <div className="header-actions">
        <Link to="/search">Search</Link>
        <Link to="/template">Template</Link>
      </div>
    </header>
  );
}
