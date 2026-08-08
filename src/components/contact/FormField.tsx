import { cn } from '@/lib/utils';

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
  autoComplete,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    placeholder,
    autoComplete,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={id} className="text-[13px] font-semibold text-fg-nav">
        {label}
      </label>

      {rows ? (
        <textarea
          {...shared}
          rows={rows}
          onChange={(event) => onChange(event.target.value)}
          className={cn(FIELD_CLASS, 'resize-y')}
        />
      ) : (
        <input
          {...shared}
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
