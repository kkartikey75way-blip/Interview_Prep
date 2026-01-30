import {
  FaCode,
  FaServer,
  FaLayerGroup,
  FaProjectDiagram,
  FaCogs,
  FaDatabase,
  FaCloud,
  FaBug,
  FaLock,
  FaMobileAlt,
  FaRobot,
  FaChartLine,
  FaNetworkWired,
  FaTerminal,
  FaBriefcase,
} from "react-icons/fa";

import { type IconType } from "react-icons";

export type InterviewTrack = {
  id: string;
  title: string;
  path: string;
  description: string;
  icon: IconType;
};

export const interviewTracks: InterviewTrack[] = [
  {
    id: "frontend",
    title: "Frontend",
    path: "/interview/frontend",
    description: "React, TypeScript, UI, performance",
    icon: FaCode,
  },
  {
    id: "backend",
    title: "Backend",
    path: "/interview/backend",
    description: "APIs, databases, authentication",
    icon: FaServer,
  },
  {
    id: "fullstack",
    title: "Full Stack",
    path: "/interview/fullstack",
    description: "End-to-end system building",
    icon: FaLayerGroup,
  },
  {
    id: "dsa",
    title: "DSA",
    path: "/interview/dsa",
    description: "Arrays, trees, graphs, DP",
    icon: FaProjectDiagram,
  },
  {
    id: "system-design",
    title: "System Design",
    path: "/interview/system-design",
    description: "Scalability, caching, architecture",
    icon: FaCogs,
  },
  {
    id: "databases",
    title: "Databases",
    path: "/interview/databases",
    description: "SQL, NoSQL, indexing, optimization",
    icon: FaDatabase,
  },
  {
    id: "devops",
    title: "DevOps",
    path: "/interview/devops",
    description: "CI/CD, Docker, Kubernetes",
    icon: FaCloud,
  },
  {
    id: "cloud",
    title: "Cloud",
    path: "/interview/cloud",
    description: "AWS, GCP, Azure fundamentals",
    icon: FaNetworkWired,
  },
  {
    id: "testing",
    title: "Testing",
    path: "/interview/testing",
    description: "Unit, integration, E2E testing",
    icon: FaBug,
  },
  {
    id: "security",
    title: "Security",
    path: "/interview/security",
    description: "JWT, OAuth, OWASP, auth flows",
    icon: FaLock,
  },
  {
    id: "mobile",
    title: "Mobile",
    path: "/interview/mobile",
    description: "React Native, Android, iOS",
    icon: FaMobileAlt,
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    path: "/interview/ai-ml",
    description: "ML basics, LLMs, data pipelines",
    icon: FaRobot,
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    path: "/interview/data-engineering",
    description: "ETL, Spark, pipelines",
    icon: FaChartLine,
  },
  {
    id: "low-level-design",
    title: "Low-Level Design",
    path: "/interview/lld",
    description: "OOP, SOLID, design patterns",
    icon: FaTerminal,
  },
  {
    id: "behavioral",
    title: "Behavioral / HR",
    path: "/interview/hr",
    description: "HR, culture fit, STAR method",
    icon: FaBriefcase,
  },
];
