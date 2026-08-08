/**
 * Minimal class-name joiner. Keeps conditional Tailwind lists readable without
 * pulling in a dependency for what is a three-line utility.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

const NUMBER_WORDS = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
];

/**
 * Spells small counts so the portfolio heading stays correct — and stays
 * written the way the design writes it — when projects are added or removed.
 */
export function numberWord(count: number): string {
  return NUMBER_WORDS[count] ?? String(count);
}

/** Two-letter initials for testimonial avatars ("Sara Khan" -> "SK"). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}
