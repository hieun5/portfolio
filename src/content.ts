/** Edit your public profile here. Add real projects to the array below. */
export const profile = {
  name: "Hieu Nguyen",
  intro:
    "Sup! I'm Hieu (pronounced hue), a Computer Science student who likes building things and figuring out what makes them tick. I'm into software engineering and using AI and machine learning to solve everyday problems.",
  interests:
    "Outside of school and code, I'm usually at the gym, playing video games, hanging out with friends, or trying new foods. A good workout, a good game, and a good meal make a pretty solid day.",
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
  description?: string;
  intention?: string;
  details?: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
}

// studyAI stack verified against source at cd181ffeb85559d1dd307374f196618256b71c06.
// Images use paths relative to public/ so they work on GitHub Pages as well.
export const projects: Project[] = [
  {
    id: "studyai",
    title: "studyAI",
    subtitle:
      "A local AI study app that turns lecture notes and PDFs into practice quizzes and helps students decide what to review next.",
    category: "AI / ML",
    tags: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Tailwind CSS",
      "scikit-learn",
      "Ollama",
    ],
    image: "projects/studyai.png",
    imageAlt: "studyAI study workspace with sample lecture notes and PDF upload",
    url: "https://github.com/hieun5/studyAI",
  },
];
