"use client";

import { useEffect, useState } from "react";
import shop, { formatTime, hoursFor, type DayHours } from "@/content/shop";

type Status =
  | { state: "unknown" }
  | { state: "open"; until: string }
  | { state: "closing-soon"; until: string }
  | { state: "closed"; nextOpen: string };

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

function statusAt(now: Date): Status {
  const today = hoursFor(now.getDay());
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (today?.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) {
      const until = formatTime(today.close);
      return close - minutes <= 60 ? { state: "closing-soon", until } : { state: "open", until };
    }
    if (minutes < open) return { state: "closed", nextOpen: `today at ${formatTime(today.open)}` };
  }

  // Walk forward to the next day we’re actually open
  for (let i = 1; i <= 7; i++) {
    const day = hoursFor((now.getDay() + i) % 7);
    if (day?.open) {
      const label = i === 1 ? "tomorrow" : day.day;
      return { state: "closed", nextOpen: `${label} at ${formatTime(day.open)}` };
    }
  }
  return { state: "unknown" };
}

const dot = {
  open: "bg-[#3f7d3f]",
  "closing-soon": "bg-amber",
  closed: "bg-stone",
  unknown: "bg-stone",
} as const;

export default function HoursTable() {
  /* Time is resolved after mount. Rendering it on the server would bake the
     build machine’s clock into the HTML and mismatch on hydration. */
  const [status, setStatus] = useState<Status>({ state: "unknown" });
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setStatus(statusAt(now));
      setTodayIndex(now.getDay());
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const label =
    status.state === "open"
      ? `Open now — until ${status.until}`
      : status.state === "closing-soon"
        ? `Closing soon — ${status.until}`
        : status.state === "closed"
          ? `Closed — opens ${status.nextOpen}`
          : "Hours";

  return (
    <div>
      <div
        className="flex items-center gap-2.5"
        role="status"
        aria-live="polite"
      >
        <span className="relative grid h-2.5 w-2.5 place-items-center">
          <span className={`h-2.5 w-2.5 rounded-pill ${dot[status.state]}`} />
          {status.state === "open" && (
            <span
              aria-hidden
              className="absolute h-2.5 w-2.5 rounded-pill bg-[#3f7d3f] motion-safe:animate-[pulse-ring_2.4s_var(--ac-ease-out)_infinite]"
            />
          )}
        </span>
        <p className="font-body text-sm font-700 text-espresso">{label}</p>
      </div>

      <table className="mt-6 w-full border-collapse text-sm">
        <caption className="sr-only">Opening hours by day</caption>
        <tbody>
          {shop.hours.map((day: DayHours) => {
            const isToday = todayIndex === day.index;
            return (
              <tr
                key={day.day}
                className="border-b border-hairline last:border-b-0"
                aria-current={isToday ? "date" : undefined}
              >
                <th
                  scope="row"
                  className={`py-3 text-left font-body font-600 ${
                    isToday ? "text-espresso" : "text-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {day.day}
                    {isToday && (
                      <span className="rounded-xs bg-accent-quiet px-1.5 py-0.5 text-2xs font-600 tracking-wide text-ember uppercase">
                        Today
                      </span>
                    )}
                  </span>
                </th>
                <td
                  className={`py-3 text-right tabular-nums ${
                    isToday ? "font-600 text-espresso" : "text-muted"
                  }`}
                >
                  {day.open && day.close
                    ? `${formatTime(day.open)} – ${formatTime(day.close)}`
                    : "Closed"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-5 text-sm leading-relaxed text-muted">{shop.hoursNote}</p>
    </div>
  );
}
