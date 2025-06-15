import { useState, useEffect } from "react";
import {
  subscribeToWeightEntries,
  subscribeToExerciseEntries, 
  subscribeToJournalEntries,
  addWeightEntry,
  addExerciseEntry,
  addJournalEntry
} from "@/lib/firebase-service";
import type { WeightEntry, ExerciseEntry, JournalEntry } from "@/lib/types";

export function useFirebaseData() {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [exerciseEntries, setExerciseEntries] = useState<ExerciseEntry[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    let unsubscribeWeight: (() => void) | undefined;
    let unsubscribeExercise: (() => void) | undefined;
    let unsubscribeJournal: (() => void) | undefined;

    try {
      // Subscribe to real-time updates
      unsubscribeWeight = subscribeToWeightEntries((entries) => {
        setWeightEntries(entries);
        setIsLoading(false);
      });

      unsubscribeExercise = subscribeToExerciseEntries((entries) => {
        setExerciseEntries(entries);
      });

      unsubscribeJournal = subscribeToJournalEntries((entries) => {
        setJournalEntries(entries);
      });

    } catch (err) {
      console.error("Error setting up Firebase subscriptions:", err);
      setError("Failed to load data from Firebase");
      setIsLoading(false);
    }

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeWeight?.();
      unsubscribeExercise?.();
      unsubscribeJournal?.();
    };
  }, []);

  const handleAddWeight = async (entry: Omit<WeightEntry, "id">) => {
    try {
      await addWeightEntry(entry);
      setError(null);
    } catch (err) {
      console.error("Error adding weight entry:", err);
      setError("Failed to save weight entry");
      throw err;
    }
  };

  const handleAddExercise = async (entry: Omit<ExerciseEntry, "id">) => {
    try {
      await addExerciseEntry(entry);
      setError(null);
    } catch (err) {
      console.error("Error adding exercise entry:", err);
      setError("Failed to save exercise entry");
      throw err;
    }
  };

  const handleAddJournal = async (entry: Omit<JournalEntry, "id">) => {
    try {
      await addJournalEntry(entry);
      setError(null);
    } catch (err) {
      console.error("Error adding journal entry:", err);
      setError("Failed to save journal entry"); 
      throw err;
    }
  };

  return {
    weightEntries,
    exerciseEntries,
    journalEntries,
    isLoading,
    error,
    handleAddWeight,
    handleAddExercise,
    handleAddJournal
  };
} 