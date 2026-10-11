import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Plus } from "lucide-react";
import { profile, projects } from "./content";

export default function App() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  async function copyContact() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("idle"), 3000);
  }

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
            <a href="#contact">Contact</a>
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
            <a
              className="text-link hero-link"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
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
        </main>

        <footer id="contact" aria-labelledby="contact-heading">
          <div className="contact-row">
            <h2 id="contact-heading">Get in touch</h2>
            <div className="contact-links">
              {profile.email && (
                <div className="contact-email">
                  <a className="text-link" href={`mailto:${profile.email}`}>
                    {profile.email} <ArrowUpRight size={14} />
                  </a>
                  <button
                    className="copy-contact"
                    aria-label={
                      copyState === "copied" ? "Copied!" : "Copy email address"
                    }
                    onClick={copyContact}
                  >
                    {copyState === "copied" ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              )}
              {profile.phone && (
                <a
                  className="text-link"
                  href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
                >
                  {profile.phone} <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
          <p className="copy-feedback" role="status">
            {copyState === "error"
              ? "Copy is unavailable. You can use the link above."
              : copyState === "copied"
                ? "Email address copied to clipboard."
                : ""}
          </p>
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
