import { forwardRef, useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

/* ---------- Button ---------- */
export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = { sm: "h-9 px-3.5 text-[13px]", md: "h-11 px-5 text-sm" };
  const variants = {
    primary: "bg-primary text-primary-fg hover:bg-primary-hover shadow-sm shadow-primary/20",
    accent: "bg-accent text-accent-fg hover:brightness-105 shadow-sm shadow-accent/25",
    ghost: "text-ink-soft hover:bg-primary-soft hover:text-primary",
    outline: "border border-hairline bg-white text-ink hover:border-primary/40 hover:text-primary",
    danger: "bg-status-red-soft text-status-red hover:bg-status-red hover:text-white",
    success: "bg-status-green-soft text-status-green hover:bg-status-green hover:text-white",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {icon}
      {children}
    </button>
  );
}

/* ---------- Field / Input ---------- */
export function Field({ label, hint, children, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      {label && <span className="text-[13px] font-semibold text-ink">{label}</span>}
      {children}
      {hint && <span className="text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-hairline bg-white px-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";

export const Input = forwardRef(function Input({ className = "", ...rest }, ref) {
  return <input ref={ref} className={`${inputCls} ${className}`} {...rest} />;
});

export function PasswordInput(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input type={show ? "text" : "password"} className={`${inputCls} pr-11`} {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-md text-ink-faint hover:text-primary"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}

export function Select({ className = "", children, ...rest }) {
  return (
    <div className="relative">
      <select className={`${inputCls} appearance-none pr-10 ${className}`} {...rest}>
        {children}
      </select>
      <ChevronDown
        size={17}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
      />
    </div>
  );
}

export function Textarea({ className = "", ...rest }) {
  return (
    <textarea
      className={`min-h-[96px] w-full rounded-lg border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 ${className}`}
      {...rest}
    />
  );
}

/* ---------- Card ---------- */
export function Card({ children, className = "", as: As = "div", ...rest }) {
  return (
    <As
      className={`rounded-[12px] border border-hairline bg-white shadow-[0_1px_2px_rgba(26,29,51,0.04),0_8px_24px_-16px_rgba(26,29,51,0.12)] ${className}`}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ---------- Status Badge ---------- */
const statusMap = {
  Present: "bg-status-green-soft text-status-green",
  Approved: "bg-status-green-soft text-status-green",
  Active: "bg-status-green-soft text-status-green",
  Pending: "bg-status-amber-soft text-status-amber",
  "Half-day": "bg-status-amber-soft text-status-amber",
  Absent: "bg-status-red-soft text-status-red",
  Rejected: "bg-status-red-soft text-status-red",
  Leave: "bg-status-gray-soft text-status-gray",
  "On leave": "bg-status-gray-soft text-status-gray",
};

export function StatusBadge({ status, className = "" }) {
  const dot = {
    green: "bg-status-green",
    amber: "bg-status-amber",
    red: "bg-status-red",
    gray: "bg-status-gray",
  };
  const tone = statusMap[status].includes("green")
    ? "green"
    : statusMap[status].includes("amber")
    ? "amber"
    : statusMap[status].includes("red")
    ? "red"
    : "gray";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusMap[status]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[tone]}`} />
      {status}
    </span>
  );
}

/* ---------- Avatar ---------- */
export function Avatar({ name, src, size = 40 }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover bg-primary-soft"
      />
    );
  }
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className="grid place-items-center rounded-full bg-primary-soft font-bold text-primary"
    >
      {initials}
    </span>
  );
}

/* ---------- Section label ---------- */
export function Eyebrow({ children }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">
      {children}
    </span>
  );
}

/* ---------- Logo ---------- */
export function Logo({ compact = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-primary text-primary-fg shadow-sm shadow-primary/30">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 13.5 9 18.5 20 6"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6" cy="7" r="2" fill="var(--color-accent)" />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-[19px] font-extrabold tracking-tight text-ink">
          Dayflow
        </span>
      )}
    </span>
  );
}