// src/components/ProjectTemplate.jsx
import { Helmet } from "react-helmet";
import './ProjectPage.css'
function ProjectTemplate({ title, description, overview, features, tech, liveLink, codeLink, slug }) {
  return (
    <div className="project-page">
      <Helmet>
        <title>{title} | Basit Tijani Portfolio</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://basittijani.com/projects/${slug}`} />
      </Helmet>

      <main className="project-container">
        <header className="project-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <section className="project-overview">
          <h2>Overview</h2>
          <p>{overview}</p>
        </section>

        <section className="project-features">
          <h2>Key Features</h2>
          <ul>
            {features.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="project-tech">
          <h2>Technologies Used</h2>
          <p>{tech}</p>
        </section>

        <section className="project-links">
          <a href={liveLink} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
          <a href={codeLink} target="_blank" rel="noopener noreferrer">
            View Code
          </a>
        </section>
      </main>
    </div>
  );
}

export default ProjectTemplate;
