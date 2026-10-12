// Identity, navigation, and page copy.
// Facts come from the approved résumé (public/resume.pdf) and the
// user-approved wording in CLAUDE.md. Edit text here, not in components.

export type NavLink = { label: string; href: string };

export const profile = {
  name: "Lalitha Barri",
  shortName: "Lalitha",
  monogram: "LB",
  role: "Software Engineer · Applied AI",
  email: "sailalithabarri@gmail.com",
  resumeHref: "/resume.pdf",
  github: "https://github.com/LalithaBarri",
  linkedin: "https://www.linkedin.com/in/lalithabarri/",
} as const;

export const mailto = `mailto:${profile.email}`;

// Header links point at homepage anchors so they work from every route.
export const navLinks: NavLink[] = [
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Notebook", href: "/#notebook" },
  { label: "About", href: "/#about" },
];

export const hero = {
  headline: [
    "Curiosity is usually how it starts.",
    "Building is how I follow through.",
  ],
  supporting:
    "I'm interested in the space between an idea and something people can use. I build across software engineering and AI, with experience in full-stack applications, backend services, and systems that need to behave reliably.",
  status: "Open to software engineering and applied AI opportunities.",
  location: "Open to relocation across the USA.",
} as const;

export const about = {
  professional:
    "I'm interested in software engineering and AI, especially the choices that make an idea useful in practice. My experience spans backend development, AI agents and LLMs, and distributed systems.",
  adaptability:
    "I'm comfortable learning a new stack, working through unfamiliar problems, and adjusting my approach as requirements become clearer. I'm looking for a team where I can contribute, learn from others, and take on the work that helps the team move forward.",
  personal:
    "Outside work, I enjoy photography, travel, music, cooking, and a good cup of coffee. I'm open to finding my next job anywhere in the USA.",
} as const;

export type Interest = {
  label: string;
  icon: "camera" | "plane" | "music" | "cooking" | "coffee";
};

export const interests: Interest[] = [
  { label: "Photography", icon: "camera" },
  { label: "Travel", icon: "plane" },
  { label: "Music", icon: "music" },
  { label: "Cooking", icon: "cooking" },
  { label: "Coffee", icon: "coffee" },
];

export type Education = {
  school: string;
  shortSchool: string;
  // Website label requested by Lalitha, used everywhere a degree is shown.
  // (The résumé PDF words the B.Tech. as "Computer Science and Engineering".)
  degreeLabel: string;
  dates: string;
  graduated: string;
  location: string;
  gpa: string;
  coursework: string[];
};

export const education: Education[] = [
  {
    school: "Stony Brook University – SUNY",
    shortSchool: "Stony Brook University",
    degreeLabel: "Master’s (M.S.) — Computer Science",
    dates: "Aug 2024 – May 2026",
    graduated: "May 2026",
    location: "Stony Brook, NY",
    gpa: "3.53/4.0",
    coursework: [
      "Distributed Systems",
      "Operating Systems",
      "Database Systems",
      "Machine Learning",
    ],
  },
  {
    school: "Vellore Institute of Technology",
    shortSchool: "Vellore Institute of Technology",
    degreeLabel: "Bachelor’s (B.Tech.) — Computer Science",
    dates: "Aug 2020 – May 2024",
    graduated: "May 2024",
    location: "India",
    gpa: "3.5/4.0",
    coursework: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Object-Oriented Programming",
      "Software Engineering",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "Java", "C++", "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    group: "Frameworks & APIs",
    items: ["React", "FastAPI", "Spring Boot", "REST APIs", "gRPC", "Temporal"],
  },
  {
    group: "Databases & Retrieval",
    items: ["PostgreSQL", "pgvector", "Redis", "DynamoDB", "vector search"],
  },
  {
    group: "Cloud & Delivery",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "Git", "GitHub Actions", "Linux"],
  },
  {
    group: "AI/ML",
    items: ["PyTorch", "MLflow", "LangGraph", "RAG", "OpenAI API", "LLM/agent evaluation"],
  },
  {
    group: "Testing & Observability",
    items: ["pytest", "JUnit", "Playwright", "CloudWatch", "OpenTelemetry"],
  },
];

export const contact = {
  eyebrow: "Open to opportunities & conversations",
  heading: "Good things start with a hello.",
  body: "Hiring, a referral, or a conversation about something you're building?",
  cta: "Let's connect",
  signature: "Lalitha · Software Engineer",
} as const;
