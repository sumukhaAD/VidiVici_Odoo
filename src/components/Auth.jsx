import { useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { Button, Field, Input, PasswordInput, Logo, Eyebrow } from "./ui";

function AuthShell({ children }) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Left brand panel */}
      <aside className="relative hidden overflow-hidden bg-primary px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            background:
              "radial-gradient(600px 400px at 15% 10%, rgba(242,153,74,0.35), transparent 60%), radial-gradient(700px 500px at 90% 100%, rgba(255,255,255,0.12), transparent 55%)",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-white/12 backdrop-blur">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M4 13.5 9 18.5 20 6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="7" r="2" fill="#F2994A" />
              </svg>
            </span>
            <span className="font-display text-[19px] font-extrabold tracking-tight">Dayflow</span>
          </span>
        </div>
        <div className="relative max-w-md">
          <Eyebrow>
            <span className="text-accent">Human Resource Management</span>
          </Eyebrow>
          <h1 className="mt-4 font-display text-[42px] font-extrabold leading-[1.05] tracking-tight">
            Every workday, perfectly aligned.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Onboarding, attendance, time-off and payroll — one calm workspace for your whole team.
          </p>
          <ul className="mt-8 space-y-3">
            {["Role-based access for HR & employees", "Daily and weekly attendance tracking", "Leave approvals that reflect instantly"].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-white/85">
                <CheckCircle2 size={18} className="text-accent" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-white/45">© 2026 Dayflow, Inc. · People operations, simplified.</p>
      </aside>

      {/* Right form panel */}
      <main className="flex min-h-screen flex-col bg-canvas px-5 py-10 sm:px-6 lg:min-h-0">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
        <AuthFooter />
      </main>
    </div>
  );
}

function AuthFooter() {
  const links = ["Privacy Policy", "Terms of Service", "Help & Support", "Contact"];
  return (
    <div className="mx-auto mt-12 w-full max-w-[520px] text-center">
      <div className="h-px w-full bg-hairline" />
      <div className="mt-6 flex items-center justify-center">
        <Logo />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {links.map((l) => (
          <button
            key={l}
            type="button"
            className="text-xs font-medium text-ink-faint transition-colors hover:text-primary"
          >
            {l}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-faint">© 2026 Dayflow. All rights reserved.</p>
    </div>
  );
}

export function SignIn({ onSignIn, onGoSignUp }) {
  const [role, setRole] = useState("employee");
  return (
    <AuthShell>
      <div className="mb-8 lg:hidden">
        <Logo />
      </div>
      <Eyebrow>Welcome back</Eyebrow>
      <h2 className="mt-2 font-display text-[28px] font-extrabold tracking-tight text-ink">Sign in to Dayflow</h2>
      <p className="mt-1.5 text-sm text-ink-soft">Enter your credentials to reach your dashboard.</p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSignIn(role);
        }}
      >
        <Field label="Login ID or Email">
          <Input placeholder="DF-2041 or you@company.co" defaultValue="DF-2041" autoComplete="username" />
        </Field>
        <Field label="Password" hint={<span className="text-primary font-semibold cursor-pointer">Forgot password?</span>}>
          <PasswordInput placeholder="••••••••" defaultValue="password" autoComplete="current-password" />
        </Field>

        <div>
          <span className="mb-1.5 block text-[13px] font-semibold text-ink">Sign in as</span>
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-hairline bg-white p-1">
            {["employee", "admin"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`h-9 rounded-md text-[13px] font-semibold capitalize transition-colors ${
                  role === r ? "bg-primary text-white" : "text-ink-soft hover:text-primary"
                }`}
              >
                {r === "admin" ? "Admin / HR" : "Employee"}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        New company on Dayflow?{" "}
        <button onClick={onGoSignUp} className="font-semibold text-primary hover:underline">
          Create an account
        </button>
      </p>
    </AuthShell>
  );
}

export function SignUp({ onSignUp, onGoSignIn }) {
  const [logo, setLogo] = useState(null);
  return (
    <AuthShell>
      <div className="mb-8 lg:hidden">
        <Logo />
      </div>
      <Eyebrow>HR onboarding</Eyebrow>
      <h2 className="mt-2 font-display text-[28px] font-extrabold tracking-tight text-ink">
        Create your Dayflow account
      </h2>
      <p className="mt-1.5 text-sm text-ink-soft">Set up your company workspace.</p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          onSignUp();
        }}
      >
        <Field label="Company Name">
          <div className="flex items-center gap-2.5">
            <Input placeholder="Northwind Studio" className="flex-1" />
            <label
              className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg border border-hairline bg-white text-ink-soft transition-colors hover:border-primary hover:text-primary"
              title="Upload company logo"
            >
              {logo ? (
                <img src={logo} alt="Company logo" className="h-full w-full object-cover" />
              ) : (
                <Upload size={17} />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setLogo(URL.createObjectURL(f));
                }}
              />
            </label>
          </div>
        </Field>

        <Field label="Name">
          <Input placeholder="Jordan Avery" />
        </Field>
        <Field label="Email">
          <Input type="email" placeholder="jordan@northwind.co" />
        </Field>
        <Field label="Phone">
          <Input placeholder="+1 (415) 000-0000" />
        </Field>
        <Field label="Password">
          <PasswordInput placeholder="••••••••" />
        </Field>
        <Field label="Confirm Password">
          <PasswordInput placeholder="••••••••" />
        </Field>

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <button onClick={onGoSignIn} className="font-semibold text-primary hover:underline">
          Sign In
        </button>
      </p>
    </AuthShell>
  );
}