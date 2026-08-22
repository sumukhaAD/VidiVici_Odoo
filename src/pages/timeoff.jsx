import { useState } from "react";
import { PlaneTakeoff, Thermometer, MinusCircle, ChevronLeft, ChevronRight, Plus, Paperclip, X } from "lucide-react";
import { Button, Card, StatusBadge, Field, Select, Input, Textarea } from "../components/ui";
import { PageHeader } from "../components/PageHeader";

const LEAVE_TYPE_META = {
  Paid: { label: "Paid Time Off", dot: "bg-status-green", soft: "bg-status-green-soft", text: "text-status-green" },
  Sick: { label: "Sick Leave", dot: "bg-status-amber", soft: "bg-status-amber-soft", text: "text-status-amber" },
  Unpaid: { label: "Unpaid Leave", dot: "bg-status-gray", soft: "bg-status-gray-soft", text: "text-status-gray" },
};

const toISO = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const daysBetween = (a, b) => Math.max(1, Math.round((+new Date(b) - +new Date(a)) / 86400000) + 1);

// TODO: replace with real data from Supabase once Sumukha's time_off table is ready
const currentEmployee = { name: "You" };
const myLeaves = [];

export default function TimeOff() {
  const [requests, setRequests] = useState(myLeaves);
  const [modalOpen, setModalOpen] = useState(false);
  const [cursor, setCursor] = useState(() => new Date(2026, 7, 1));
  const [selStart, setSelStart] = useState(null);
  const [selEnd, setSelEnd] = useState(null);

  const used = (t) =>
    requests.filter((r) => r.type === t && r.status === "Approved").reduce((n, r) => n + r.days, 0);
  const balances = [
    { type: "Paid", total: 24, icon: <PlaneTakeoff size={18} /> },
    { type: "Sick", total: 7, icon: <Thermometer size={18} /> },
    { type: "Unpaid", total: null, icon: <MinusCircle size={18} /> },
  ];

  const y = cursor.getFullYear();
  const mo = cursor.getMonth();
  const leaveDays = {};
  for (const r of requests) {
    if (r.status === "Rejected") continue;
    const s = new Date(r.from);
    const e = new Date(r.to);
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      if (d.getFullYear() === y && d.getMonth() === mo) leaveDays[d.getDate()] = r.type;
    }
  }

  const inSelection = (iso) => {
    if (!selStart) return false;
    if (!selEnd) return iso === selStart;
    return iso >= selStart && iso <= selEnd;
  };

  const pickDay = (day) => {
    const iso = toISO(y, mo, day);
    if (!selStart || (selStart && selEnd)) {
      setSelStart(iso);
      setSelEnd(null);
    } else if (iso < selStart) {
      setSelEnd(selStart);
      setSelStart(iso);
    } else {
      setSelEnd(iso);
    }
  };

  const addRequest = (req) => {
    setRequests((r) => [req, ...r]);
    setSelStart(null);
    setSelEnd(null);
  };

  const daysInMonth = new Date(y, mo + 1, 0).getDate();
  const firstWeekday = new Date(y, mo, 1).getDay();
  const monthLabel = cursor.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <>
      <PageHeader
        eyebrow="Time off"
        title="My time off"
        subtitle="Your balances, calendar and requests. Only your own records are shown here."
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
            New
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {balances.map((b) => {
          const meta = LEAVE_TYPE_META[b.type];
          const remaining = b.total === null ? null : b.total - used(b.type);
          return (
            <Card key={b.type} className="p-5">
              <div className="flex items-center justify-between">
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${meta.soft} ${meta.text}`}>
                  {b.icon}
                </span>
                <span className="text-xs font-semibold text-ink-faint">
                  {b.total === null ? "No cap" : `of ${b.total} days`}
                </span>
              </div>
              <p className="mt-4 text-[13px] font-semibold text-ink-soft">{meta.label}</p>
              <p className="mt-1 font-display text-[26px] font-extrabold tracking-tight text-ink">
                {remaining === null ? `${used(b.type)} taken` : `${remaining} days`}
              </p>
              <p className="text-xs text-ink-faint">
                {remaining === null ? "Deducted from pay" : "Remaining balance"}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-[16px] font-bold text-ink">{monthLabel}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCursor(new Date(y, mo - 1, 1))}
                className="grid h-9 w-9 place-items-center rounded-lg border border-hairline text-ink-soft hover:border-primary/40 hover:text-primary"
                aria-label="Previous month"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={() => setCursor(new Date(y, mo + 1, 1))}
                className="grid h-9 w-9 place-items-center rounded-lg border border-hairline text-ink-soft hover:border-primary/40 hover:text-primary"
                aria-label="Next month"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="py-2 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                {d}
              </span>
            ))}
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <span key={`b-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const iso = toISO(y, mo, day);
              const selected = inSelection(iso);
              const leaveType = leaveDays[day];
              return (
                <button
                  key={day}
                  onClick={() => pickDay(day)}
                  className={`relative grid aspect-square place-items-center rounded-lg text-[13px] font-semibold transition-colors ${
                    selected ? "bg-primary text-white" : "text-ink hover:bg-primary-soft hover:text-primary"
                  }`}
                >
                  {day}
                  {leaveType && !selected && (
                    <span className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${LEAVE_TYPE_META[leaveType].dot}`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hairline pt-4 text-xs text-ink-soft">
            {Object.keys(LEAVE_TYPE_META).map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${LEAVE_TYPE_META[t].dot}`} />
                {LEAVE_TYPE_META[t].label}
              </span>
            ))}
          </div>
          {selStart && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-soft px-4 py-3">
              <span className="text-[13px] font-semibold text-primary">
                Selected: {selStart}
                {selEnd && selEnd !== selStart ? ` → ${selEnd}` : ""}
              </span>
              <Button size="sm" icon={<Plus size={14} />} onClick={() => setModalOpen(true)}>
                Request these dates
              </Button>
            </div>
          )}
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
            <h2 className="font-display text-[16px] font-bold text-ink">My requests</h2>
            <span className="text-xs font-semibold text-ink-faint">{requests.length} total</span>
          </div>
          <ul className="divide-y divide-hairline">
            {requests.map((r) => (
              <li key={r.id} className="px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary">
                        {LEAVE_TYPE_META[r.type].label}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {r.from} → {r.to}
                      </span>
                      <span className="text-xs text-ink-faint">· {r.days}d</span>
                    </div>
                    <p className="mt-1 text-[13px] text-ink-soft">{r.remarks}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              </li>
            ))}
            {requests.length === 0 && (
              <li className="px-6 py-10 text-center text-sm text-ink-soft">No requests yet.</li>
            )}
          </ul>
        </Card>
      </div>

      {modalOpen && (
        <TimeOffModal
          initialFrom={selStart ?? ""}
          initialTo={selEnd ?? selStart ?? ""}
          onClose={() => setModalOpen(false)}
          onSubmit={(req) => {
            addRequest(req);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}

function TimeOffModal({ initialFrom, initialTo, onClose, onSubmit }) {
  const [type, setType] = useState("Paid");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [allocation, setAllocation] = useState(
    initialFrom && initialTo ? String(daysBetween(initialFrom, initialTo)) : "1"
  );
  const [fileName, setFileName] = useState(null);
  const [note, setNote] = useState("");

  const syncAllocation = (f, t) => {
    if (f && t) setAllocation(String(daysBetween(f, t)));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!from || !to) return;
    const fmt = (d) =>
      new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    onSubmit({
      id: `l-${Date.now()}`,
      employee: currentEmployee.name,
      type,
      from: fmt(from),
      to: fmt(to),
      days: Math.max(1, Number(allocation) || daysBetween(from, to)),
      remarks: note || (type === "Sick" && fileName ? `Certificate: ${fileName}` : "—"),
      status: "Pending",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <Card as="form" onSubmit={submit} className="relative z-10 w-full max-w-lg p-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="font-display text-[19px] font-extrabold tracking-tight text-ink">
              New time off request
            </h2>
            <p className="text-sm text-ink-soft">Fill in the details for your request.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-primary-soft hover:text-primary"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <Field label="Time off type">
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Paid">Paid Time Off</option>
              <option value="Sick">Sick Leave</option>
              <option value="Unpaid">Unpaid Leave</option>
            </Select>
          </Field>

          <Field label="Validity period">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="date"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  syncAllocation(e.target.value, to);
                }}
                className="min-w-0"
              />
              <Input
                type="date"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  syncAllocation(from, e.target.value);
                }}
                className="min-w-0"
              />
            </div>
          </Field>

          <Field label="Allocation (days)">
            <Input type="number" min={1} value={allocation} onChange={(e) => setAllocation(e.target.value)} />
          </Field>

          <Field
            label="Attachment"
            hint={type === "Sick" ? "Required for sick leave — upload your certificate." : "Optional supporting document."}
          >
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-hairline bg-canvas px-3.5 py-3 text-sm text-ink-soft transition-colors hover:border-primary/40 hover:text-primary">
              <Paperclip size={16} />
              <span className="truncate">{fileName ?? "Choose a file…"}</span>
              <input
                type="file"
                className="hidden"
                accept="image/*,application/pdf"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </Field>

          <Field label="Note (optional)">
            <Textarea placeholder="Add a short note for your manager…" value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit request</Button>
        </div>
      </Card>
    </div>
  );
}