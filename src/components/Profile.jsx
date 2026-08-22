import { useState } from "react";
import {
  FileText, Download, Pencil, Lock, Mail, Phone, MapPin, Briefcase,
  Building, User, Wallet, Calculator, ShieldCheck, Monitor,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, CartesianGrid } from "recharts";
import { Button, Card, StatusBadge, Avatar, Field, Input, PasswordInput } from "./ui";
import { PageHeader } from "./PageHeader";

function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function Profile({ user, role, viewOnly = false }) {
  const [editing, setEditing] = useState(false);
  const isAdmin = role === "admin";
  const canEditAll = isAdmin && !viewOnly;
  const showSalaryTab = isAdmin;
  const showSecurityTab = role === "employee" && !viewOnly;
  const [tab, setTab] = useState("resume");

  const documents = [
    { name: "Offer Letter.pdf", size: "212 KB", date: "Mar 2022" },
    { name: "ID Verification.pdf", size: "1.1 MB", date: "Mar 2022" },
    { name: "Form 16.pdf", size: "88 KB", date: "Jan 2026" },
    { name: "NDA Agreement.pdf", size: "340 KB", date: "Mar 2022" },
  ];

  const lockedFor = (field) => viewOnly || (!canEditAll && field === "all");
  const isEditing = editing && !viewOnly;

  const tabs = [
    { key: "resume", label: "Resume" },
    { key: "private", label: "Private Info" },
    ...(showSalaryTab ? [{ key: "salary", label: "Salary Info" }] : []),
    ...(showSecurityTab ? [{ key: "security", label: "Security" }] : []),
  ];
  const activeTab =
    (tab === "salary" && !showSalaryTab) || (tab === "security" && !showSecurityTab) ? "resume" : tab;

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title={viewOnly ? user.name : "Profile details"}
        subtitle={
          viewOnly
            ? `${user.role} · ${user.department} — view-only record`
            : canEditAll
            ? "As an admin you can edit every field for this employee."
            : "You can edit your address, phone and profile picture."
        }
        actions={
          viewOnly ? (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-status-gray-soft px-3 py-2 text-[13px] font-semibold text-status-gray">
              <Lock size={14} /> View only
            </span>
          ) : (
            <Button variant={editing ? "primary" : "outline"} icon={<Pencil size={15} />} onClick={() => setEditing((e) => !e)}>
              {editing ? "Save changes" : "Edit profile"}
            </Button>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar name={user.name} src={user.avatar} size={96} />
              {isEditing && (
                <label className="absolute -bottom-1 -right-1 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-primary text-white shadow-md">
                  <Pencil size={14} />
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              )}
            </div>
            <h2 className="mt-4 font-display text-[19px] font-extrabold text-ink">{user.name}</h2>
            <p className="text-sm text-ink-soft">{user.role}</p>
            <div className="mt-3">
              <StatusBadge status={user.status} />
            </div>
          </div>
          <div className="mt-6 space-y-3 border-t border-hairline pt-5 text-sm">
            {[
              { icon: <Mail size={15} />, v: user.email },
              { icon: <Phone size={15} />, v: user.phone },
              { icon: <MapPin size={15} />, v: user.location },
              { icon: <Building size={15} />, v: user.department },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 text-ink-soft">
                <span className="text-ink-faint">{r.icon}</span>
                <span className="truncate">{r.v}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-1 rounded-xl border border-hairline bg-white p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`h-10 rounded-lg px-4 text-[13px] font-semibold transition-colors ${
                  activeTab === t.key ? "bg-primary text-white shadow-sm shadow-primary/20" : "text-ink-soft hover:bg-primary-soft hover:text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "resume" && <ResumeTab user={user} documents={documents} />}

          {activeTab === "private" && (
            <>
              <DetailBlock title="Personal details" icon={<Mail size={16} />}>
                <DetailField label="Full name" value={user.name} editing={isEditing} locked={lockedFor("all")} />
                <DetailField label="Email" value={user.email} editing={isEditing} locked={lockedFor("all")} />
                <DetailField label="Phone" value={user.phone} editing={isEditing} locked={false} />
                <DetailField label="Address" value={user.address} editing={isEditing} locked={false} full />
              </DetailBlock>

              <DetailBlock title="Job details" icon={<Briefcase size={16} />}>
                <DetailField label="Login ID" value={user.loginId} editing={isEditing} locked />
                <DetailField label="Department" value={user.department} editing={isEditing} locked={lockedFor("all")} />
                <DetailField label="Role" value={user.role} editing={isEditing} locked={lockedFor("all")} />
                <DetailField label="Date joined" value={user.joined} editing={isEditing} locked={lockedFor("all")} />
              </DetailBlock>
            </>
          )}

          {activeTab === "salary" && showSalaryTab && <SalaryInfoTab user={user} />}
          {activeTab === "security" && showSecurityTab && <SecurityTab />}
        </div>
      </div>
    </>
  );
}

function ResumeTab({ user, documents }) {
  const skills = user.skills;
  const certifications = user.certifications;
  return (
    <>
      <Card className="p-6">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
            <User size={16} />
          </span>
          <h3 className="font-display text-[16px] font-bold text-ink">About</h3>
        </div>
        <p className="text-sm leading-relaxed text-ink-soft">{user.about}</p>
      </Card>

      <DetailBlock title="Skills" icon={<Briefcase size={16} />}>
        <div className="sm:col-span-2 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-full bg-primary-soft px-3 py-1.5 text-[13px] font-semibold text-primary">
              {s}
            </span>
          ))}
        </div>
      </DetailBlock>

      <Card className="overflow-hidden">
        <div className="border-b border-hairline px-6 py-4">
          <h3 className="font-display text-[16px] font-bold text-ink">Certifications</h3>
        </div>
        <ul className="divide-y divide-hairline">
          {certifications.map((c) => (
            <li key={c.name} className="flex items-center gap-4 px-6 py-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-status-green-soft text-status-green">
                <FileText size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{c.name}</p>
                <p className="text-xs text-ink-faint">{c.org}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-ink-faint">{c.year}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-hairline px-6 py-4">
          <h3 className="font-display text-[16px] font-bold text-ink">Documents</h3>
        </div>
        <ul className="divide-y divide-hairline">
          {documents.map((d) => (
            <li key={d.name} className="flex items-center gap-4 px-6 py-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-status-red-soft text-status-red">
                <FileText size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{d.name}</p>
                <p className="text-xs text-ink-faint">{d.size} · Uploaded {d.date}</p>
              </div>
              <button className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-primary-soft hover:text-primary">
                <Download size={17} />
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function SalaryInfoTab({ user }) {
  const monthWage = user.salary.base + user.salary.hra + user.salary.bonus;
  const yearWage = monthWage * 12;

  const amountOf = (r) => (r.type === "percent" ? Math.round((r.value / 100) * monthWage) : r.value);

  const components = [
    { label: "Basic", rule: { type: "percent", value: 50 } },
    { label: "House Rent Allowance", rule: { type: "percent", value: 20 } },
    { label: "Standard Allowance", rule: { type: "fixed", value: 4167 } },
    { label: "Performance Bonus", rule: { type: "percent", value: 8.33 } },
    { label: "Leave Travel Allowance", rule: { type: "percent", value: 8.33 } },
    { label: "Fixed Allowance", rule: { type: "fixed", value: 3500 } },
  ];

  const basicAmt = amountOf(components[0].rule);
  const pf = [
    { label: "Employee contribution", pct: 12, base: basicAmt },
    { label: "Employer contribution", pct: 12, base: basicAmt },
  ];
  const professionalTax = 200;

  return (
    <>
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
            <Wallet size={16} />
          </span>
          <h3 className="font-display text-[16px] font-bold text-ink">Wage</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Wage type">
            <Input defaultValue="Fixed wage" readOnly />
          </Field>
          <Field label="Working days / week">
            <Input defaultValue="5" />
          </Field>
          <Field label="Monthly wage">
            <Input defaultValue={String(monthWage)} />
          </Field>
          <Field label="Yearly wage">
            <Input defaultValue={String(yearWage)} readOnly />
          </Field>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-1 border-b border-hairline px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-display text-[16px] font-bold text-ink">Salary components</h3>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-faint">
            <Calculator size={13} /> Auto-calculated from wage
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-6 py-2 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
          <span>Component</span>
          <span className="w-32 text-right sm:w-40">Rule</span>
          <span className="w-28 text-right sm:w-32">Amount / mo</span>
        </div>
        <div className="divide-y divide-hairline">
          {components.map((c) => (
            <div key={c.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-6 py-3.5">
              <span className="text-sm font-medium text-ink">{c.label}</span>
              <span className="flex w-32 justify-end sm:w-40">
                <span className="rounded-md bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
                  {c.rule.type === "percent" ? `${c.rule.value}% of wage` : "Fixed amount"}
                </span>
              </span>
              <span className="w-28 text-right text-sm font-semibold tabular-nums text-ink sm:w-32">
                {formatINR(amountOf(c.rule))}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <Card className="overflow-hidden">
          <div className="border-b border-hairline px-6 py-4">
            <h3 className="font-display text-[16px] font-bold text-ink">Provident Fund (PF)</h3>
            <p className="text-xs text-ink-faint">Calculated on Basic ({formatINR(basicAmt)})</p>
          </div>
          <div className="divide-y divide-hairline">
            {pf.map((p) => (
              <div key={p.label} className="flex items-center justify-between px-6 py-3.5">
                <span className="text-sm font-medium text-ink">{p.label}</span>
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">{p.pct}% of Basic</span>
                  <span className="w-24 text-right text-sm font-semibold tabular-nums text-ink">
                    {formatINR(Math.round((p.pct / 100) * p.base))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-hairline px-6 py-4">
            <h3 className="font-display text-[16px] font-bold text-ink">Tax deductions</h3>
          </div>
          <div className="flex items-center justify-between px-6 py-3.5">
            <div>
              <p className="text-sm font-medium text-ink">Professional Tax</p>
              <p className="text-xs text-ink-faint">Statutory · deducted monthly</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">Fixed</span>
              <span className="w-24 text-right text-sm font-semibold tabular-nums text-ink">{formatINR(professionalTax)}</span>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function DetailBlock({ title, icon, children }) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">{icon}</span>
        <h3 className="font-display text-[16px] font-bold text-ink">{title}</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </Card>
  );
}

function DetailField({ label, value, editing, locked, full }) {
  if (editing && !locked) {
    return (
      <Field label={label} className={full ? "sm:col-span-2" : ""}>
        <Input defaultValue={value} />
      </Field>
    );
  }
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] font-semibold text-ink-soft">{label}</span>
        {editing && locked && <Lock size={11} className="text-ink-faint" />}
      </div>
      <p className="mt-0.5 text-sm text-ink">{value}</p>
    </div>
  );
}

function SecurityTab() {
  const [twoFactor, setTwoFactor] = useState(true);
  const sessions = [
    { device: "MacBook Pro · Chrome", where: "Mumbai, IN", when: "Active now", current: true },
    { device: "iPhone 15 · Safari", where: "Mumbai, IN", when: "2 hours ago", current: false },
  ];
  return (
    <>
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
            <Lock size={16} />
          </span>
          <h3 className="font-display text-[16px] font-bold text-ink">Change password</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Current password" className="sm:col-span-2">
            <PasswordInput placeholder="Enter current password" autoComplete="current-password" />
          </Field>
          <Field label="New password">
            <PasswordInput placeholder="Enter new password" autoComplete="new-password" />
          </Field>
          <Field label="Confirm new password">
            <PasswordInput placeholder="Re-enter new password" autoComplete="new-password" />
          </Field>
        </div>
        <div className="mt-5">
          <Button>Update password</Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
              <ShieldCheck size={16} />
            </span>
            <div>
              <h3 className="font-display text-[16px] font-bold text-ink">Two-factor authentication</h3>
              <p className="text-xs text-ink-faint">Add a verification step at sign-in.</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactor((t) => !t)}
            role="switch"
            aria-checked={twoFactor}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${twoFactor ? "bg-primary" : "bg-hairline"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${twoFactor ? "translate-x-[22px]" : "translate-x-0.5"}`} />
          </button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-hairline px-6 py-4">
          <h3 className="font-display text-[16px] font-bold text-ink">Active sessions</h3>
        </div>
        <ul className="divide-y divide-hairline">
          {sessions.map((s) => (
            <li key={s.device} className="flex items-center gap-4 px-6 py-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                <Monitor size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{s.device}</p>
                <p className="text-xs text-ink-faint">{s.where} · {s.when}</p>
              </div>
              {s.current ? (
                <StatusBadge status="Active" />
              ) : (
                <button className="text-[13px] font-semibold text-status-red hover:underline">Sign out</button>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

export function Payroll({ user, role }) {
  const isAdmin = role === "admin";
  const [edit, setEdit] = useState(false);
  const s = user.salary;
  const gross = s.base + s.hra + s.bonus;
  const net = gross - s.deductions;

  const slips = [
    { month: "August 2026", net, status: "Processing" },
    { month: "July 2026", net, status: "Paid" },
    { month: "June 2026", net, status: "Paid" },
    { month: "May 2026", net, status: "Paid" },
  ];

  const attendanceTrend = [
    { month: "Mar", present: 21 },
    { month: "Apr", present: 20 },
    { month: "May", present: 22 },
    { month: "Jun", present: 19 },
    { month: "Jul", present: 21 },
    { month: "Aug", present: 15 },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Payroll"
        title={isAdmin ? `Payroll · ${user.name}` : "My payroll"}
        subtitle={isAdmin ? "Edit the salary structure and review analytics." : "Your salary breakdown and payslips. This view is read-only."}
        actions={
          isAdmin ? (
            <Button variant={edit ? "primary" : "outline"} icon={<Pencil size={15} />} onClick={() => setEdit((e) => !e)}>
              {edit ? "Save structure" : "Edit structure"}
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-status-gray-soft px-3 py-2 text-[13px] font-semibold text-status-gray">
              <Lock size={14} /> Read-only
            </span>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <Card className="p-6">
          <h3 className="font-display text-[16px] font-bold text-ink">Salary structure</h3>
          <p className="text-xs text-ink-faint">Monthly · INR</p>
          <div className="mt-5 space-y-1">
            {[
              { label: "Base pay", value: s.base },
              { label: "House rent allowance", value: s.hra },
              { label: "Performance bonus", value: s.bonus },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-hairline py-3">
                <span className="text-sm text-ink-soft">{row.label}</span>
                {isAdmin && edit ? (
                  <div className="flex items-center">
                    <span className="mr-1 text-sm text-ink-faint">₹</span>
                    <Input defaultValue={String(row.value)} className="h-9 w-28 text-right" />
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-ink">{formatINR(row.value)}</span>
                )}
              </div>
            ))}
            <div className="flex items-center justify-between border-b border-hairline py-3">
              <span className="text-sm text-status-red">Deductions</span>
              {isAdmin && edit ? (
                <div className="flex items-center">
                  <span className="mr-1 text-sm text-ink-faint">-₹</span>
                  <Input defaultValue={String(s.deductions)} className="h-9 w-28 text-right" />
                </div>
              ) : (
                <span className="text-sm font-semibold text-status-red">-{formatINR(s.deductions)}</span>
              )}
            </div>
            <div className="flex items-center justify-between rounded-xl bg-primary-soft px-4 py-4">
              <div>
                <p className="text-[13px] font-semibold text-primary">Net monthly pay</p>
                <p className="text-xs text-primary/70">Gross {formatINR(gross)} − deductions</p>
              </div>
              <span className="font-display text-[26px] font-extrabold tracking-tight text-primary">{formatINR(net)}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="border-b border-hairline px-6 py-4">
              <h3 className="font-display text-[16px] font-bold text-ink">Salary slips</h3>
            </div>
            <ul className="divide-y divide-hairline">
              {slips.map((sl) => (
                <li key={sl.month} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-ink">{sl.month}</p>
                    <p className="text-xs text-ink-faint">Net {formatINR(sl.net)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={sl.status === "Paid" ? "Approved" : "Pending"} />
                    <button className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-primary-soft hover:text-primary">
                      <Download size={17} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {isAdmin && (
            <Card className="p-6">
              <h3 className="font-display text-[16px] font-bold text-ink">Attendance report</h3>
              <p className="text-xs text-ink-faint">Present days · last 6 months</p>
              <div className="mt-4 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceTrend} barSize={22}>
                    <CartesianGrid vertical={false} stroke="#e7e9f2" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9095a6", fontSize: 12 }} />
                    <Tooltip cursor={{ fill: "rgba(49,57,155,0.06)" }} contentStyle={{ borderRadius: 10, border: "1px solid #e7e9f2", fontSize: 12 }} />
                    <Bar dataKey="present" fill="#31399b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}