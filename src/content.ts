/** Edit your public profile here. Add real projects to the array below. */
export const profile = {
  name: "Hieu Nguyen",
  handle: "hieu",
  initials: "HN",
  role: "Software & AI/ML engineering",
  availability: "SOFTWARE ENGINEERING × AI / ML",
  intro:
    "I’m Hieu Nguyen. I’m interested in building thoughtful software and exploring what’s possible with artificial intelligence.",
  about:
    "I’m drawn to the space where software engineering meets artificial intelligence. I enjoy breaking down complex problems, asking better questions, and turning ideas into something useful.",
  approach:
    "For me, building is a way of learning. I’m interested in thoughtful systems, practical machine learning, and the details that make technology work better for people.",
  github: "https://github.com/hieun5",
  source: "https://github.com/hieun5/portfolio",
  // Add your public contact email to enable the email link and copy button.
  email: "",
  interests: [
    "Software engineering",
    "Artificial intelligence",
    "Machine learning",
    "Problem solving",
    "Human-centered technology",
  ],
};

export type Category = "All work" | "Software engineering" | "AI / ML";
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<Category, "All work">;
  tags: string[];
  description: string;
  intention: string;
  details: string[];
  image?: string;
  url?: string;
}

// Leave empty until your real projects are ready. The site shows a designed empty state.
// Each entry supports a title, category, tags, image, live URL, and case-study details.
export const projects: Project[] = [];
