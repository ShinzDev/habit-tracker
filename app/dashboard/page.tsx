'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/shared/ProtectedRoute';
import HabitForm from '../components/habbits/HabitForm';
import HabitCard from '../components/habbits/HabitCard';
import { storage } from '@/lib/storage';
import { Habit } from '@/types/habit';
import { toggleHabitCompletion } from '@/lib/habits';

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  // 1. Fetch only the habits belonging to the current user
  const loadHabits = () => {
    const session = storage.getSession();
    if (!session) return;
    
    const allHabits = storage.getHabits();
    // TRD Rule: render only the logged-in user’s habits
    const userHabits = allHabits.filter(h => h.userId === session.userId);
    setHabits(userHabits);
  };

  // Load habits when the dashboard first mounts
  useEffect(() => {
    loadHabits();
  }, []);

  // --- HANDLERS ---

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingHabit(undefined); // Clear edit state
    loadHabits(); // Refresh the list from local storage
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingHabit(undefined);
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleDelete = (habitId: string) => {
    const allHabits = storage.getHabits();
    const updated = allHabits.filter(h => h.id !== habitId);
    storage.saveHabits(updated); // Save to DB
    loadHabits(); // Refresh UI
  };

  const handleToggleCompletion = (habit: Habit) => {
    // Get today's date in local YYYY-MM-DD format
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    // Use the exact pure utility function required by the TRD
    const updatedHabit = toggleHabitCompletion(habit, today);

    // Save the updated habit back to storage
    const allHabits = storage.getHabits();
    const updatedList = allHabits.map(h => h.id === habit.id ? updatedHabit : h);
    storage.saveHabits(updatedList);
    
    loadHabits(); // Refresh UI
  };

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    storage.clearSession();
    window.location.href = '/login'; // Force a hard redirect to clear memory
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pb-10">
        {/* Navbar */}
        <header className="bg-white shadow-sm mb-6 p-4">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">Habit Tracker</h1>
            <button 
              onClick={handleLogout}
              data-testid="auth-logout-button" // Exact TRD requirement
              className="text-sm text-gray-500 hover:text-gray-900 transition"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4" data-testid="dashboard-page">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Habits</h2>
            
            {!showForm && (
              <button 
                onClick={() => setShowForm(true)}
                data-testid="create-habit-button" // Exact TRD requirement
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
              >
                + New Habit
              </button>
            )}
          </div>
          
          {/* Form Area */}
          {showForm && (
            <div className="mb-8">
              <HabitForm 
                existingHabit={editingHabit}
                onSuccess={handleFormSuccess} 
                onCancel={handleCancelForm} 
              />
            </div>
          )}

          {/* List Area */}
          {!showForm && habits.length === 0 ? (
            <div data-testid="empty-state" className="text-gray-500 text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-white">
              <p className="text-lg">You have no habits yet.</p>
              <p className="text-sm mt-1">Click the button above to create one!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {habits.map(habit => (
                <HabitCard 
                  key={habit.id}
                  habit={habit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleCompletion={handleToggleCompletion}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}