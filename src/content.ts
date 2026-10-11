/** Edit your public profile here. Add real projects to the array below. */
export const profile = {
  name: "Hieu Nguyen",
  intro:
    "Sup! I'm Hieu (pronounced hue), and I'm a Computer Science student. I'm interested in software engineering and applying AI and machine learning to real world problems.",
  github: "https://github.com/hieun5",
  email: "hieunguy141@gmail.com",
  source: "https://github.com/hieun5/portfolio",
};

export interface SkillGroup {
  category: string;
  tone: "blue" | "orange" | "green";
  items: string[];
}

// Based on lolPredict and this portfolio, with additional languages requested by Hieu.
export const technicalSkills: SkillGroup[] = [
  {
    category: "Languages",
    tone: "blue",
    items: [
      "Python",
      "Java",
      "C",
      "C++",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "SQL",
    ],
  },
  {
    category: "Frameworks & libraries",
    tone: "orange",
    items: ["React", "FastAPI", "pandas", "Requests", "Lucide React"],
  },
  {
    category: "Tools",
    tone: "green",
    items: ["Git", "Node.js", "Vite", "npm", "ESLint"],
  },
];

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

// Leave empty until your real projects are ready. The site shows a short placeholder.
// Each entry supports a title, category, tags, image, live URL, and case-study details.
export const projects: Project[] = [];
