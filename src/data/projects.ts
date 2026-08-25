export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  team?: string;
  year: string;
  images: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Gestion complète d'une cité",
    category: "Application Web",
    description:
      "Application développée en équipe pour assurer la gestion complète d'une cité privée : résidents, organisation, services et gestion administrative.",
    tags: ["Express.js", "PostgreSQL"],
    team: "NDAO",
    year: "2026",
    images: [
      "/assets/images/rdi-1.png",
      "/assets/images/rdi-2.png",
      
    ],
  },
  {
    id: 2,
    title: "Gestion de restaurant",
    category: "Application Mobile",
    description:
      "Application développée en équipe pour gérer les opérations d'un restaurant et faciliter la communication entre les serveurs, la cuisine et la caisse.",
    tags: ["Dart"],
    team: "NDAO",
    year: "2026",
    images: [
      "/assets/images/restaurant-1.png",
      "/assets/images/restaurant-2.png",
      "/assets/images/restaurant-3.png",
    ],
  },
  {
    id: 3,
    title: "VITA'NOW",
    category: "Application Web",
    description:
      "Application conçue pour aider les utilisateurs à rester motivés, terminer leurs projets et lutter contre la procrastination grâce à un accompagnement orienté objectifs et progression.",
    tags: ["Next.js", "PostgreSQL"],
    team: "AURA++",
    year: "2025–2026",
    images: [
      "/assets/images/vitanow-1.png",
      "/assets/images/vitanow-2.png",
      "/assets/images/vitanow-3.png",
    ],
  },
  {
    id: 4,
    title: "Gestion d'agence et de freelances",
    category: "Application Web",
    description:
      "Application web développée durant mon stage chez PixelRise pour gérer une agence et ses freelances.",
    tags: ["React.js", "PHP", "Laravel"],
    team: "PixelRise",
    year: "2024–2025",
    images: [
      "/assets/images/pixelrise-1.png",
      "/assets/images/pixelrise-2.png",
      "/assets/images/pixelrise-3.png",
    ],
  },
  {
    id: 5,
    title: "Gestion de rendez-vous médicaux",
    category: "Application Web",
    description:
      "Application permettant aux utilisateurs de prendre et de gérer leurs rendez-vous médicaux en ligne.",
    tags: ["Java", "PostgreSQL"],
    team: "ENI",
    year: "2025–2026",
    images: [
      "/assets/images/medical-1.png",
      "/assets/images/medical-2.png",
      "/assets/images/medical-3.png",
    ],
  },
];