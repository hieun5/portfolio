/** Edit your public profile here. Add real projects to the array below. */
export const profile = {
  name: "Hieu Nguyen",
  role: "Software engineering & AI / ML",
  intro: "Interested in useful software and practical machine learning.",
  github: "https://github.com/hieun5",
  source: "https://github.com/hieun5/portfolio",
};

export interface SkillGroup {
  category: string;
  items: string[];
}

// Based on lolPredict/backend/main.py and this portfolio's source and manifests.
export const technicalSkills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  { category: "Frameworks", items: ["React", "FastAPI"] },
  { category: "Libraries", items: ["Lucide React"] },
  { category: "Tools", items: ["Git", "Node.js", "Vite", "npm"] },
  { category: "Testing", items: ["Playwright", "axe-core"] },
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
