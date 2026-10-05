"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-10-23T00:00:00+07:00").getTime();

const getTimeLeft = () => {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ClosingCountdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(
    null,
  );

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time?.done) {
    return (
      <p className="font-brand text-3xl uppercase tracking-widest text-green-300 drop-shadow-[0_0_20px_rgba(34,197,94,0.9)] md:text-6xl">
        Live Now
      </p>
    );
  }

  const items = [
    { label: "Days", value: time ? pad(time.days) : "--" },
    { label: "Hours", value: time ? pad(time.hours) : "--" },
    { label: "Min", value: time ? pad(time.minutes) : "--" },
    { label: "Sec", value: time ? pad(time.seconds) : "--" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2 md:gap-4">
          <div className="flex w-14 flex-col items-center rounded-xl border border-green-400/40 bg-black/50 py-2 shadow-[0_0_25px_rgba(34,197,94,0.35)] backdrop-blur-md md:w-24 md:rounded-2xl md:py-3">
            <span className="font-brand text-2xl tabular-nums text-white md:text-5xl">
              {item.value}
            </span>
            <span className="font-tech text-[9px] uppercase tracking-[0.2em] text-green-400 md:text-xs">
              {item.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className="font-brand text-xl text-green-400/70 md:text-4xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}