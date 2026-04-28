import { User, Session } from './auth';
import { Habit } from '../types/habit';

// Required keys from the TRD
const USERS_KEY = 'habit-tracker-users'; //
const SESSION_KEY = 'habit-tracker-session'; //
const HABITS_KEY = 'habit-tracker-habits'; //

// Safety check for Next.js SSR
const isBrowser = typeof window !== 'undefined';

export const storage = {
  // --- USERS TABLE ---
  getUsers: (): User[] => {
    if (!isBrowser) return [];
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : []; // Returns a JSON array of users
  }, //
  saveUsers: (users: User[]) => {
    if (isBrowser) {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  },

  // --- SESSION (AUTH) ---
  getSession: (): Session | null => {
    if (!isBrowser) return null;
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null; // Returns null or session object
  }, //
  saveSession: (session: Session) => {
    if (isBrowser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  },
  clearSession: () => {
    if (isBrowser) {
      localStorage.removeItem(SESSION_KEY);
    }
  },

  // --- HABITS TABLE ---
  getHabits: (): Habit[] => {
    if (!isBrowser) return [];
    const data = localStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : []; // Returns a JSON array of habits
  }, //
  saveHabits: (habits: Habit[]) => {
    if (isBrowser) {
      localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    }
  }
};