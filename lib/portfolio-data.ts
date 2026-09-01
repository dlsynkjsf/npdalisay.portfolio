export const personal = {
  name: 'Nikolas Josef P. Dalisay',
  shortName: 'Nikolas Dalisay',
  role: 'Full-Stack Developer',
  email: 'npdalisay@gmail.com',
  location: 'Bulacan, Philippines',
  availability: 'Available for opportunities!',
  linkedin: 'https://www.linkedin.com/in/npdalisay/',
  github: 'https://github.com/dlsynkjsf',
  resume: '/assets/Dalisay, Nikolas Josef - Resume.pdf',
};

export const aboutCopy = [
  'I focus on translating complex requirements into seamless digital experiences, ensuring every detail is thoughtfully designed — from the underlying database schema to the final user interaction.',
  'My recent work spans AI-assisted data engineering, multi-modal machine learning, discord bots, and client-facing business systems. I am at my best when I can connect technical architecture, product thinking, and clear collaboration.',
  'Outside of work and classes, you will see me dive into open-world games like Wuthering Waves, catching up on the latest contents from Stray Kids and RIIZE, or just doomscrolling through Tiktok and Reddit...',
];

export const skillGroups = [
  {
    label: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'Dart', 'HTML', 'CSS'],
  },
  {
    label: 'Frameworks & Runtime',
    skills: ['React', 'Node.js', 'Spring Boot', 'Flutter', 'Tailwind CSS'],
  },
  {
    label: 'Cloud, Data & DevOps',
    skills: ['AWS', 'Firebase', 'Supabase', 'Vercel', 'PostgreSQL', 'MySQL', 'Docker', 'Git'],
  },
  {
    label: 'Tools, Design & Productivity',
    skills: ['Postman', 'Bruno', 'n8n', 'Figma', 'Canva', 'Adobe Premiere Pro', 'Google Workspace', 'Microsoft Office'],
  },
];

export const education = [
  {
    period: '2023 — Present',
    school: 'University of Santo Tomas',
    program: 'Bachelor of Science in Computer Science (Data Science Track)',
    detail: 'Current GWA: 1.179 · DOST Merit Scholar',
  },
  {
    period: '2023',
    school: 'Immaculate Conception Child Development Center, Inc.',
    program: 'Science, Technology, Engineering, and Mathematics',
    detail: 'With High Honors',
  },
];

export const experience = [
  {
    period: 'May — Aug 2026',
    role: 'Data Modeling Intern',
    organization: 'Eskwelabs',
    detail:
      'Architected an AI-driven course proposal with n8n and Google Workspace, translating iterative research into a production-ready data engineering framework.',
  },
  {
    period: 'Aug 2026 — Present',
    role: 'Auditor',
    organization: 'Computer Science Society · UST',
    detail:
      'Audits financial records, event budgets, and expenditure reports to maintain transparency and compliance with university guidelines.',
  },
  {
    period: 'Aug 2025 — May 2026',
    role: '3rd-Year Level Representative',
    organization: 'Computer Science Society · UST',
    detail:
      'Represented student concerns and led departmental initiatives including CodeSprint, the CS Research Colloquium, and OlympiCSS.',
  },
  {
    period: 'Sep 2024 — May 2025',
    role: 'Executive Associate',
    organization: 'Computer Science Society · UST',
    detail:
      'Supported student advocacy and coordinated planning, logistics, and delivery for batch-wide academic events.',
  },
];

