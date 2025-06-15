// This script helps seed initial data to Firebase for testing
// Run this from the browser console or create a temporary page to execute it

import { 
  addWeightEntry, 
  addExerciseEntry, 
  addJournalEntry 
} from "@/lib/firebase-service";

export const seedInitialData = async () => {
  try {
    console.log("Starting to seed initial data...");

    // Seed weight entries
    const weightEntries = [
      { date: new Date(2025, 4, 1), weight: 85 },
      { date: new Date(2025, 4, 15), weight: 84 },
      { date: new Date(2025, 5, 1), weight: 83.5 },
      { date: new Date(2025, 5, 15), weight: 82 },
    ];

    for (const entry of weightEntries) {
      await addWeightEntry(entry);
      console.log(`Added weight entry: ${entry.weight}kg on ${entry.date.toDateString()}`);
    }

    // Seed exercise entries
    const exerciseEntries = [
      { date: new Date(2025, 5, 14), description: "Evening 3km run", duration: 25 },
      { date: new Date(2025, 5, 15), description: "Full body workout at gym", duration: 60 },
    ];

    for (const entry of exerciseEntries) {
      await addExerciseEntry(entry);
      console.log(`Added exercise entry: ${entry.description}`);
    }

    // Seed journal entries
    const journalEntries = [
      {
        date: new Date(2025, 5, 14),
        title: "Productive Day",
        content: "Managed to stick to my diet and got a run in. Feeling good.",
      },
      {
        date: new Date(2025, 5, 15),
        title: "Weekend Reflections",
        content: "Gym session was tough but rewarding. Need to focus on hydration more.",
      },
    ];

    for (const entry of journalEntries) {
      await addJournalEntry(entry);
      console.log(`Added journal entry: ${entry.title}`);
    }

    console.log("✅ All initial data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
};

// Usage instructions:
// 1. Open your app in the browser
// 2. Open developer console
// 3. Import this function and run: seedInitialData()
console.log("Seed script loaded. Run 'seedInitialData()' to populate initial data."); 