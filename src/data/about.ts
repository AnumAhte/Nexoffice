import { CrosshairIcon, EyeIcon, SparkIcon } from '@/components/icons';
import type { Pillar, ProcessStep } from '@/types';

export const pillars: Pillar[] = [
  {
    icon: CrosshairIcon,
    title: 'Mission',
    body: 'Give growing businesses the kind of software infrastructure that used to be reserved for enterprises: reliable, automated, and built to be extended.',
    accent: 'purple',
  },
  {
    icon: EyeIcon,
    title: 'Vision',
    body: 'A future where every operational team runs on systems that think alongside them, where routine decisions are handled and people focus on judgement.',
    accent: 'blue',
  },
  {
    icon: SparkIcon,
    title: 'How we work',
    body: 'Two-week delivery cycles, a staging environment from day one, and written architecture decisions you keep whether or not you keep working with us.',
    accent: 'cyan',
  },
];

export const processSteps: ProcessStep[] = [
  {
    label: '01 · DISCOVER',
    body: 'We map the current process, the data behind it, and the cost of the manual steps before proposing anything.',
    accent: 'violet',
  },
  {
    label: '02 · DESIGN',
    body: 'Interface and schema are designed together, so the screens and the data model never drift apart.',
    accent: 'periwinkle',
  },
  {
    label: '03 · BUILD',
    body: 'Typed end to end, tested where it matters, reviewed every sprint with the people who will use it daily.',
    accent: 'sky',
  },
  {
    label: '04 · OPERATE',
    body: 'Monitoring, cost tuning, and an agreed support window after launch. Handover includes documentation, not a call.',
    accent: 'cyan',
  },
];
