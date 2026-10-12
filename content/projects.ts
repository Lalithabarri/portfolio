// Projects. Every claim traces to the approved résumé. Individual
// repository links have not been approved yet, so none are listed; add a
// `links` entry only once a URL is confirmed.

export type ProjectSection = {
  heading: string;
  items: string[];
};

export type Project = {
  id: "legacybank" | "quorum" | "streamline" | "waypoint" | "storage-engine";
  name: string;
  fullName: string;
  tagline: string;
  dates: string;
  stack: string[];
  // One plain-English sentence for cards and nontechnical readers.
  summary: string;
  featured: boolean;
  whatItDoes: string;
  problem: string;
  sections: ProjectSection[];
  caveat?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "legacybank",
    name: "LegacyBank",
    fullName: "LegacyBank Capability Compiler",
    tagline: "Teach the AI once. Replay without it.",
    dates: "May 2026 – Sept 2026",
    stack: ["Python", "Playwright", "Meta Llama 3 70B"],
    featured: true,
    summary:
      "An LLM discovers a browser workflow once; the result is compiled into a typed, versioned capability that Playwright replays with zero model calls, behind explicit safety gates.",
    whatItDoes:
      "Converts LLM-discovered banking workflows into typed, versioned capabilities that Playwright can replay with zero model calls.",
    problem:
      "A workflow found by a model should be repeatable without asking the model again — and automation should never take an irreversible action unchecked.",
    sections: [
      {
        heading: "What I built",
        items: [
          "Discovery that selects actions from observed browser state, with parameterized replay inputs.",
          "Compilation of discovered workflows into typed, versioned capabilities replayed by Playwright with zero model calls.",
          "Deny-by-default action checks, with human approval required for irreversible transfers.",
          "Handoff to a human in the same browser session, with postconditions verified before automation resumes.",
        ],
      },
      {
        heading: "Failure modes covered",
        items: [
          "Ambiguous targets on the page.",
          "Policy denials.",
          "Retry blocking after an unknown outcome of an irreversible transaction.",
        ],
      },
      {
        heading: "Validation",
        items: [
          "888 tests, including 36 browser tests, validating discovery, replay, and business postconditions. These are test counts, not a measured task-success rate.",
        ],
      },
    ],
    caveat:
      "The walkthrough on this site is a conceptual explanation of the design — not a banking integration or a live transaction demo.",
  },
  {
    id: "quorum",
    name: "Quorum",
    fullName: "Quorum — Distributed Key-Value Store",
    tagline: "Replicated state through leader failures and recovery.",
    dates: "Jan 2025 – Apr 2025",
    stack: ["Python", "Raft", "gRPC", "AWS Graviton (ARM64)"],
    featured: false,
    summary:
      "A replicated key-value store built on Raft: leader election, log replication, and recovery after node restarts.",
    whatItDoes:
      "A distributed key-value store that replicates state across nodes using Raft, behind a gRPC key-value API.",
    problem:
      "Replicated state has to stay correct when leaders fail, networks partition, and nodes restart.",
    sections: [
      {
        heading: "What I built",
        items: [
          "Raft leader election and log replication behind a gRPC key-value API.",
          "Snapshots and restart recovery to restore replicated state after node restarts.",
        ],
      },
      {
        heading: "Failure I diagnosed",
        items: [
          "Traced recurring split votes during simulated partitions to synchronized election deadlines; randomized election timeouts to reduce collisions after leader loss.",
        ],
      },
      {
        heading: "Validation",
        items: [
          "Checked histories for linearizability against a sequential model under leader failure, log divergence, and partitions.",
          "Separately measured 3K+ completed operations/sec on a five-node AWS Graviton cluster with an 80/20 read/write workload.",
        ],
      },
    ],
  },
  {
    id: "streamline",
    name: "Streamline",
    fullName: "Streamline — Event-Driven Order Processing",
    tagline: "Orders, duplicate delivery, retries, and monitoring.",
    dates: "Jul 2025 – Dec 2025",
    stack: [
      "AWS Lambda",
      "API Gateway",
      "SNS/SQS",
      "DynamoDB",
      "Terraform",
      "CloudWatch",
    ],
    featured: false,
    summary:
      "Order processing that accepts requests independently of the workers handling them, and rejects duplicates when messages are delivered twice.",
    whatItDoes:
      "An event-driven order pipeline that decouples order admission from processing with API Gateway, Lambda, and SNS/SQS.",
    problem:
      "A synchronous path degraded under bursts. Accepted requests needed to queue independently of worker execution, without duplicate writes when messages are redelivered.",
    sections: [
      {
        heading: "What I built",
        items: [
          "Order admission decoupled from processing with API Gateway, Lambda, and SNS/SQS.",
          "DynamoDB conditional writes keyed to the business operation, rejecting repeated operations.",
          "Bounded retries, with exhausted messages routed to an SQS dead-letter queue.",
          "Infrastructure provisioned with Terraform; queue backlog and Lambda failures monitored through CloudWatch.",
        ],
      },
      {
        heading: "Validation",
        items: [
          "Recorded zero duplicate order writes in a 150K-event test at an offered load of 250 requests/sec with duplicate delivery.",
        ],
      },
    ],
  },
  {
    id: "waypoint",
    name: "Waypoint",
    fullName: "Waypoint — Collaborative AI Travel Planner",
    tagline: "LLM suggestions, deterministic scheduling.",
    dates: "Jan 2026 – Apr 2026",
    stack: ["TypeScript", "Temporal", "PostgreSQL", "OpenTelemetry", "OpenAI API"],
    featured: false,
    summary:
      "A collaborative travel planner where an LLM suggests activities and a deterministic scheduler makes sure the plan respects time windows.",
    whatItDoes:
      "Builds itineraries around LLM activity suggestions and a deterministic scheduler that enforces time-window constraints.",
    problem:
      "Model suggestions alone don't guarantee a workable schedule, and a shared plan has to stay consistent when several people edit it at once.",
    sections: [
      {
        heading: "What I built",
        items: [
          "Itinerary planning around LLM activity suggestions and a deterministic scheduler enforcing time-window constraints.",
          "Temporal/PostgreSQL workflows for itinerary planning.",
          "Optimistic concurrency control to detect stale edits.",
          "OpenTelemetry tracing for failure diagnosis.",
        ],
      },
      {
        heading: "Validation",
        items: [
          "Reduced median travel time by 18% against a greedy baseline in the evaluation workload.",
          "Tested 100 worker-failure scenarios; detected stale edits across 100 concurrent-edit pairs.",
          "96% of evaluated plans passed time-window and geographic-routing checks.",
          "Reduced OpenAI API spend by 24% versus unconstrained prompting, through bounded tool-call workflows and caching.",
        ],
      },
    ],
  },
  {
    id: "storage-engine",
    name: "LSM-Tree Storage Engine",
    fullName: "LSM-Tree Key-Value Storage Engine",
    tagline: "Persistent storage that keeps valid data through a crash.",
    dates: "Aug 2024 – Dec 2024",
    stack: ["C++", "SSTables", "Bloom Filters", "MurmurHash", "CRC32"],
    featured: false,
    summary:
      "A persistent key-value engine in C++ that skips needless disk reads for missing keys and recovers valid data after a process crash.",
    whatItDoes:
      "A persistent C++ key-value engine with MemTables, append-only logging, and SSTables.",
    problem:
      "Stored data must survive process crashes, and lookups for missing keys shouldn't cost unnecessary disk reads.",
    sections: [
      {
        heading: "What I built",
        items: [
          "MemTables, append-only logging, and SSTables, with background compaction to merge segments and reclaim space occupied by obsolete entries.",
          "MurmurHash-based Bloom filters to skip SSTables for definitely absent keys, avoiding unnecessary disk reads on negative lookups.",
        ],
      },
      {
        heading: "Failure I diagnosed",
        items: [
          "Diagnosed partial-log recovery failures through SIGKILL testing; added length-prefixed records, CRC32 validation, and handling for incomplete trailing records to recover valid preceding data after process crashes.",
        ],
      },
    ],
  },
];

export const getProject = (id: Project["id"]) => {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
};

// Conceptual walkthrough for the LegacyBank feature on the homepage.
export const legacyBankSteps = [
  {
    id: "discover",
    label: "Discover",
    title: "An LLM finds the workflow",
    text: "An LLM explores the browser workflow during discovery. Each action is chosen from the browser state it actually observes.",
  },
  {
    id: "compile",
    label: "Compile",
    title: "The path becomes a capability",
    text: "The discovered steps are compiled into a typed, versioned capability with parameterized inputs — a reusable definition instead of a one-off transcript.",
  },
  {
    id: "gate",
    label: "Gate",
    title: "Nothing irreversible runs unchecked",
    text: "Actions are checked deny-by-default. Irreversible transfers need human approval, and control passes to a person in the same browser session; postconditions are verified before automation resumes.",
  },
  {
    id: "replay",
    label: "Replay",
    title: "Run it again — no model needed",
    text: "Playwright replays the capability with zero model calls. If an irreversible transaction's outcome is unknown, retries are blocked rather than guessed.",
  },
] as const;

export type LegacyBankStepId = (typeof legacyBankSteps)[number]["id"];
