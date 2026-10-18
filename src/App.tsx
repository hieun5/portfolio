import { ArrowDown, Mail, Plus } from "lucide-react";
import { profile, projects, technicalSkills } from "./content";
import GithubIcon from "./GithubIcon";
import { CloudBank, SkyBackdrop } from "./Sky";
import useSkyJourney from "./useSkyJourney";

export default function App() {
  const sceneRef = useSkyJourney();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="sky-scene" ref={sceneRef}>
        <SkyBackdrop />
        <main id="main">
          <section className="hero" id="home" aria-labelledby="hero-heading">
            <h1 id="hero-heading">{profile.name}<span>.</span></h1>
            <div className="hero-horizon" aria-hidden="true">
              <CloudBank seed={3} />
            </div>
            <a className="scroll-cue" href="#about">
              Scroll to explore <ArrowDown size={16} aria-hidden="true" />
            </a>
          </section>

          <section className="about-section content-width reveal" id="about" aria-labelledby="about-heading" data-reveal="">
            <h2 id="about-heading">About me</h2>
            <p className="hero-intro">{profile.intro}</p>
            <p className="hero-intro">{profile.interests}</p>
            <nav className="contact-links" aria-label="Contact links">
              <a className="contact-button" href={profile.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon /> GitHub
              </a>
              <a className="contact-button" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`} target="_blank" rel="noopener noreferrer">
                <Mail size={16} aria-hidden="true" /> Email
              </a>
            </nav>
            <a className="descend-link" href="#work">
              View projects <ArrowDown size={15} aria-hidden="true" />
            </a>
          </section>

          <div className="cloud-realm">
            <div className="cloud-transition" aria-hidden="true">
              <CloudBank className="cloud-bank--far" seed={5} />
              <CloudBank className="cloud-bank--near" seed={11} />
            </div>
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
                            <GithubIcon /> GitHub
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
            <div className="lower-clouds" aria-hidden="true"><CloudBank seed={19} /></div>
          </div>
        </main>
      </div>
    </>
  );
}
