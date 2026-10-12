// Professional experience. Dates, numbers, and tools follow the approved
// résumé exactly; keep each metric next to the context it was measured in.

export type ExperienceDetail = {
  label: string;
  text: string;
};

export type Experience = {
  id: string;
  organization: string;
  role: string;
  dates: string;
  location: string;
  icon: "search" | "atom" | "layers";
  summary: string;
  highlight: string;
  details: ExperienceDetail[];
  note?: string;
  tools: string[];
};

export const experience: Experience[] = [
  {
    id: "ceas",
    organization: "CEAS — Stony Brook University",
    role: "Software Engineer Intern",
    dates: "Jan 2026 – Apr 2026",
    location: "Stony Brook, NY",
    icon: "search",
    summary:
      "Built a researcher-search application and worked on retrieval quality, duplicate-record failures, and deployment constraints.",
    highlight:
      "Raised top-three retrieval relevance (Hit Rate@3) from 42% with BM25 to 86% on 50 logged user queries, using pgvector retrieval and one bounded LangGraph reformulation retry.",
    details: [
      {
        label: "Search app",
        text: "Built a React/FastAPI researcher-search application across university departments, replacing manual lookup with ranked results over 233 researcher profiles at p95 search latency below 300 ms.",
      },
      {
        label: "Retrieval choices",
        text: "Compared BM25 with pgvector retrieval in a profile-grounded RAG workflow, and added pytest checks to detect retrieval regressions.",
      },
      {
        label: "Duplicate records",
        text: "Traced 24 duplicate profiles to concurrent ingestion retries; implemented transactional PostgreSQL upserts and namespace-scoped identity matching, preventing repeat inserts in reproduced failure cases.",
      },
      {
        label: "Deployment",
        text: "Replaced incompatible ChromaDB storage with PostgreSQL/pgvector to unblock deployment; added REST contract checks in GitHub Actions, request tracing, and Docker packaging for AWS deployment.",
      },
    ],
    tools: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "LangGraph",
      "pytest",
      "GitHub Actions",
      "Docker",
      "AWS",
    ],
  },
  {
    id: "bnl",
    organization: "Brookhaven National Laboratory",
    role: "Graduate Research Assistant",
    dates: "Jan 2025 – Dec 2025",
    location: "Upton, NY",
    icon: "atom",
    summary:
      "Improved MRI model-evaluation workflows so experiments were faster to run and easier to compare.",
    highlight:
      "Made CNN/ViT evaluation for brain tumor classification 3× faster than the uncached pipeline on 3,000 MRI slices by profiling repeated feature extraction and caching reusable vectors in PyTorch.",
    details: [
      {
        label: "Shared modules",
        text: "Consolidated duplicated scripts for 15 PyTorch variants into shared training, checkpointing, and evaluation modules; tracked configurations, metrics, and artifacts in MLflow for repeatable comparisons.",
      },
      {
        label: "Preprocessing choice",
        text: "Investigated scanner-specific background cues with Grad-CAM and compared preprocessing variants in MLflow; selected intensity normalization over background masking based on cross-scanner evaluation.",
      },
      {
        label: "Validation",
        text: "Containerized the model-pipeline runtime with Docker and parallelized pytest in GitHub Actions, returning accuracy and calibration checks in under 10 minutes before merging pipeline changes.",
      },
    ],
    note: "Research engineering on model-evaluation workflows — not a clinical or deployed medical tool.",
    tools: ["PyTorch", "MLflow", "Grad-CAM", "Docker", "pytest", "GitHub Actions"],
  },
  {
    id: "spiralinks",
    organization: "SpiraLinks",
    role: "Software Development Engineer",
    dates: "Jan 2024 – Aug 2024",
    location: "India",
    icon: "layers",
    summary:
      "Worked on Java backend performance, service contracts, access controls, and container health behavior.",
    highlight:
      "Reduced reporting-endpoint p95 latency by 56% to below 100 ms by fixing N+1 queries, adding PostgreSQL composite indexes, and caching repeated reads in Redis.",
    details: [
      {
        label: "Team migration",
        text: "During a team migration from a Java monolith to six Spring Boot services, I implemented REST contracts, added JUnit regressions, and participated in code reviews to check interface compatibility.",
      },
      {
        label: "Access control",
        text: "Validated OAuth 2.0 JWT access tokens and enforced server-side role-based access control; added JUnit tests confirming rejection of invalid tokens and requests with insufficient permissions.",
      },
      {
        label: "Container health",
        text: "Diagnosed repeated container restarts during database delays; separated Kubernetes liveness and readiness checks so database availability affected traffic routing without triggering unnecessary application restarts.",
      },
    ],
    tools: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "JUnit",
      "OAuth 2.0 / JWT",
      "Kubernetes",
    ],
  },
];
