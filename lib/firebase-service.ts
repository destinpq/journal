import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot, 
  Timestamp,
  doc,
  updateDoc,
  deleteDoc 
} from "firebase/firestore";
import { db } from "./firebase";
import type { WeightEntry, ExerciseEntry, JournalEntry } from "./types";

// Collection names
const COLLECTIONS = {
  WEIGHT: "weightEntries",
  EXERCISE: "exerciseEntries", 
  JOURNAL: "journalEntries"
} as const;

// Convert Firestore data to app data format
const convertTimestampToDate = (timestamp: any) => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
};

// Weight Entries
export const addWeightEntry = async (entry: Omit<WeightEntry, "id">) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.WEIGHT), {
      ...entry,
      date: Timestamp.fromDate(entry.date),
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding weight entry:", error);
    throw error;
  }
};

export const getWeightEntries = async (): Promise<WeightEntry[]> => {
  try {
    const q = query(collection(db, COLLECTIONS.WEIGHT), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: convertTimestampToDate(doc.data().date)
    })) as WeightEntry[];
  } catch (error) {
    console.error("Error getting weight entries:", error);
    throw error;
  }
};

export const subscribeToWeightEntries = (callback: (entries: WeightEntry[]) => void) => {
  const q = query(collection(db, COLLECTIONS.WEIGHT), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: convertTimestampToDate(doc.data().date)
    })) as WeightEntry[];
    callback(entries);
  });
};

// Exercise Entries
export const addExerciseEntry = async (entry: Omit<ExerciseEntry, "id">) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.EXERCISE), {
      ...entry,
      date: Timestamp.fromDate(entry.date),
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding exercise entry:", error);
    throw error;
  }
};

export const getExerciseEntries = async (): Promise<ExerciseEntry[]> => {
  try {
    const q = query(collection(db, COLLECTIONS.EXERCISE), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: convertTimestampToDate(doc.data().date)
    })) as ExerciseEntry[];
  } catch (error) {
    console.error("Error getting exercise entries:", error);
    throw error;
  }
};

export const subscribeToExerciseEntries = (callback: (entries: ExerciseEntry[]) => void) => {
  const q = query(collection(db, COLLECTIONS.EXERCISE), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: convertTimestampToDate(doc.data().date)
    })) as ExerciseEntry[];
    callback(entries);
  });
};

// Journal Entries
export const addJournalEntry = async (entry: Omit<JournalEntry, "id">) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.JOURNAL), {
      ...entry,
      date: Timestamp.fromDate(entry.date),
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding journal entry:", error);
    throw error;
  }
};

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
  try {
    const q = query(collection(db, COLLECTIONS.JOURNAL), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: convertTimestampToDate(doc.data().date)
    })) as JournalEntry[];
  } catch (error) {
    console.error("Error getting journal entries:", error);
    throw error;
  }
};

export const subscribeToJournalEntries = (callback: (entries: JournalEntry[]) => void) => {
  const q = query(collection(db, COLLECTIONS.JOURNAL), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: convertTimestampToDate(doc.data().date)
    })) as JournalEntry[];
    callback(entries);
  });
};

// Generic delete function
export const deleteEntry = async (collection: string, id: string) => {
  try {
    await deleteDoc(doc(db, collection, id));
  } catch (error) {
    console.error(`Error deleting entry from ${collection}:`, error);
    throw error;
  }
};

// Generic update function
export const updateEntry = async (collection: string, id: string, data: any) => {
  try {
    await updateDoc(doc(db, collection, id), {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error(`Error updating entry in ${collection}:`, error);
    throw error;
  }
}; 