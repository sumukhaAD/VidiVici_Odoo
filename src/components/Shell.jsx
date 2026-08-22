import { useEffect, useRef, useState } from "react";
import { LogOut, ChevronDown, Bell, User } from "lucide-react";
import { Logo, Avatar, StatusBadge } from "./ui";

export function Shell({
  role,
  user,
  nav,
  active,
  onNavigate,
  onMyProfile,
  onLogout,
  children,
}) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <TopNav
        role={role}
        user={user}
        nav={nav}
        active={active}
        onNavigate={onNavigate}
        onMyProfile={onMyProfile}
        onLogout={onLogout}
      />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function TopNav({ role, user, nav, active, onNavigate, onMyProfile, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-hairline bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-10">
        <button onClick={() => onNavigate(nav[0].key)} className="shrink-0">
          <Logo />
        </button>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => onNavigate(n.key)}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                active === n.key
                  ? "bg-primary-soft text-primary"
                  : "text-ink-soft hover:bg-primary-soft/60 hover:text-primary"
              }`}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <span className="hidden rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary sm:inline">
            {role === "admin" ? "Admin / HR" : "Employee"}
          </span>
          <button className="relative grid h-10 w-10 place-items-center rounded-lg text-ink-soft hover:bg-primary-soft hover:text-primary">
            <Bell size={19} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-white" />
          </button>

          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-primary-soft/60"
            >
              <span className="relative">
                <Avatar name={user.name} src={user.avatar} size={34} />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-status-green ring-2 ring-white" />
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-[13px] font-semibold leading-tight text-ink">{user.name}</span>
                <span className="block text-[11px] leading-tight text-ink-faint">{user.role}</span>
              </span>
              <ChevronDown size={15} className={`text-ink-faint transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-60 overflow-hidden rounded-xl border border-hairline bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(26,29,51,0.25)]">
                <div className="flex items-center gap-3 px-2.5 py-2.5">
                  <Avatar name={user.name} src={user.avatar} size={40} />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-ink">{user.name}</p>
                    <p className="truncate text-xs text-ink-faint">{user.email}</p>
                  </div>
                </div>
                <div className="px-2.5 pb-2">
                  <StatusBadge status={user.status} />
                </div>
                <div className="my-1 h-px bg-hairline" />
                <button
                  onClick={() => {
                    setOpen(false);
                    onMyProfile();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-soft hover:bg-primary-soft hover:text-primary"
                >
                  <User size={16} />
                  My Profile
                </button>
                <div className="my-1 h-px bg-hairline" />
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-status-red hover:bg-status-red-soft"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-hairline px-3 py-2 md:hidden">
        {nav.map((n) => (
          <button
            key={n.key}
            onClick={() => onNavigate(n.key)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors ${
              active === n.key
                ? "bg-primary-soft text-primary"
                : "text-ink-soft hover:bg-primary-soft/60 hover:text-primary"
            }`}
          >
            {n.icon}
            {n.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

/* Shared page header */
export function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-faint">{eyebrow}</span>
        )}
        <h1 className="mt-1 font-display text-[26px] font-extrabold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}