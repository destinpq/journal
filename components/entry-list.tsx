"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { format } from "date-fns"
import type { WeightEntry, ExerciseEntry, JournalEntry } from "@/lib/types"
import type { LucideIcon } from "lucide-react"

type Entry = WeightEntry | ExerciseEntry | JournalEntry

interface EntryListProps {
  title: string
  entries: Entry[]
  icon: LucideIcon
  entryType: "weight" | "exercise" | "journal"
  accentColorClass?: string
}

export default function EntryList({
  title,
  entries,
  icon: Icon,
  entryType,
  accentColorClass = "text-primary",
}: EntryListProps) {
  const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime())

  const renderEntry = (entry: Entry) => {
    if (entryType === "weight" && "weight" in entry) {
      return (
        <>
          <p className={`font-semibold text-lg ${accentColorClass}`}>{entry.weight} kg</p>
                                             <p className="text-xs text-gray-200">{format(entry.date, "MMM d, yyyy 'at' h:mm a")}</p>
        </>
      )
    }
    if (entryType === "exercise" && "description" in entry) {
      return (
        <>
                      <p className="font-semibold text-white">{entry.description}</p>
            {entry.duration && <p className="text-sm text-amber-200">{entry.duration} minutes</p>}
            <p className="text-xs text-gray-200 mt-1">{format(entry.date, "MMM d, yyyy 'at' h:mm a")}</p>
        </>
      )
    }
    if (entryType === "journal" && "content" in entry) {
      return (
        <>
          {entry.title && <p className="font-semibold text-white">{entry.title}</p>}
          <p className="text-sm whitespace-pre-wrap text-white leading-relaxed">
            {entry.content.substring(0, 150)}
            {entry.content.length > 150 ? "..." : ""}
          </p>
          <p className="text-xs text-gray-200 mt-2">{format(entry.date, "MMM d, yyyy 'at' h:mm a")}</p>
        </>
      )
    }
    return null
  }

  return (
    <Card className="bg-gradient-to-br from-gray-700/95 to-gray-800/95 border-amber-500/60 shadow-xl shadow-amber-500/20">
      {" "}
      {/* Changed to fully opaque */}
      <CardHeader>
        <CardTitle className={`flex items-center text-xl ${accentColorClass}`}>
          <Icon className="w-6 h-6 mr-3" />
          {title}
        </CardTitle>
        <CardDescription className="text-amber-200">Your recent {entryType} logs, newest first.</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedEntries.length === 0 ? (
          <p className="text-amber-200">No {entryType} entries yet. Add one using the form!</p>
        ) : (
          <ul className="space-y-4">
            {sortedEntries.map((entry) => (
              <li
                key={entry.id}
                className="p-4 border border-amber-500/50 rounded-lg bg-gray-600/60 hover:border-amber-400/80 transition-colors duration-200"
              >
                {renderEntry(entry)}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
