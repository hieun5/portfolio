import { ArrowUpRight, Plus } from "lucide-react";
import { profile, projects, technicalSkills } from "./content";
import portrait from "./assets/hieu-nguyen.jpg";

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
            <div className="hero-heading-row">
              <h1 id="hero-heading">
                {profile.name}
                <span>.</span>
              </h1>
              <div className="hero-portrait-frame">
                <img
                  className="hero-portrait"
                  src={portrait}
                  alt={`Portrait of ${profile.name}`}
                  width={160}
                  height={160}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
            <h2 className="hero-about-heading">About me</h2>
            <p className="hero-intro">{profile.intro}</p>
            <p className="hero-intro">{profile.interests}</p>
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

          <section
            className="work-section"
            id="work"
            aria-labelledby="work-heading"
          >
            <div className="section-label">
              <h2 id="work-heading">Projects</h2>
            </div>
            {projects.length === 0 ? (
              <p className="empty-projects">Projects coming soon.</p>
            ) : (
              <div className="project-list">
                {projects.map((project) => (
                  <article
                    className="project-card"
                    key={project.id}
                    aria-labelledby={`${project.id}-title`}
                  >
                    <div className="project-image">
                      {project.image && (
                        <img
                          className="project-preview"
                          src={`${import.meta.env.BASE_URL}${project.image.replace(/^\/+/, "")}`}
                          alt={project.imageAlt ?? `${project.title} project preview`}
                          width={1600}
                          height={1000}
                          loading="lazy"
                        />
                      )}
                      {project.url && (
                        <a
                          className="project-github"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          GitHub <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    <div className="project-body">
                      <h3 id={`${project.id}-title`}>{project.title}</h3>
                      <p>{project.subtitle}</p>
                      <ul
                        className="project-tech"
                        aria-label={`${project.title} technologies`}
                      >
                        {project.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      {(project.description ||
                        project.intention ||
                        Boolean(project.details?.length)) && (
                        <details>
                          <summary>
                            Read more <Plus size={14} />
                          </summary>
                          <div className="project-details">
                            {project.description && <p>{project.description}</p>}
                            {project.intention && <p>{project.intention}</p>}
                            {Boolean(project.details?.length) && (
                              <ul>
                                {project.details?.map((detail) => (
                                  <li key={detail}>{detail}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </details>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
