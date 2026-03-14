import { Link } from "react-router-dom";
import { todayString } from "../utils/date";

export default function BottomNav() {
  const today = todayString();
  return (
    <nav className="bottom-nav">
      <Link to="/">Main</Link>
      <Link to={`/day/${today}`}>Day</Link>
      <Link to={`/week/${today}`}>Week</Link>
      <Link to="/template">Template</Link>
    </nav>
  );
}
