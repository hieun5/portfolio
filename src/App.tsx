import { ArrowDown, FolderOpen, Mail, Plus } from "lucide-react";
import { profile, projects, technicalSkills } from "./content";
import GithubIcon from "./GithubIcon";
import LinkedinIcon from "./LinkedinIcon";

export default function App() {

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="portfolio">
        <main id="main">
          <section className="hero" id="home" aria-labelledby="hero-heading">
            <h1 id="hero-heading" aria-label="HIEU NGUYEN...">
              HIEU <br />
              <span className="hero-surname">NGUYEN<span className="typing-dots" aria-hidden="true">...</span></span>
            </h1>
            <p className="hero-note">Computer Science at Portland State University.<br />Software engineering &amp; applied AI.</p>
            <a className="hero-projects" href="#work">View projects <ArrowDown size={17} aria-hidden="true" /></a>
          </section>

          <section className="about-section content-width reveal" id="about" aria-labelledby="about-heading" data-reveal="">
            <h2 id="about-heading">About me</h2>
            <p className="hero-intro">{profile.intro}</p>
            <p className="hero-intro">{profile.interests}</p>
            <nav className="contact-links" aria-label="Contact links">
              <a className="contact-button" href="#work">
                <FolderOpen size={16} aria-hidden="true" /> Projects
              </a>
              <a className="contact-button" href={profile.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon /> GitHub
              </a>
              <a className="contact-button" href={`mailto:${profile.email}`}>
                <Mail size={16} aria-hidden="true" /> Email
              </a>
              <a className="contact-button" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon /> LinkedIn
              </a>
            </nav>
          </section>

          <div className="portfolio-content">
            <section
              className="skills-section content-width reveal"
              id="skills"
              data-reveal=""
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
              className="work-section content-width reveal"
              id="work"
              data-reveal=""
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
                          <picture>
                            {project.imageSources && (
                              <source
                                type="image/webp"
                                srcSet={project.imageSources.map(image => `${import.meta.env.BASE_URL}${image.src} ${image.width}w`).join(", ")}
                                sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1440px) calc(43vw - 20px), calc(700px - 7vw)"
                              />
                            )}
                            <img
                              className="project-preview"
                              src={`${import.meta.env.BASE_URL}${project.image.replace(/^\/+/, "")}`}
                              alt={project.imageAlt ?? `${project.title} project preview`}
                              width={1600}
                              height={1000}
                              loading="lazy"
                              decoding="async"
                            />
                          </picture>
                        )}
                      </div>
                      <div className="project-body">
                        <h3 id={`${project.id}-title`}>
                          {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a> : project.title}
                        </h3>
                        <p>{project.subtitle}</p>
                        {project.url && (
                          <a className="project-source" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`View source for ${project.title}`}>
                            <GithubIcon /> View source
                          </a>
                        )}
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
              <div className="projects-contact">
                <a href={`mailto:${profile.email}`}><Mail size={16} aria-hidden="true" /> {profile.email}</a>
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  );
}
