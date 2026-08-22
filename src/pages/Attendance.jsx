import { useState } from "react";
import { Clock, LogIn, LogOut as LogOutIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Card, StatusBadge } from "../components/ui";
import { PageHeader } from "../components/PageHeader";

const fmtTime = (mins) => {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
};
const fmtDur = (mins) => `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;

const TODAY = new Date(2026, 7, 22);

function buildMonth(year, month) {
  const STANDARD = 9 * 60;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = year === TODAY.getFullYear() && month === TODAY.getMonth();
  const lastDay = isCurrentMonth ? TODAY.getDate() : daysInMonth;
  const days = [];

  for (let d = 1; d <= lastDay; d++) {
    const date = new Date(year, month, d);
    const wd = date.getDay();
    if (wd === 0 || wd === 6) continue;
    const label = date.toLocaleDateString("en-IN", { weekday: "short" });

    let status;
    if (d % 12 === 0) status = "Leave";
    else if (d % 19 === 0) status = "Absent";
    else if (d % 9 === 0) status = "Half-day";
    else status = "Present";

    if (status === "Leave" || status === "Absent") {
      days.push({ date: d, label, in: "—", out: "—", hours: "—", extra: "—", status });
      continue;
    }
    if (status === "Half-day") {
      const inMin = 9 * 60 + 14;
      const outMin = 13 * 60 + 30;
      days.push({ date: d, label, in: fmtTime(inMin), out: fmtTime(outMin), hours: fmtDur(outMin - inMin), extra: "—", status });
      continue;
    }
    const inMin = 9 * 60 + ((d * 3) % 18);
    const outMin = 18 * 60 + ((d * 5) % 40);
    const inProgress = isCurrentMonth && d === lastDay;
    if (inProgress) {
      days.push({ date: d, label, in: fmtTime(inMin), out: "—", hours: "In progress", extra: "—", status });
      continue;
    }
    const worked = outMin - inMin - 60;
    const extra = worked - STANDARD;
    days.push({
      date: d,
      label,
      in: fmtTime(inMin),
      out: fmtTime(outMin),
      hours: fmtDur(worked),
      extra: extra > 0 ? fmtDur(extra) : "—",
      status,
    });
  }
  return days.reverse();
}

export default function Attendance() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [cursor, setCursor] = useState(() => new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));

  const rows = buildMonth(cursor.getFullYear(), cursor.getMonth());
  const monthLabel = cursor.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const present = rows.filter((r) => r.status === "Present" || r.status === "Half-day").length;
  const leave = rows.filter((r) => r.status === "Leave").length;
  const totalWorking = rows.length;

  const shiftMonth = (delta) =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  const isCurrentMonth =
    cursor.getFullYear() === TODAY.getFullYear() && cursor.getMonth() === TODAY.getMonth();

  return (
    <>
      <PageHeader
        eyebrow="Attendance"
        title="My attendance"
        subtitle="Your day-wise record for the month. Only your own attendance is shown here."
      />

      <Card className="mb-6">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              className={`grid h-12 w-12 place-items-center rounded-xl ${
                checkedIn ? "bg-status-green-soft text-status-green" : "bg-primary-soft text-primary"
              }`}
            >
              <Clock size={22} />
            </span>
            <div>
              <p className="text-sm text-ink-soft">
                {checkedIn ? "You're checked in" : "You haven't checked in yet"}
              </p>
              <p className="font-display text-[22px] font-extrabold tracking-tight text-ink">
                {checkedIn ? "Since 9:02 AM · Today" : "Friday, Aug 22, 2026"}
              </p>
            </div>
          </div>
          <Button
            variant={checkedIn ? "danger" : "success"}
            icon={checkedIn ? <LogOutIcon size={16} /> : <LogIn size={16} />}
            onClick={() => setCheckedIn((c) => !c)}
          >
            {checkedIn ? "Check out" : "Check in"}
          </Button>
        </div>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Days present", value: present, tone: "text-status-green", sub: "incl. half-days" },
          { label: "Leave", value: leave, tone: "text-status-gray", sub: "days this month" },
          { label: "Total working days", value: totalWorking, tone: "text-ink", sub: "so far this month" },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-[13px] font-semibold text-ink-soft">{s.label}</p>
            <p className={`mt-1 font-display text-[28px] font-extrabold tracking-tight ${s.tone}`}>
              {s.value}
            </p>
            <p className="text-xs text-ink-faint">{s.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-hairline px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-[16px] font-bold text-ink">{monthLabel}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => shiftMonth(-1)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-hairline text-ink-soft hover:border-primary/40 hover:text-primary"
              aria-label="Previous month"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={() => shiftMonth(1)}
              disabled={isCurrentMonth}
              className="grid h-9 w-9 place-items-center rounded-lg border border-hairline text-ink-soft hover:border-primary/40 hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Next month"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Check In</th>
                <th className="px-6 py-3 font-semibold">Check Out</th>
                <th className="px-6 py-3 font-semibold">Work Hours</th>
                <th className="px-6 py-3 font-semibold">Extra Hours</th>
                <th className="px-6 py-3 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {rows.map((d) => (
                <tr key={d.date} className="hover:bg-canvas/60">
                  <td className="px-6 py-3.5 font-semibold text-ink">
                    {d.label}, {monthLabel.slice(0, 3)} {String(d.date).padStart(2, "0")}
                  </td>
                  <td className="px-6 py-3.5 text-ink-soft">{d.in}</td>
                  <td className="px-6 py-3.5 text-ink-soft">{d.out}</td>
                  <td className="px-6 py-3.5 font-medium text-ink">{d.hours}</td>
                  <td className={`px-6 py-3.5 font-medium ${d.extra !== "—" ? "text-status-green" : "text-ink-faint"}`}>
                    {d.extra !== "—" ? `+${d.extra}` : "—"}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <StatusBadge status={d.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-ink-soft">
                    No working days recorded for {monthLabel}.
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