import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { footerColumns, site, socialLinks } from '@/data/site';
import { cn } from '@/lib/utils';

const COLUMN_TITLE =
  'text-[13px] font-bold tracking-[0.14em] uppercase text-fg-label';
const COLUMN_LINK =
  'text-[14.5px] text-fg-nav transition-colors duration-[250ms] ease-native hover:text-white';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-1 border-t border-white/[0.08] bg-[rgba(4,4,10,0.7)]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[34px] px-6 pt-[52px] pb-[30px]">
        <div>
          <Logo gradientId="nexFoot" size="footer" />
          <p className="mt-4 max-w-[280px] text-sm leading-[1.65] text-fg-footer">
            Custom software, AI systems, and ERP platforms for businesses that
            need software to hold weight.
          </p>
        </div>

        {footerColumns.map((column) => (
          <nav
            key={column.title}
            aria-labelledby={`footer-${column.title.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <h2
              id={`footer-${column.title.replace(/\s+/g, '-').toLowerCase()}`}
              className={COLUMN_TITLE}
            >
              {column.title}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link href={link.href} className={COLUMN_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className={COLUMN_TITLE}>Elsewhere</h2>
          <ul className="mt-4 flex gap-2.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const isExternal = social.href.startsWith('http');

              return (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    aria-label={
                      isExternal
                        ? `${social.label} (opens in a new tab)`
                        : social.label
                    }
                    {...(isExternal && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    className={cn(
                      'flex size-[42px] items-center justify-center rounded-xl border border-white/[0.12] bg-white/5 text-fg-social transition-colors duration-[250ms] ease-native hover:text-white',
                      social.hoverClass,
                    )}
                  >
                    <Icon className="size-[19px] fill-current" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-white/[0.06] px-6 pt-5 pb-[34px]">
        <p className="text-[13px] text-fg-faint">
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="text-[13px] text-fg-faint">
          {site.location} · {site.email}
        </p>
      </div>
    </footer>
  );
}
