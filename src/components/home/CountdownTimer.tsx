"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(endDate: Date): TimeLeft {
  const diff = Math.max(0, endDate.getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export function CountdownTimer() {
  const [endDate] = useState<Date>(() => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000))
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft(endDate))
    const id = setInterval(() => {
      const t = getTimeLeft(endDate)
      setTimeLeft(t)
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        clearInterval(id)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [endDate])

  if (!timeLeft) return null

  const units = [
    { label: "Days", value: pad(timeLeft.days) },
    { label: "Hours", value: pad(timeLeft.hours) },
    { label: "Minutes", value: pad(timeLeft.minutes) },
    { label: "Seconds", value: pad(timeLeft.seconds) },
  ]

  return (
    <div className="flex items-center gap-2">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="text-center">
            <div className="bg-[#0a1628] text-white font-bold text-lg rounded px-2.5 py-1 min-w-[3rem] text-center tabular-nums">
              {value}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
          {i < units.length - 1 && (
            <span className="text-[#0a1628] font-bold text-xl mb-4">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
