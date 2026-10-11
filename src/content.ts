/** Edit your public profile here. Add real projects to the array below. */
export const profile = {
  name: "Hieu Nguyen",
  role: "Software engineering & AI / ML",
  intro: "Interested in useful software and practical machine learning.",
  github: "https://github.com/hieun5",
  source: "https://github.com/hieun5/portfolio",
  // Add your public contact email to enable the email link and copy button.
  email: "",
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

// Leave empty until your real projects are ready. The site shows a short placeholder.
// Each entry supports a title, category, tags, image, live URL, and case-study details.
export const projects: Project[] = [];