export type Project = {
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  stack: string[];
  challenge: string;
  role: string;
  approach: string;
  outcome: string;
  status: 'Private';
  image?: string;
  repositoryUrl?: string;
  websiteUrl?: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    number: '01',
    title: 'SeePAT',
    subtitle: 'Multi-modal synthetic media forensics',
    summary:
      'A thesis-led forensic framework that studies biological speech constraints and micro-temporal sync gaps to support synthetic media analysis.',
    stack: ['Python', 'Machine Learning', 'Neural Networks', 'Computer Vision', 'NLP'],
    challenge:
      'Synthetic media detection needs signals that remain useful as generation models improve. The project investigates biological timing constraints as a harder-to-fake forensic clue.',
    role: 'Project leader responsible for research direction, system framing, coordination, and end-to-end development.',
    approach:
      'Combine audio-visual feature extraction with multi-modal analysis, then evaluate micro-temporal inconsistencies against biologically grounded speech behavior.',
    outcome:
      'Research and implementation are ongoing. Evaluation metrics, findings, and publication details will be added as the study progresses.',
    status: 'Private',
    image: '/assets/projects/seepat-cover.webp',
    repositoryUrl: 'https://github.com/dlsynkjsf/SeePAT',
  },
  {
    number: '02',
    title: 'MaridOne',
    subtitle: 'HRIS and payroll management system',
    summary:
      'A secure, custom HR and payroll platform created for Marid Industries with a modern React interface and a structured Spring Boot backend.',
    stack: ['React', 'Spring Boot', 'PostgreSQL'],
    challenge:
      'Translate an organization’s payroll and HR processes into a maintainable system while preserving accuracy, security, and alignment with client expectations.',
    role: 'Project leader overseeing technical delivery, client communication, and the complete software development lifecycle.',
    approach:
      'Model business rules in a Java service layer, use PostgreSQL for durable records, and build task-focused React interfaces for day-to-day operations.',
    outcome:
      'Delivered through final defense with a secure backend, modern frontend, and consistent client alignment throughout development.',
    status: 'Private',
    image: '/assets/projects/maridone-cover.png',
    websiteUrl: 'https://marid.global/',
  },
  {
    number: '03',
    title: 'ShopZada',
    subtitle: 'Data warehousing project',
    summary:
      'An academic data warehousing solution designed to consolidate scattered departmental records into a unified, reliable system.',
    stack: ['Python', 'PostgreSQL', 'Docker', 'Apache Airflow', 'Data Warehousing'],
    challenge:
      'Consolidating fragmented data from various departments into a single source of truth while ensuring the infrastructure remains highly scalable and easy to deploy.',
    role: 'Project leader directing the end-to-end design, development, and team coordination.',
    approach:
      'Modeled the data warehouse using the Kimball dimensional methodology and architected a fully containerized environment using Docker Compose and PostgreSQL.',
    outcome:
      'Successfully delivered a unified data system with a highly scalable, containerized architecture that ensures consistent deployment.',
    status: 'Private',
    image: '/assets/projects/shopzada-cover.png',
    repositoryUrl: 'https://github.com/dlsynkjsf/dwh_finalproject_3csd_group_octobots',
    websiteUrl: 'https://app.powerbi.com/links/XN4sIE0wZC?ctid=2840082d-702c-4fb1-9885-abddd1ddaa1e&pbi_source=linkShare',
  },
  {
    number: '04',
    title: 'BoneAppetite',
    subtitle: 'Dog-friendly restaurant locator',
    summary:
      'A responsive web application built during DLSU HackerCup 2025 that helps pet owners discover dog-friendly dining options across the Philippines.',
    stack: ['JavaScript', 'Tailwind CSS', 'Supabase'],
    challenge:
      'Addressing the lack of accessible, centralized information regarding pet-friendly dining options while delivering a functional prototype under strict hackathon time constraints.',
    role: 'Frontend Developer responsible for prototyping and delivering an intuitive, user-focused web interface.',
    approach:
      'Leveraged JavaScript and Tailwind CSS for rapid frontend development, integrating with Supabase to manage and retrieve location and amenity data seamlessly.',
    outcome:
      'Prototyped and delivered a highly responsive, centralized platform during the hackathon, providing a valuable tool for pet owners.',
    status: 'Private',
    image: '/assets/projects/boneappetite-cover.webp',
    repositoryUrl: 'https://github.com/crstntaro/SajaBoysRepo',
    websiteUrl: 'https://crstntaro.github.io/SajaBoysRepo/',
  }
];
