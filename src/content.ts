/** Edit your public profile here. Add real projects to the array below. */
export const profile = {
  name: "Hieu Nguyen",
  intro:
    "I'm a Computer Science student at Portland State University (class of 2028) who likes shipping things end to end — from a FastAPI model server to the React screen that explains its prediction.",
  interests:
    "Outside of programming, I like to hang out, explore, and try out foods with my friends! I also like to gym and play video games!",
  github: "https://github.com/hieun5",
  linkedin: "https://www.linkedin.com/in/h1eunguyen/",
  email: "hieunguy141@gmail.com",
  source: "https://github.com/hieun5/portfolio",
};

export interface SkillGroup {
  category: string;
  tone: "blue" | "orange" | "green";
  items: string[];
}

// Based on the project stacks below and Hieu's résumé.
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
    category: "Frameworks & ML",
    tone: "orange",
    items: ["React", "Next.js", "FastAPI", "Flask", "Tailwind CSS", "scikit-learn", "pandas"],
  },
  {
    category: "Data & tools",
    tone: "green",
    items: ["Git", "PostgreSQL", "Drizzle ORM", "Node.js", "Vite", "Playwright", "Ollama"],
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
  imageSources?: { src: string; width: number }[];
  imageAlt?: string;
  url?: string;
}

function imageSources(name: string) {
  return [480, 640, 960, 1280, 1600].map(width => ({ src: `projects/${name}-${width}.webp`, width }));
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
    imageSources: imageSources("studyai"),
    imageAlt: "studyAI practice quiz with a hash-table question and multiple-choice answers; labeled illustrative demo",
    url: "https://github.com/hieun5/studyAI",
    details: [
      "Converts lecture notes into personalized practice questions with a React + TypeScript front end and a FastAPI back end.",
      "Uses TF-IDF vectorization and cosine-similarity retrieval to pick the source material behind each piece of AI feedback.",
      "Evaluates student explanations with a local LLM to spot knowledge gaps and recommend what to review next.",
    ],
  },
  // Stack verified against lolPredict at 6de30b2bfdcdae6d1f5acbf73e211ce2ae1d096b.
  {
    id: "lolpropredictor",
    title: "lolProPredictor",
    subtitle:
      "A machine learning app that predicts professional League of Legends match outcomes using team history and champion drafts.",
    category: "AI / ML",
    tags: ["React", "TypeScript", "Python", "FastAPI", "scikit-learn", "pandas"],
    image: "projects/lolpropredictor-dashboard.png",
    imageSources: imageSources("lolpropredictor-dashboard"),
    imageAlt: "lolProPredictor result showing T1 at 58.2% and Gen.G at 41.8%; labeled illustrative demo probabilities",
    url: "https://github.com/hieun5/lolPredict",
    details: [
      "End-to-end ML pipeline that predicts pro League of Legends match outcomes from historical esports data.",
      "Cleaned the datasets, ran exploratory analysis, and engineered features around team performance trends.",
      "Trained and compared Logistic Regression and Random Forest models, served through FastAPI to a React dashboard.",
    ],
  },
  // Stack verified against blockwise at 3377b2f51bcd96eeadac377cf750b3dafff2540c.
  {
    id: "blockwise",
    title: "Blockwise",
    subtitle:
      "A civic reporting app that helps Portland residents draft reports for potholes, damaged sidewalks, and broken streetlights.",
    category: "Software engineering",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "projects/blockwise-report.png",
    imageSources: imageSources("blockwise-report"),
    imageAlt: "Blockwise completed pothole report draft with editable description and export actions; labeled fictional demo",
    url: "https://github.com/hieun5/blockwise",
  },
  // Stack verified against hieu-sreviews at f043e7727b9410e83a85820c1e29a3938ba2949a.
  {
    id: "hieus-reviews",
    title: "Hieu’s Reviews",
    subtitle:
      "A shared food journal for tracking restaurant visits, comparing friends’ ratings, and exploring dining analytics.",
    category: "Software engineering",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Python", "Flask"],
    image: "projects/hieus-reviews.png",
    imageSources: imageSources("hieus-reviews"),
    imageAlt: "Hieu’s Reviews restaurant ratings and recent visits for clearly labeled fictional demo restaurants",
    url: "https://github.com/hieun5/hieu-sreviews",
    details: [
      "Cloud-hosted PostgreSQL database keeps visit history and powers ratings and cuisine analytics.",
      "Python group recommendations combine individual ratings, cuisine preferences, and budget filters, with explanations.",
      "SQL queries compute current ratings, group averages, and trends while keeping repeat visits from skewing rankings.",
    ],
  },
];
