import { useLocation } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import useOffline from "../hooks/useOffline";

export default function AppShell({ children }) {
  const location = useLocation();
  const offline = useOffline();

  return (
    <div className="app-shell">
      <Header />
      {offline && <div className="offline-banner">Offline mode</div>}
      <main className="page-container" key={location.pathname}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
