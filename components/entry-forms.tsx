"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalendarIcon, Scale, Dumbbell, BookText, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { WeightEntry, ExerciseEntry, JournalEntry } from "@/lib/types"

interface EntryFormsProps {
  onAddWeight: (entry: Omit<WeightEntry, "id">) => void
  onAddExercise: (entry: Omit<ExerciseEntry, "id">) => void
  onAddJournal: (entry: Omit<JournalEntry, "id">) => void
  accentColorClass?: string
  accentBgClass?: string
}

export default function EntryForms({
  onAddWeight,
  onAddExercise,
  onAddJournal,
  accentColorClass = "text-cyan-400",
  accentBgClass = "bg-cyan-500",
}: EntryFormsProps) {
  const [weightDate, setWeightDate] = useState<Date | undefined>(new Date())
  const [weightValue, setWeightValue] = useState<string>("")
  const [isSubmittingWeight, setIsSubmittingWeight] = useState(false)

  const [exerciseDate, setExerciseDate] = useState<Date | undefined>(new Date())
  const [exerciseDescription, setExerciseDescription] = useState<string>("")
  const [exerciseDuration, setExerciseDuration] = useState<string>("")
  const [isSubmittingExercise, setIsSubmittingExercise] = useState(false)

  const [journalDate, setJournalDate] = useState<Date | undefined>(new Date())
  const [journalTitle, setJournalTitle] = useState<string>("")
  const [journalContent, setJournalContent] = useState<string>("")
  const [isSubmittingJournal, setIsSubmittingJournal] = useState(false)

  const handleWeightSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (weightDate && weightValue) {
      setIsSubmittingWeight(true)
      try {
        onAddWeight({ date: weightDate, weight: Number.parseFloat(weightValue) })
        setWeightValue("")
        // Brief success feedback
        setTimeout(() => setIsSubmittingWeight(false), 800)
      } catch (error) {
        setIsSubmittingWeight(false)
      }
    }
  }

  const handleExerciseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (exerciseDate && exerciseDescription) {
      setIsSubmittingExercise(true)
      try {
        onAddExercise({
          date: exerciseDate,
          description: exerciseDescription,
          duration: exerciseDuration ? Number.parseInt(exerciseDuration) : undefined,
        })
        setExerciseDescription("")
        setExerciseDuration("")
        setTimeout(() => setIsSubmittingExercise(false), 800)
      } catch (error) {
        setIsSubmittingExercise(false)
      }
    }
  }

  const handleJournalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (journalDate && journalContent) {
      setIsSubmittingJournal(true)
      try {
        onAddJournal({
          date: journalDate,
          title: journalTitle,
          content: journalContent,
        })
        setJournalTitle("")
        setJournalContent("")
        setTimeout(() => setIsSubmittingJournal(false), 800)
      } catch (error) {
        setIsSubmittingJournal(false)
      }
    }
  }

  const DatePicker = ({ date, setDate }: { date?: Date; setDate: (date?: Date) => void }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
                  className={cn(
          "w-full justify-start text-left font-normal bg-gray-800/50 border-amber-500/30 hover:bg-gray-700/50 text-white",
          !date && "text-gray-400",
        )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-gray-900 border-amber-500/30 text-white" align="start">
        <Calendar 
          mode="single" 
          selected={date} 
          onSelect={setDate} 
          initialFocus 
          className="bg-gray-900 text-white"
        />
      </PopoverContent>
    </Popover>
  )

  return (
    <Card className="bg-gradient-to-br from-gray-700/95 to-gray-800/95 border-amber-500/60 shadow-xl shadow-amber-500/20">
      <CardHeader>
        <CardTitle className={`flex items-center ${accentColorClass}`}>Add New Entry</CardTitle>
                  <CardDescription className="text-amber-200">Log your weight, exercise, or journal thoughts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weight">
          <TabsList className="grid w-full grid-cols-3 bg-gray-600/90 p-1 rounded-md border border-amber-500/50">
            {[
              { value: "weight", label: "Weight", icon: Scale },
              { value: "exercise", label: "Exercise", icon: Dumbbell },
              { value: "journal", label: "Journal", icon: BookText },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-sm transition-all flex items-center justify-center",
                  "text-white hover:bg-gray-500/70",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-lg data-[state=active]:shadow-amber-500/30 data-[state=active]:border-amber-400",
                )}
              >
                <tab.icon className="w-4 h-4 mr-2 inline-block" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Weight Tab Content */}
          <TabsContent value="weight" className="mt-6">
            <form onSubmit={handleWeightSubmit} className="space-y-6">
              <div>
                <Label htmlFor="weight-date" className="text-amber-200 font-medium">
                  Date
                </Label>
                <DatePicker date={weightDate} setDate={setWeightDate} />
              </div>
              <div>
                <Label htmlFor="weight-value" className="text-amber-200 font-medium">
                  Weight (kg)
                </Label>
                <Input
                  id="weight-value"
                  type="number"
                  step="0.1"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  placeholder="e.g., 70.5"
                  required
                  className="bg-gray-600/70 border-amber-500/50 text-white placeholder:text-gray-300 focus:border-amber-400 focus:bg-gray-500/80 focus:shadow-lg focus:shadow-amber-500/20"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmittingWeight}
                className={`w-full ${accentBgClass} hover:brightness-110 text-black font-semibold transition-all duration-300`}
              >
                {isSubmittingWeight ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added!
                  </>
                ) : (
                  "Add Weight Entry"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Exercise Tab Content */}
          <TabsContent value="exercise" className="mt-6">
            <form onSubmit={handleExerciseSubmit} className="space-y-6">
              <div>
                <Label htmlFor="exercise-date" className="text-amber-300">
                  Date
                </Label>
                <DatePicker date={exerciseDate} setDate={setExerciseDate} />
              </div>
              <div>
                <Label htmlFor="exercise-description" className="text-amber-300">
                  Description
                </Label>
                <Input
                  id="exercise-description"
                  value={exerciseDescription}
                  onChange={(e) => setExerciseDescription(e.target.value)}
                  placeholder="e.g., 30 min run, Yoga session"
                  required
                  className="bg-gray-800/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400"
                />
              </div>
              <div>
                <Label htmlFor="exercise-duration" className="text-amber-300">
                  Duration (minutes)
                </Label>
                <Input
                  id="exercise-duration"
                  type="number"
                  value={exerciseDuration}
                  onChange={(e) => setExerciseDuration(e.target.value)}
                  placeholder="e.g., 30"
                  className="bg-gray-800/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmittingExercise}
                className={`w-full ${accentBgClass} hover:brightness-110 text-black font-semibold transition-all duration-300`}
              >
                {isSubmittingExercise ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added!
                  </>
                ) : (
                  "Add Exercise Log"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Journal Tab Content */}
          <TabsContent value="journal" className="mt-6">
            <form onSubmit={handleJournalSubmit} className="space-y-6">
              <div>
                <Label htmlFor="journal-date" className="text-amber-300">
                  Date
                </Label>
                <DatePicker date={journalDate} setDate={setJournalDate} />
              </div>
              <div>
                <Label htmlFor="journal-title" className="text-amber-300">
                  Title (Optional)
                </Label>
                <Input
                  id="journal-title"
                  value={journalTitle}
                  onChange={(e) => setJournalTitle(e.target.value)}
                  placeholder="e.g., Feeling great today!"
                  className="bg-gray-800/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400"
                />
              </div>
              <div>
                <Label htmlFor="journal-content" className="text-amber-300">Content</Label>
                <Textarea
                  id="journal-content"
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  placeholder="Your thoughts, feelings, daily tasks..."
                  required
                  className="bg-gray-800/50 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-400 min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmittingJournal}
                className={`w-full ${accentBgClass} hover:brightness-110 text-black font-semibold transition-all duration-300`}
              >
                {isSubmittingJournal ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added!
                  </>
                ) : (
                  "Add Journal Entry"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
