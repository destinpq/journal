"use client"

import { useState, useMemo } from "react"
import { Scale, Dumbbell, BookText, Edit3, Trash2, Save, X, ArrowLeft } from "lucide-react"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { ErrorBoundary, FirebaseErrorDisplay } from "@/components/error-boundary"
import { useFirebaseData } from "@/hooks/useFirebaseData"
import { deleteEntry, updateEntry } from "@/lib/firebase-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { WeightEntry, ExerciseEntry, JournalEntry } from "@/lib/types"
import Link from "next/link"

export default function EditPage() {
  const {
    weightEntries,
    exerciseEntries,
    journalEntries,
    isLoading,
    error
  } = useFirebaseData();

  const [editingEntry, setEditingEntry] = useState<{ type: string; entry: any } | null>(null)
  const [editFormData, setEditFormData] = useState<any>({})
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

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

  const handleEdit = (type: string, entry: any) => {
    setEditingEntry({ type, entry })
    setEditFormData({
      ...entry,
      date: entry.date instanceof Date ? entry.date : new Date(entry.date)
    })
  }

  const handleUpdate = async () => {
    if (!editingEntry) return

    setIsUpdating(true)
    try {
      const collectionMap = {
        weight: "weightEntries",
        exercise: "exerciseEntries", 
        journal: "journalEntries"
      }

      await updateEntry(
        collectionMap[editingEntry.type as keyof typeof collectionMap],
        editingEntry.entry.id,
        editFormData
      )

      setEditingEntry(null)
      setEditFormData({})
    } catch (err) {
      console.error("Error updating entry:", err)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (type: string, id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this entry? This action cannot be undone.")
    if (!confirmed) return

    setIsDeleting(id)
    try {
      const collectionMap = {
        weight: "weightEntries",
        exercise: "exerciseEntries",
        journal: "journalEntries"
      }

      await deleteEntry(collectionMap[type as keyof typeof collectionMap], id)
    } catch (err) {
      console.error("Error deleting entry:", err)
    } finally {
      setIsDeleting(null)
    }
  }

  const EditDialog = () => {
    if (!editingEntry) return null

    const { type, entry } = editingEntry

    return (
      <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(null)}>
        <DialogContent className="bg-gradient-to-br from-gray-700/95 to-gray-800/95 border-amber-500/60 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-amber-400 flex items-center">
              <Edit3 className="w-5 h-5 mr-2" />
              Edit {type.charAt(0).toUpperCase() + type.slice(1)} Entry
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Date Field */}
            <div>
              <Label className="text-amber-200 font-medium">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-gray-600/70 border-amber-500/50 text-white hover:bg-gray-500/80"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editFormData.date ? format(editFormData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-900 border-amber-500/50" align="start">
                  <Calendar
                    mode="single"
                    selected={editFormData.date}
                    onSelect={(date) => setEditFormData({ ...editFormData, date })}
                    initialFocus
                    className="bg-gray-900 text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Weight-specific fields */}
            {type === "weight" && (
              <div>
                <Label className="text-amber-200 font-medium">Weight (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={editFormData.weight || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, weight: parseFloat(e.target.value) })}
                  className="bg-gray-600/70 border-amber-500/50 text-white focus:border-amber-400"
                />
              </div>
            )}

            {/* Exercise-specific fields */}
            {type === "exercise" && (
              <>
                <div>
                  <Label className="text-amber-200 font-medium">Description</Label>
                  <Input
                    value={editFormData.description || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="bg-gray-600/70 border-amber-500/50 text-white focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label className="text-amber-200 font-medium">Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={editFormData.duration || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, duration: parseInt(e.target.value) })}
                    className="bg-gray-600/70 border-amber-500/50 text-white focus:border-amber-400"
                  />
                </div>
              </>
            )}

            {/* Journal-specific fields */}
            {type === "journal" && (
              <>
                <div>
                  <Label className="text-amber-200 font-medium">Title (Optional)</Label>
                  <Input
                    value={editFormData.title || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="bg-gray-600/70 border-amber-500/50 text-white focus:border-amber-400"
                  />
                </div>
                <div>
                  <Label className="text-amber-200 font-medium">Content</Label>
                  <Textarea
                    value={editFormData.content || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                    className="bg-gray-600/70 border-amber-500/50 text-white focus:border-amber-400 min-h-[100px]"
                  />
                </div>
              </>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold hover:brightness-110"
              >
                {isUpdating ? (
                  <>
                    <Save className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button
                onClick={() => setEditingEntry(null)}
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-600"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const EntryCard = ({ title, entries, type, icon: Icon }: { 
    title: string, 
    entries: any[], 
    type: string, 
    icon: any 
  }) => {
    const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
      <Card className="bg-gradient-to-br from-gray-700/95 to-gray-800/95 border-amber-500/60 shadow-xl shadow-amber-500/20">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center">
            <Icon className="w-6 h-6 mr-3" />
            {title} ({entries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedEntries.length === 0 ? (
            <p className="text-amber-200">No {type} entries yet.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sortedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 border border-amber-500/30 rounded-lg bg-gray-600/40 hover:border-amber-400/60 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {type === "weight" && (
                        <>
                          <p className="text-lg font-semibold text-amber-400">{entry.weight} kg</p>
                          <p className="text-sm text-gray-200">{format(new Date(entry.date), "PPP")}</p>
                        </>
                      )}
                      {type === "exercise" && (
                        <>
                          <p className="font-semibold text-white">{entry.description}</p>
                          {entry.duration && <p className="text-sm text-amber-200">{entry.duration} minutes</p>}
                          <p className="text-sm text-gray-200">{format(new Date(entry.date), "PPP")}</p>
                        </>
                      )}
                      {type === "journal" && (
                        <>
                          {entry.title && <p className="font-semibold text-white">{entry.title}</p>}
                          <p className="text-sm text-white line-clamp-2">{entry.content.substring(0, 100)}...</p>
                          <p className="text-sm text-gray-200">{format(new Date(entry.date), "PPP")}</p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(type, entry)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(type, entry.id)}
                        disabled={isDeleting === entry.id}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isDeleting === entry.id ? (
                          <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const totalEntries = weightEntries.length + exerciseEntries.length + journalEntries.length

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white">
        {/* Header */}
        <header className="py-4 md:py-6 px-4 md:px-8 border-b border-amber-500/50 sticky top-0 bg-gray-900/95 backdrop-blur-xl z-10 shadow-lg shadow-amber-500/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                Edit Your Data
              </h1>
            </div>
            <div className="text-amber-300 text-sm md:text-base">
              Total: {totalEntries} entries
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <EntryCard 
                title="Weight Logs" 
                entries={weightEntries} 
                type="weight" 
                icon={Scale} 
              />
              <EntryCard 
                title="Exercise Logs" 
                entries={exerciseEntries} 
                type="exercise" 
                icon={Dumbbell} 
              />
              <EntryCard 
                title="Journal Entries" 
                entries={journalEntries} 
                type="journal" 
                icon={BookText} 
              />
            </div>
          </div>
        </main>

        {/* Edit Dialog */}
        <EditDialog />

        <footer className="text-center p-6 border-t border-amber-500/30 text-sm text-amber-300">
          <p>&copy; {new Date().getFullYear()} Your Journey. Manage your data with confidence! ✨</p>
        </footer>
      </div>
    </ErrorBoundary>
  )
} 