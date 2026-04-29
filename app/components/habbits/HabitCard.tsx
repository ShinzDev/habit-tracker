'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';
import { getHabitSlug } from '@/lib/slug';
import { calculateCurrentStreak } from '@/lib/streaks';

type HabitCardProps = {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onToggleCompletion: (habit: Habit) => void;
};

export default function HabitCard({ habit, onEdit, onDelete, onToggleCompletion }: HabitCardProps) {
  // State for the explicit delete confirmation rule
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // 1. Generate the slug for our test IDs
  const slug = getHabitSlug(habit.name);

  // 2. Safely get today's date in local YYYY-MM-DD format
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  
  // 3. Calculate streak and completion status
  const streak = calculateCurrentStreak(habit.completions, today);
  const isCompletedToday = habit.completions.includes(today);

  return (
    <div 
      data-testid={`habit-card-${slug}`} // Exact TRD requirement
      className={`p-4 border rounded-lg shadow-sm transition-colors ${
        isCompletedToday ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{habit.name}</h3>
          {habit.description && <p className="text-gray-600 text-sm mt-1">{habit.description}</p>}
          
          <p 
            data-testid={`habit-streak-${slug}`} // Exact TRD requirement
            className="text-sm font-medium mt-3 text-blue-600 flex items-center gap-1"
          >
            🔥 Streak: {streak}
          </p>
        </div>
        
        <div className="flex flex-col gap-3 items-end">
          <button 
            onClick={() => onToggleCompletion(habit)} 
            data-testid={`habit-complete-${slug}`} // Exact TRD requirement
            className={`px-4 py-2 rounded font-medium transition ${
              isCompletedToday 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
            }`}
          >
            {isCompletedToday ? '✓ Completed' : 'Mark Complete'}
          </button>
          
          <div className="flex gap-3 justify-end items-center mt-1">
            <button 
              onClick={() => onEdit(habit)}
              data-testid={`habit-edit-${slug}`} // Exact TRD requirement
              className="text-sm text-gray-500 hover:text-blue-600 transition"
            >
              Edit
            </button>
            
            {/* TRD Rule: explicit confirmation for deletion */}
            {!showDeleteConfirm ? (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                data-testid={`habit-delete-${slug}`} // Exact TRD requirement
                className="text-sm text-gray-500 hover:text-red-600 transition"
              >
                Delete
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-50 p-1 rounded border border-red-100">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-xs text-gray-600 hover:text-gray-900 px-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => onDelete(habit.id)}
                  data-testid="confirm-delete-button" // Exact TRD requirement
                  className="text-xs text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded transition"
                >
                  Confirm Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}