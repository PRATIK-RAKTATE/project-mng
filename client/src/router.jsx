import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainViewPage from "./pages/MainViewPage";
import DayViewPage from "./pages/DayViewPage";
import WeekViewPage from "./pages/WeekViewPage";
import ProjectViewPage from "./pages/ProjectViewPage";
import TemplatePage from "./pages/TemplatePage";
import SearchPage from "./pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainViewPage /> },
      { path: "day/:date", element: <DayViewPage /> },
      { path: "week/:date", element: <WeekViewPage /> },
      { path: "project/:slug", element: <ProjectViewPage /> },
      { path: "template", element: <TemplatePage /> },
      { path: "search", element: <SearchPage /> }
    ]
  }
]);
