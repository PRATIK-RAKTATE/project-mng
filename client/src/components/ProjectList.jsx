import { Link } from "react-router-dom";

export default function ProjectList({ projects }) {
  if (!projects.length) return <div className="card">No projects found.</div>;

  return (
    <div className="stack">
      {projects.map((project) => (
        <Link key={project._id} className="card" to={`/project/${project.slug}`} style={{ borderLeft: `6px solid ${project.color || "#3b82f6"}` }}>
          <strong>{project.name}</strong>
        </Link>
      ))}
    </div>
  );
}
