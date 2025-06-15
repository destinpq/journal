"use client"

import { useMemo } from "react"
import { Scale, Dumbbell, BookText, TrendingUp } from "lucide-react"
import ProgressChart from "@/components/progress-chart"
import EntryForms from "@/components/entry-forms"
import EntryList from "@/components/entry-list"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { ErrorBoundary, FirebaseErrorDisplay } from "@/components/error-boundary"
import { useFirebaseData } from "@/hooks/useFirebaseData"
import { format } from "date-fns"

const ACCENT_COLOR_CLASS = "text-amber-400"
const ACCENT_BG_CLASS = "bg-gradient-to-r from-amber-500 to-yellow-500"

export default function JourneyPage() {
  const {
    weightEntries,
    exerciseEntries,
    journalEntries,
    isLoading,
    error,
    handleAddWeight,
    handleAddExercise,
    handleAddJournal
  } = useFirebaseData();

  const currentWeight = useMemo(() => {
    if (weightEntries.length === 0) return null
    return weightEntries[0]
  }, [weightEntries])

  const startingWeight = useMemo(() => {
    if (weightEntries.length === 0) return null
    const sorted = [...weightEntries].sort((a, b) => a.date.getTime() - b.date.getTime())
    return sorted[0]
  }, [weightEntries])

  // Show loading skeleton while data is loading
  if (isLoading) {
    return <LoadingSkeleton />
  }

  // Show error state if there's a Firebase error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white flex items-center justify-center p-4">
        <FirebaseErrorDisplay 
          error={error} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white flex flex-col">
        <header className="py-4 md:py-6 px-4 md:px-8 border-b border-amber-500/50 sticky top-0 bg-gray-900/95 backdrop-blur-xl z-10 shadow-lg shadow-amber-500/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className={`text-2xl md:text-4xl font-bold tracking-tight flex items-center bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 bg-clip-text text-transparent`}>
              <TrendingUp className="w-6 h-6 md:w-10 md:h-10 mr-2 md:mr-3 text-amber-400" />
              My Journey
            </h1>
            <p className="text-amber-300 hidden md:block text-sm md:text-base font-medium">Track. Reflect. Progress.</p>
          </div>
        </header>

        <main className="flex-grow p-4 md:p-8 grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
          <div className="xl:col-span-1 space-y-8 xl:sticky xl:top-28 xl:self-start xl:h-fit">
            <EntryForms
              onAddWeight={handleAddWeight}
              onAddExercise={handleAddExercise}
              onAddJournal={handleAddJournal}
              accentColorClass={ACCENT_COLOR_CLASS}
              accentBgClass={ACCENT_BG_CLASS}
            />
          </div>

          <div className="xl:col-span-2 space-y-8">
            <ProgressChart weightEntries={weightEntries} accentColor="hsl(45, 93%, 58%)" />
            {currentWeight && startingWeight && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "Current Weight", value: `${currentWeight.weight} kg`, date: currentWeight.date, id: "cw" },
                  { title: "Starting Weight", value: `${startingWeight.weight} kg`, date: startingWeight.date, id: "sw" },
                  {
                    title: "Total Change",
                    value: `${(currentWeight.weight - startingWeight.weight).toFixed(1)} kg`,
                    status:
                      currentWeight.weight < startingWeight.weight
                        ? "lost"
                        : currentWeight.weight > startingWeight.weight
                          ? "gained"
                          : "same",
                    id: "tc",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="p-4 md:p-6 bg-gradient-to-br from-gray-700/90 to-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-amber-500/50 hover:border-amber-400/80 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30"
                  >
                    <p className="text-sm text-amber-200 font-medium">{item.title}</p>
                    <p
                      className={`text-2xl md:text-3xl font-bold mt-1 ${
                        item.status === "lost"
                          ? "text-emerald-400"
                          : item.status === "gained"
                            ? "text-rose-400"
                            : "bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent"
                      }`}
                    >
                      {item.value}
                    </p>
                    {item.date && <p className="text-xs text-gray-300 mt-1">on {format(item.date, "MMM d, yyyy")}</p>}
                  </div>
                ))}
              </div>
            )}
            <EntryList
              title="Weight Logs"
              entries={weightEntries}
              icon={Scale}
              entryType="weight"
              accentColorClass={ACCENT_COLOR_CLASS}
            />
            <EntryList
              title="Exercise Logs"
              entries={exerciseEntries}
              icon={Dumbbell}
              entryType="exercise"
              accentColorClass={ACCENT_COLOR_CLASS}
            />
            <EntryList
              title="Journal Entries"
              entries={journalEntries}
              icon={BookText}
              entryType="journal"
              accentColorClass={ACCENT_COLOR_CLASS}
            />
          </div>
        </main>

        <footer className="text-center p-6 border-t border-amber-500/30 text-sm text-amber-300">
          <p>&copy; {new Date().getFullYear()} Your Journey. Keep pushing forward! 👑✨</p>
        </footer>
      </div>
    </ErrorBoundary>
  )
}
