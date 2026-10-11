import { ArrowUp, ArrowUpRight, Plus } from "lucide-react";
import { profile, projects, technicalSkills } from "./content";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="wrap">
        <header className="site-header">
          <a
            className="wordmark"
            href="#home"
            aria-label={`${profile.name}, home`}
          >
            HN<span>.</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Projects</a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
          </nav>
        </header>

        <main id="main">
          <section className="hero" id="home" aria-labelledby="hero-heading">
            <h1 id="hero-heading">
              {profile.name}
              <span>.</span>
            </h1>
            <p className="role">{profile.role}</p>
            <p className="hero-intro">{profile.intro}</p>
          </section>

          <section
            className="work-section"
            id="work"
            aria-labelledby="work-heading"
          >
            <div className="section-label">
              <h2 id="work-heading">Projects</h2>
              {projects.length > 0 && (
                <span>{projects.length.toString().padStart(2, "0")}</span>
              )}
            </div>
            {projects.length === 0 ? (
              <p className="empty-projects">Projects coming soon.</p>
            ) : (
              <div className="project-list">
                {projects.map((project) => (
                  <article className="project-card" key={project.id}>
                    <div className="project-heading">
                      <h3>
                        {project.url ? (
                          <a
                            className="text-link"
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {project.title} <ArrowUpRight size={15} />
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <span>{project.category}</span>
                    </div>
                    <p>{project.subtitle}</p>
                    <details>
                      <summary>
                        Read more <Plus size={14} />
                      </summary>
                      <div className="project-details">
                        {project.image && (
                          <img
                            src={project.image}
                            alt={`${project.title} project preview`}
                            loading="lazy"
                          />
                        )}
                        <p>{project.description}</p>
                        <p>{project.intention}</p>
                        <ul>
                          {project.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                        <p className="project-tags">
                          {project.tags.join(" · ")}
                        </p>
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            )}
          </section>
          <section
            className="skills-section"
            id="skills"
            aria-labelledby="skills-heading"
          >
            <div className="section-label">
              <h2 id="skills-heading">Technical Skills</h2>
            </div>
            {technicalSkills.length > 0 ? (
              <dl className="skills-list">
                {technicalSkills.map((group) => (
                  <div
                    className={`skill-group skill-group--${group.tone}`}
                    key={group.category}
                  >
                    <dt>{group.category}</dt>
                    <dd>
                      {group.items.map((skill) => (
                        <span className="skill-pill" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="empty-skills">Skills will be added here soon.</p>
            )}
          </section>
        </main>

        <footer>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <a href="#home" className="text-link">
              Back to top <ArrowUp size={12} />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
