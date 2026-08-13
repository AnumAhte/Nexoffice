import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * One field styling for every control, so the select matches the inputs the
 * design specifies rather than introducing a second look.
 */
const FIELD_CLASS =
  'rounded-xl border border-white/[0.12] bg-[rgba(8,8,20,0.6)] px-[15px] py-[13px] text-[14.5px] text-white placeholder:text-fg-faint focus:border-nex-violet/70 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.22)] focus:outline-none focus-visible:outline-none';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: 'text' | 'email' | 'tel';
  /** Renders a `<textarea>` with this many rows instead of an `<input>`. */
  rows?: number;
  /** Renders a `<select>` with these choices; `placeholder` labels the empty one. */
  options?: readonly string[];
  autoComplete?: string;
}

/**
 * Label, control and a reserved error slot. The 15px minimum height on the
 * message line keeps the form from reflowing when validation appears.
 */
export function FormField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  rows,
  options,
  autoComplete,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[13px] font-semibold text-fg-nav">
        {label}
      </label>

      {options ? (
        <div className="relative">
          <select
            {...shared}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
              FIELD_CLASS,
              // Native arrow removed so the chevron below can match the design's
              // icon language; extra right padding keeps text clear of it.
              'w-full cursor-pointer appearance-none pr-11',
              value ? 'text-white' : 'text-fg-faint',
            )}
          >
            <option value="" className="bg-[#0a0a18] text-fg-faint">
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-[#0a0a18] text-white"
              >
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-[15px] size-[18px] -translate-y-1/2 text-fg-nav"
            aria-hidden
          />
        </div>
      ) : rows ? (
        <textarea
          {...shared}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={rows}
          onChange={(event) => onChange(event.target.value)}
          className={cn(FIELD_CLASS, 'resize-y')}
        />
      ) : (
        <input
          {...shared}
          placeholder={placeholder}
          autoComplete={autoComplete}
          type={type}
          onChange={(event) => onChange(event.target.value)}
          className={FIELD_CLASS}
        />
      )}

      <span id={errorId} className="min-h-[15px] text-[12.5px] text-danger">
        {error}
      </span>
    </div>
  );
}
