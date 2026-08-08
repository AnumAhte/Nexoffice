import {
  AutomationIcon,
  BarsIcon,
  CanvasIcon,
  CartIcon,
  ChipIcon,
  CodeIcon,
  GridIcon,
  LinkIcon,
} from '@/components/icons';
import type { Service } from '@/types';

/**
 * Eight practices. The accent runs purple → blue → cyan down the grid, matching
 * the design's ordering.
 */
export const services: Service[] = [
  {
    icon: CodeIcon,
    title: 'Custom Web Development',
    body: 'Next.js applications with server rendering, typed APIs, and page loads that hold under real traffic.',
    accent: 'purple',
  },
  {
    icon: ChipIcon,
    title: 'AI Solutions',
    body: 'RAG pipelines, agents, and copilots grounded in your own documents and business rules.',
    accent: 'purple',
  },
  {
    icon: GridIcon,
    title: 'ERP Systems',
    body: 'Finance, inventory, and production modules that share one schema and one source of truth.',
    accent: 'purple',
  },
  {
    icon: BarsIcon,
    title: 'SaaS Development',
    body: 'Multi-tenant products with billing, roles, and usage metering built in from the first release.',
    accent: 'purple',
  },
  {
    icon: CartIcon,
    title: 'E-commerce Solutions',
    body: 'Storefronts, payment rails, and fulfilment logic tuned for conversion and margin visibility.',
    accent: 'blue',
  },
  {
    icon: AutomationIcon,
    title: 'Automation',
    body: 'Back-office workflows, scheduled jobs, and integrations that remove the spreadsheet in the middle.',
    accent: 'blue',
  },
  {
    icon: LinkIcon,
    title: 'API Development',
    body: 'Versioned REST and GraphQL services with auth, rate limits, and documentation your partners can read.',
    accent: 'cyan',
  },
  {
    icon: CanvasIcon,
    title: 'UI/UX Design',
    body: 'Interface systems, design tokens, and prototypes that get tested with users before code starts.',
    accent: 'cyan',
  },
];
