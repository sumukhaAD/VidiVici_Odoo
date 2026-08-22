export function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-1 font-display text-[24px] font-extrabold tracking-tight text-ink">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}