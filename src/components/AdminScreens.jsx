import { useState } from "react";
import {
  Users,
  Check,
  X,
  Plus,
  Search,
  ArrowRight,
  Copy,
  RefreshCw,
  UserCheck,
  CalendarCheck,
  Clock4,
  ChevronLeft,
  ChevronRight,
  PlaneTakeoff,
  Thermometer,
  MinusCircle,
} from "lucide-react";
import { Button, Card, StatusBadge, Avatar, Field, Input, Select } from "./ui";
import { PageHeader } from "./Shell";
// TODO: ./data doesn't exist yet — send data.ts so this has real employees/approvalQueue
import { employees, approvalQueue } from "./data";

/* ---------------- Admin Dashboard ---------------- */
export function AdminDashboard({ onViewEmployee }) {
  const [queue, setQueue] = useState(approvalQueue);
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.department.toLowerCase().includes(query.toLowerCase()) ||
      e.loginId.toLowerCase().includes(query.toLowerCase())
  );

  const decide = (id, status) =>
    setQueue((q) => q.map((r) => (r.id === id ? { ...r, status } : r)));

  const stats = [
    { label: "Total employees", value: employees.length, icon: <Users size={18} />, sub: "across 4 teams" },
    { label: "Present today", value: employees.filter((e) => e.todayStatus === "Present").length, icon: <UserCheck size={18} />, sub: "checked in" },
    { label: "On leave", value: employees.filter((e) => e.todayStatus === "Leave").length, icon: <CalendarCheck size={18} />, sub: "approved today" },
    { label: "Pending approvals", value: queue.filter((q) => q.status === "Pending").length, icon: <Clock4 size={18} />, sub: "need review" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Admin / HR"
        title="People overview"
        subtitle="Manage employees, attendance and leave approvals in one place."
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setAddOpen(true)}>
            Add employee
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                {s.icon}
              </span>
            </div>
            <p className="mt-4 font-display text-[30px] font-extrabold tracking-tight text-ink">{s.value}</p>
            <p className="text-[13px] font-semibold text-ink-soft">{s.label}</p>
            <p className="text-xs text-ink-faint">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-hairline px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-[16px] font-bold text-ink">Employees</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, team, ID…"
                className="h-9 w-full rounded-lg border border-hairline bg-white pl-9 pr-3 text-[13px] text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 sm:w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  <th className="px-6 py-3 font-semibold">Employee</th>
                  <th className="px-6 py-3 font-semibold">Department</th>
                  <th className="px-6 py-3 font-semibold">Today</th>
                  <th className="px-6 py-3 text-right font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filtered.map((e) => (
                  <tr key={e.id} className="group hover:bg-canvas/60">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={e.name} src={e.avatar} size={36} />
                        <div>
                          <p className="font-semibold text-ink">{e.name}</p>
                          <p className="text-xs text-ink-faint">
                            {e.loginId} · {e.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-ink-soft">{e.department}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={e.todayStatus} />
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => onViewEmployee(e)}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-primary opacity-0 transition-opacity hover:bg-primary-soft group-hover:opacity-100"
                      >
                        View <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
            <h2 className="font-display text-[16px] font-bold text-ink">Leave approvals</h2>
            <span className="rounded-full bg-status-amber-soft px-2 py-0.5 text-xs font-bold text-status-amber">
              {queue.filter((q) => q.status === "Pending").length} pending
            </span>
          </div>
          <ul className="divide-y divide-hairline">
            {queue.map((r) => (
              <li key={r.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{r.employee}</span>
                  <StatusBadge status={r.status} />
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-ink-soft">
                  <span className="rounded bg-primary-soft px-1.5 py-0.5 font-bold text-primary">{r.type}</span>
                  {r.from} → {r.to} · {r.days}d
                </div>
                <p className="mt-1.5 text-[13px] text-ink-soft">{r.remarks}</p>
                {r.status === "Pending" && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="success" icon={<Check size={14} />} onClick={() => decide(r.id, "Approved")}>
                      Approve
                    </Button>
                    <Button size="sm" variant="danger" icon={<X size={14} />} onClick={() => decide(r.id, "Rejected")}>
                      Reject
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {addOpen && <AddEmployeeModal onClose={() => setAddOpen(false)} />}
    </>
  );
}

/* ---------------- Admin/HR Attendance list ---------------- */
const fmtTime = (mins) => {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
};
const fmtDur = (mins) => `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;

function buildDayRows() {
  const STANDARD = 9 * 60;
  return employees.map((e, i) => {
    if (e.todayStatus === "Leave" || e.todayStatus === "Absent") {
      return { employee: e, in: "—", out: "—", hours: "—", extra: "—", status: e.todayStatus };
    }
    if (e.todayStatus === "Half-day") {
      const inMin = 9 * 60 + 14;
      const outMin = 13 * 60 + 30;
      return {
        employee: e,
        in: fmtTime(inMin),
        out: fmtTime(outMin),
        hours: fmtDur(outMin - inMin),
        extra: "—",
        status: "Half-day",
      };
    }
    const inMin = 9 * 60 + ((i * 3) % 18);
    const outMin = 18 * 60 + ((i * 7) % 40);
    const worked = outMin - inMin - 60;
    const extra = worked - STANDARD;
    return {
      employee: e,
      in: fmtTime(inMin),
      out: fmtTime(outMin),
      hours: fmtDur(worked),
      extra: extra > 0 ? fmtDur(extra) : "—",
      status: "Present",
    };
  });
}

export function AdminAttendance() {
  const [date, setDate] = useState(() => new Date(2026, 7, 22));
  const [span, setSpan] = useState("day");
  const [query, setQuery] = useState("");

  const shift = (days) => {
    setDate((d) => {
      const n = new Date(d);
      n.setDate(n.getDate() + days);
      return n;
    });
  };
  const iso = date.toISOString().slice(0, 10);
  const pretty = date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const rows = buildDayRows().filter(
    (r) =>
      r.employee.name.toLowerCase().includes(query.toLowerCase()) ||
      r.employee.department.toLowerCase().includes(query.toLowerCase())
  );
  const presentCount = rows.filter((r) => r.status === "Present" || r.status === "Half-day").length;

  return (
    <>
      <PageHeader
        eyebrow="Attendance"
        title="Team attendance"
        subtitle="Every employee's daily record. Navigate by date to review any working day."
        actions={
          <div className="relative w-full sm:w-64">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search employee, team…"
              className="pl-10"
            />
          </div>
        }
      />

      <Card className="mb-6">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => shift(span === "week" ? -7 : -1)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-hairline text-ink-soft hover:border-primary/40 hover:text-primary"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="relative">
              <Input
                type="date"
                value={iso}
                onChange={(e) => e.target.value && setDate(new Date(e.target.value))}
                className="w-[180px]"
              />
            </div>
            <button
              onClick={() => shift(span === "week" ? 7 : 1)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-hairline text-ink-soft hover:border-primary/40 hover:text-primary"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
            <span className="ml-2 hidden text-sm font-semibold text-ink lg:inline">{pretty}</span>
          </div>

          <div className="flex rounded-lg border border-hairline bg-white p-1">
            {["day", "week"].map((v) => (
              <button
                key={v}
                onClick={() => setSpan(v)}
                className={`h-9 rounded-md px-4 text-[13px] font-semibold capitalize transition-colors ${
                  span === v ? "bg-primary text-white" : "text-ink-soft hover:text-primary"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <h2 className="font-display text-[16px] font-bold text-ink">{pretty}</h2>
          <span className="text-xs font-semibold text-ink-faint">
            {presentCount}/{rows.length} present
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">
                <th className="px-6 py-3 font-semibold">Employee</th>
                <th className="px-6 py-3 font-semibold">Check In</th>
                <th className="px-6 py-3 font-semibold">Check Out</th>
                <th className="px-6 py-3 font-semibold">Work Hours</th>
                <th className="px-6 py-3 font-semibold">Extra Hours</th>
                <th className="px-6 py-3 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {rows.map((r) => (
                <tr key={r.employee.id} className="hover:bg-canvas/60">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.employee.name} src={r.employee.avatar} size={36} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-ink">{r.employee.name}</p>
                        <p className="truncate text-xs text-ink-faint">{r.employee.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-ink-soft">{r.in}</td>
                  <td className="px-6 py-3.5 text-ink-soft">{r.out}</td>
                  <td className="px-6 py-3.5 font-medium text-ink">{r.hours}</td>
                  <td className={`px-6 py-3.5 font-medium ${r.extra !== "—" ? "text-status-green" : "text-ink-faint"}`}>
                    {r.extra !== "—" ? `+${r.extra}` : "—"}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-ink-soft">
                    No employees match "{query}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

/* ---------------- Admin/HR Time Off ---------------- */
const LEAVE_LABEL = {
  Paid: "Paid Time Off",
  Sick: "Sick Time Off",
  Unpaid: "Unpaid Leave",
};

export function AdminTimeOff() {
  const [tab, setTab] = useState("timeoff");
  const [queue, setQueue] = useState(approvalQueue);
  const [query, setQuery] = useState("");

  const decide = (id, status) =>
    setQueue((q) => q.map((r) => (r.id === id ? { ...r, status } : r)));

  const balances = [
    { type: "Paid Time Off", available: 24, icon: <PlaneTakeoff size={18} />, tone: "text-status-green", bg: "bg-status-green-soft" },
    { type: "Sick Time Off", available: 7, icon: <Thermometer size={18} />, tone: "text-status-amber", bg: "bg-status-amber-soft" },
    { type: "Unpaid Leave", available: null, icon: <MinusCircle size={18} />, tone: "text-status-gray", bg: "bg-status-gray-soft" },
  ];

  const rows = queue.filter(
    (r) =>
      r.employee.toLowerCase().includes(query.toLowerCase()) ||
      LEAVE_LABEL[r.type].toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow="Time off"
        title="Time off approvals"
        subtitle="Review and decide time-off requests across the whole team."
        actions={
          <div className="relative w-full sm:w-64">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search employee, type…"
              className="pl-10"
            />
          </div>
        }
      />

      <div className="mb-6 flex flex-wrap gap-1 rounded-xl border border-hairline bg-white p-1">
        {[
          { key: "timeoff", label: "Time Off" },
          { key: "allocation", label: "Allocation" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`h-10 rounded-lg px-4 text-[13px] font-semibold transition-colors ${
              tab === t.key
                ? "bg-primary text-white shadow-sm shadow-primary/20"
                : "text-ink-soft hover:bg-primary-soft hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {balances.map((b) => (
          <Card key={b.type} className="p-5">
            <div className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${b.bg} ${b.tone}`}>
                {b.icon}
              </span>
              <span className="text-xs font-semibold text-ink-faint">Per employee</span>
            </div>
            <p className="mt-4 text-[13px] font-semibold text-ink-soft">{b.type}</p>
            <p className="mt-1 font-display text-[26px] font-extrabold tracking-tight text-ink">
              {b.available === null ? "No cap" : `${b.available} days`}
            </p>
            <p className="text-xs text-ink-faint">
              {b.available === null ? "Deducted from pay" : "Available balance"}
            </p>
          </Card>
        ))}
      </div>

      {tab === "timeoff" ? (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
            <h2 className="font-display text-[16px] font-bold text-ink">All requests</h2>
            <span className="text-xs font-semibold text-ink-faint">
              {rows.filter((r) => r.status === "Pending").length} pending
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Start Date</th>
                  <th className="px-6 py-3 font-semibold">End Date</th>
                  <th className="px-6 py-3 font-semibold">Time Off Type</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-canvas/60">
                    <td className="px-6 py-3.5 font-semibold text-ink">{r.employee}</td>
                    <td className="px-6 py-3.5 text-ink-soft">{r.from}</td>
                    <td className="px-6 py-3.5 text-ink-soft">{r.to}</td>
                    <td className="px-6 py-3.5">
                      <span className="rounded-md bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary">
                        {LEAVE_LABEL[r.type]}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-6 py-3.5">
                      {r.status === "Pending" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="success" icon={<Check size={15} />} onClick={() => decide(r.id, "Approved")}>
                            Approve
                          </Button>
                          <Button size="sm" variant="danger" icon={<X size={15} />} onClick={() => decide(r.id, "Rejected")}>
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <p className="text-right text-xs font-semibold text-ink-faint">Decided</p>
                      )}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-ink-soft">
                      No requests match "{query}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="border-b border-hairline px-6 py-4">
            <h2 className="font-display text-[16px] font-bold text-ink">Leave allocation</h2>
            <p className="text-xs text-ink-faint">Balance used and remaining per employee.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  <th className="px-6 py-3 font-semibold">Employee</th>
                  <th className="px-6 py-3 font-semibold">Paid Time Off</th>
                  <th className="px-6 py-3 font-semibold">Sick Time Off</th>
                  <th className="px-6 py-3 text-right font-semibold">Unpaid taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {employees.map((e, i) => {
                  const paidUsed = (i * 3) % 12;
                  const sickUsed = i % 4;
                  const unpaid = i === 3 ? 3 : 0;
                  return (
                    <tr key={e.id} className="hover:bg-canvas/60">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={e.name} src={e.avatar} size={34} />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-ink">{e.name}</p>
                            <p className="truncate text-xs text-ink-faint">{e.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-ink-soft">
                        <span className="font-semibold text-ink">{24 - paidUsed}</span> / 24 left
                      </td>
                      <td className="px-6 py-3.5 text-ink-soft">
                        <span className="font-semibold text-ink">{7 - sickUsed}</span> / 7 left
                      </td>
                      <td className="px-6 py-3.5 text-right text-ink-soft">{unpaid} days</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}

/* ---------------- Add Employee Modal ---------------- */
function genLoginId() {
  return `DF-${Math.floor(2070 + Math.random() * 900)}`;
}
function genPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function AddEmployeeModal({ onClose }) {
  const [loginId] = useState(genLoginId);
  const [pw, setPw] = useState(genPassword);
  const [copied, setCopied] = useState(null);

  const copy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <h2 className="font-display text-[17px] font-bold text-ink">Add employee</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-ink-faint hover:bg-canvas">
            <X size={18} />
          </button>
        </div>

        <form
          className="max-h-[70vh] space-y-5 overflow-y-auto p-6"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <Input placeholder="Jamie Rivera" />
            </Field>
            <Field label="Work email">
              <Input type="email" placeholder="jamie@dayflow.co" />
            </Field>
            <Field label="Department">
              <Select defaultValue="Engineering">
                <option>Engineering</option>
                <option>Design</option>
                <option>People</option>
                <option>Revenue</option>
              </Select>
            </Field>
            <Field label="Role / title">
              <Input placeholder="Software Engineer" />
            </Field>
          </div>

          <div className="rounded-xl border border-dashed border-primary/30 bg-primary-soft/50 p-4">
            <p className="text-[13px] font-bold text-primary">System-generated credentials</p>
            <p className="mt-0.5 text-xs text-primary/70">
              Share these with the employee — they'll reset the password on first sign-in.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                  Login ID
                </span>
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-white px-3 py-2">
                  <code className="text-sm font-semibold text-ink">{loginId}</code>
                  <button
                    type="button"
                    onClick={() => copy(loginId, "id")}
                    className="text-ink-faint hover:text-primary"
                  >
                    {copied === "id" ? <Check size={15} className="text-status-green" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                  Temporary password
                </span>
                <div className="flex items-center justify-between rounded-lg border border-hairline bg-white px-3 py-2">
                  <code className="text-sm font-semibold text-ink">{pw}</code>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPw(genPassword())}
                      className="text-ink-faint hover:text-primary"
                      title="Regenerate"
                    >
                      <RefreshCw size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => copy(pw, "pw")}
                      className="text-ink-faint hover:text-primary"
                    >
                      {copied === "pw" ? <Check size={15} className="text-status-green" /> : <Copy size={15} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" icon={<Plus size={16} />}>
              Create employee
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}