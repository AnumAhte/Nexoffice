import type { Project } from '@/types';

/**
 * Single source of truth for the portfolio carousel.
 *
 * To add a project: append an entry with a unique `id`. To remove one: delete
 * its entry. Nothing else needs to change — the carousel, the arrows, the
 * auto-advance and the a11y labelling all derive from this array.
 *
 * To show a real screenshot, drop the file into `public/projects/` and set
 * `image: '/projects/<file>'` together with a descriptive `imageAlt`. Without
 * an image the card falls back to the branded gradient slot from the design.
 */
export const projects: Project[] = [
  {
    id: 'grocery-ecommerce',
    title: 'Grocery E-commerce Platform',
    description:
      'Same-day grocery ordering with slot-based delivery, live stock sync, and a packer app for the warehouse floor.',
    tags: ['Next.js', 'Supabase', 'Stripe'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'ai-erp',
    title: 'AI ERP System',
    description:
      'Manufacturing ERP where procurement and production planning are drafted by an agent and approved by humans.',
    tags: ['FastAPI', 'PostgreSQL', 'OpenAI'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'ai-employee',
    title: 'AI Employee',
    description:
      'A back-office agent that reads inboxes, files documents, and answers process questions from company policy.',
    tags: ['Python', 'LangGraph', 'Redis'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'influencer-marketplace',
    title: 'Influencer Marketplace',
    description:
      'Two-sided platform matching brands with creators, with campaign briefs, escrow payments, and performance reporting.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management System',
    description:
      'Multi-warehouse stock control with barcode intake, reorder thresholds, and audit-ready movement history.',
    tags: ['React', 'FastAPI', 'PostgreSQL'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'rag-textbook',
    title: 'Physical AI Textbook (RAG)',
    description:
      'Retrieval-grounded study companion that answers from the textbook only and cites the page it used.',
    tags: ['Python', 'pgvector', 'OpenAI'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'todo-ai-chatbot',
    title: 'Advanced Todo App with AI Chatbot',
    description:
      'Task manager with natural-language capture, automatic scheduling, and a chatbot that reorganises your week.',
    tags: ['Next.js', 'Tailwind', 'OpenAI'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'clinic-management',
    title: 'Clinic Management Website',
    description:
      'Appointments, patient records, and prescription history with role separation for doctors and front desk.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'weather-app',
    title: 'Weather Application',
    description:
      'Location-aware forecasts with hourly precipitation bands, saved cities, and offline caching.',
    tags: ['React', 'TypeScript', 'Vercel'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
  {
    id: 'password-generator',
    title: 'Strong Password Generator',
    description:
      'Entropy-scored generator with passphrase mode, clipboard auto-clear, and no network calls.',
    tags: ['TypeScript', 'Web Crypto', 'Tailwind'],
    demoUrl: '#contact',
    repoUrl: '#contact',
  },
];

/** Carousel behaviour, exposed as props in the design's component panel. */
export const carouselConfig = {
  autoSlide: true,
  autoSlideMs: 3800,
} as const;
