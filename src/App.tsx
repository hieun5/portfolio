import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  FolderCode,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";
import { profile, projects } from "./content";
import type { Category, Project } from "./content";
import { Sculpture } from "./Artwork";

const categories: Category[] = ["All work", "Software engineering", "AI / ML"];

export default function App() {
  const [category, setCategory] = useState<Category>("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleProjects = projects.filter(
    (project) => category === "All work" || project.category === category,
  );
  const contactUrl = profile.email ? `mailto:${profile.email}` : profile.github;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActiveSection(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    for (const id of ["work", "about", "contact"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedProject || !dialog) return;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
    };
  }, [selectedProject]);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnResize = () => {
      if (window.innerWidth > 640) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [menuOpen]);

  async function copyContact() {
    try {
      await navigator.clipboard.writeText(profile.email || profile.github);
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
      <header className="site-header wrap">
        <a
          className="wordmark"
          href="#home"
          aria-label={`${profile.name}, home`}
        >
          {profile.handle}
          <span>.</span>
        </a>
        <span className="header-caption">
          SOFTWARE &<br />
          AI / ML ENGINEERING
        </span>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={menuOpen ? "navigation is-open" : "navigation"}
        >
          {["work", "about"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={activeSection === section ? "active" : ""}
              aria-current={activeSection === section ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {section === "work" ? "Work" : "About"}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero wrap" id="home" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot" />
              {profile.availability}
            </div>
            <h1 id="hero-heading">
              Engineering ideas.
              <br />
              Exploring
              <br />
              <span className="hero-last">
                intelligence<span className="heading-dot">.</span>
              </span>
            </h1>
            <p>{profile.intro}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Explore my work <ArrowDown size={16} />
              </a>
              <a className="text-link" href="#about">
                A little about me <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-topline">
              <span>
                THE SPACE BETWEEN
                <br />
                CODE & POSSIBILITY.
              </span>
              <span className="art-cross">+</span>
            </div>
            <Sculpture />
            <div className="floating-note">
              <Code2 size={19} />
              <span>
                Curiosity → ideas
                <br />
                <b>Ideas → something real.</b>
              </span>
            </div>
            <div className="art-bottomline">
              <span>
                <span className="status-dot" /> ALWAYS EXPLORING.
              </span>
              <span>01 / ∞</span>
            </div>
          </div>
        </section>

        <div className="principles wrap" aria-label="My principles">
          <span>
            <small>01 /</small> Think deeply.
          </span>
          <span>
            <small>02 /</small> Build thoughtfully.
          </span>
          <span>
            <small>03 /</small> Keep exploring.
          </span>
          <Sparkles size={22} aria-hidden="true" />
        </div>

        <section
          className="work-section wrap section"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span /> SELECTED WORK
              </p>
              <h2 id="work-heading">
                Ideas into something real<span>.</span>
              </h2>
            </div>
            <p className="section-description">
              Software, systems, and experiments
              <br className="desktop-break" /> at the intersection of code and
              intelligence.
            </p>
          </div>
          {projects.length > 0 ? (
            <>
              <div className="work-toolbar">
                <div
                  className="filters"
                  role="group"
                  aria-label="Filter projects"
                >
                  {categories.map((item) => (
                    <button
                      key={item}
                      aria-pressed={category === item}
                      className={category === item ? "filter active" : "filter"}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                      {item === "All work" && (
                        <span>
                          {projects.length.toString().padStart(2, "0")}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <span className="work-note">ALWAYS A WORK IN PROGRESS.</span>
              </div>
              <div className="projects-grid" aria-live="polite">
                {visibleProjects.map((project, index) => (
                  <article className="project-card" key={project.id}>
                    <button
                      className="project-preview"
                      aria-label={`View ${project.title} project`}
                      onClick={() => setSelectedProject(project)}
                    >
                      {project.image ? (
                        <img src={project.image} alt="" />
                      ) : (
                        <div className="generic-project-art">
                          <Code2 size={40} />
                          <span>{project.title}</span>
                        </div>
                      )}
                      <span className="project-hover">
                        Take a closer look <ArrowUpRight size={18} />
                      </span>
                    </button>
                    <div className="project-info">
                      <div>
                        <h3>
                          <button onClick={() => setSelectedProject(project)}>
                            {project.title}
                            <span className="project-index">
                              {" "}
                              / {(index + 1).toString().padStart(2, "0")}
                            </span>
                          </button>
                        </h3>
                        <p>{project.subtitle}</p>
                        <div className="project-tags">
                          {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        className="circle-arrow"
                        aria-label={`Read about ${project.title}`}
                        onClick={() => setSelectedProject(project)}
                      >
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-work">
              <div className="empty-work-copy">
                <span className="folder-icon">
                  <FolderCode size={26} />
                </span>
                <span className="empty-path">~/hieu/projects</span>
                <h3>
                  The next chapter
                  <br />
                  is taking shape.
                </h3>
                <p>
                  A collection of software and AI/ML projects.
                  <br />
                  Coming soon. Built with intention.
                </p>
                <span className="coming-soon">
                  <span className="status-dot" /> PROJECTS ON THE HORIZON
                </span>
              </div>
              <div className="empty-work-art" aria-hidden="true">
                <div className="terminal-head">
                  <span />
                  <span />
                  <span />
                  <small>possibility.py</small>
                </div>
                <div className="terminal-body">
                  <p>
                    <span>01</span>
                    <i>from</i> curiosity <i>import</i> ideas
                  </p>
                  <p>
                    <span>02</span>
                  </p>
                  <p>
                    <span>03</span>
                    <i>def</i> <b>build_something_meaningful</b>():
                  </p>
                  <p>
                    <span>04</span>　 learn()
                  </p>
                  <p>
                    <span>05</span>　 explore()
                  </p>
                  <p>
                    <span>06</span>　 create()
                  </p>
                  <p>
                    <span>07</span>
                  </p>
                  <p>
                    <span>08</span>
                    <em># the next chapter starts here</em>
                    <span className="terminal-cursor" />
                  </p>
                </div>
                <div className="terminal-bottom">
                  <span>Python</span>
                  <span>∞ possibilities</span>
                </div>
              </div>
            </div>
          )}
        </section>

        <section
          className="about-section wrap section"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="about-heading">
            <p className="eyebrow">
              <span /> A LITTLE ABOUT ME
            </p>
            <h2 id="about-heading">
              A curious mind.
              <br />A builder at heart<span>.</span>
            </h2>
            <div className="personal-card">
              <span className="personal-caption">
                HELLO, I’M {profile.name.toUpperCase()}.
              </span>
              <div className="personal-monogram">
                {profile.initials}
                <span>✳</span>
              </div>
              <div className="personal-bottom">
                <span>
                  Always learning.
                  <br />
                  Always making.
                </span>
                <MoveUpRight size={29} />
              </div>
            </div>
          </div>
          <div className="about-copy">
            <p className="about-lead">
              Good things happen where
              <br className="desktop-break" /> engineering meets curiosity.
            </p>
            <p>{profile.about}</p>
            <p>{profile.approach}</p>
            <div className="toolkit">
              <h3>Things I’m curious about</h3>
              <div>
                {profile.interests.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find me on GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section
          className="contact-section wrap"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="contact-panel">
            <div className="contact-top">
              <p className="eyebrow">
                <span /> GOOD WORK STARTS WITH A CONVERSATION
              </p>
              <Sparkles size={33} aria-hidden="true" />
            </div>
            <div className="contact-body">
              <h2 id="contact-heading">
                Let’s build
                <br />
                <i>something good.</i>
              </h2>
              <div className="contact-copy">
                <p>
                  Have an idea, a project, or just a hello?
                  <br />
                  I’d love to hear from you.
                </p>
                <a
                  className="button button-lime"
                  href={contactUrl}
                  {...(!profile.email
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {profile.email ? "Say hello" : "Find me on GitHub"}{" "}
                  <ArrowUpRight size={18} />
                </a>
                <button className="copy-contact" onClick={copyContact}>
                  {copyState === "copied" ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}{" "}
                  {copyState === "copied"
                    ? "Copied!"
                    : profile.email
                      ? "Copy email address"
                      : "Copy GitHub link"}
                </button>
                <span className="copy-feedback" role="status">
                  {copyState === "error"
                    ? "Copy is unavailable. You can use the link above."
                    : copyState === "copied"
                      ? "Contact link copied to clipboard."
                      : ""}
                </span>
              </div>
            </div>
            <div className="contact-bottom">
              <span>LET’S MAKE SOMETHING WORTH MAKING.</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <a
          href="#home"
          className="wordmark"
          aria-label={`${profile.name}, home`}
        >
          {profile.handle}
          <span>.</span>
        </a>
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with intention.
        </p>
        <a className="back-top" href="#home">
          Back to top <ArrowUp size={15} />
        </a>
      </footer>

      <dialog
        className="project-dialog"
        ref={dialogRef}
        aria-labelledby="dialog-title"
        onCancel={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              setSelectedProject(null);
          }
        }}
      >
        {selectedProject && (
          <>
            <button
              className="dialog-close"
              aria-label="Close project details"
              onClick={() => setSelectedProject(null)}
              autoFocus
            >
              <X size={22} />
            </button>
            {selectedProject.image && (
              <img
                className="dialog-image"
                src={selectedProject.image}
                alt=""
              />
            )}
            <div className="dialog-content">
              <p className="eyebrow">
                {selectedProject.category.toUpperCase()}
              </p>
              <h2 id="dialog-title">
                {selectedProject.title}
                <span>.</span>
              </h2>
              <p className="dialog-subtitle">{selectedProject.subtitle}</p>
              <p>{selectedProject.description}</p>
              <h3>The intention</h3>
              <p>{selectedProject.intention}</p>
              <ul>
                {selectedProject.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {selectedProject.url && (
                <a
                  className="button button-lime"
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View project <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
