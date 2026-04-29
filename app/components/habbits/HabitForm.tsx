'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';
import { storage } from '@/lib/storage';
import { validateHabitName } from '@/lib/validators';

// We define props so this form can be used for BOTH creating and editing
type HabitFormProps = {
  existingHabit?: Habit;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function HabitForm({ existingHabit, onSuccess, onCancel }: HabitFormProps) {
  const [name, setName] = useState(existingHabit?.name || '');
  const [description, setDescription] = useState(existingHabit?.description || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Run the name through our strict TRD validation utility
    const validation = validateHabitName(name);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    // 2. Get current session to attach the habit to the logged-in user
    const session = storage.getSession();
    if (!session) return; 

    const currentHabits = storage.getHabits();

    if (existingHabit) {
      // --- EDIT MODE ---
      const updatedHabits = currentHabits.map(h => {
        if (h.id === existingHabit.id) {
          return {
            ...h, // Spread operator preserves the id, createdAt, and completions array
            name: validation.value, // Use the trimmed, validated value
            description: description.trim(),
          };
        }
        return h;
      });
      storage.saveHabits(updatedHabits);
    } else {
      // --- CREATE MODE ---
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        userId: session.userId, 
        name: validation.value,
        description: description.trim(),
        frequency: 'daily', // Hardcoded as per TRD
        createdAt: new Date().toISOString(),
        completions: [],
      };
      storage.saveHabits([...currentHabits, newHabit]);
    }

    // 3. Tell the parent dashboard to close the form and refresh the list
    onSuccess();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      data-testid="habit-form" // Exact TRD requirement
      className="flex flex-col gap-4 border border-gray-200 p-4 rounded-lg bg-white shadow-sm"
    >
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <div className="flex flex-col gap-1">
        <label htmlFor="habit-name" className="font-medium text-gray-700">Habit Name</label>
        <input
          id="habit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="habit-name-input" //
          className="border p-2 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g., Drink Water"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="habit-description" className="font-medium text-gray-700">Description (Optional)</label>
        <textarea
          id="habit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="habit-description-input" //
          className="border p-2 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="habit-frequency" className="font-medium text-gray-700">Frequency</label>
        {/* We disable this select because the TRD strictly says "frequency remains daily" */}
        <select
          id="habit-frequency"
          disabled
          data-testid="habit-frequency-select" //
          className="border p-2 rounded text-gray-500 bg-gray-100 cursor-not-allowed"
        >
          <option value="daily">Daily</option>
        </select>
      </div>

      <div className="flex gap-3 justify-end mt-2">
        <button 
          type="button" 
          onClick={onCancel} 
          className="px-4 py-2 border rounded hover:bg-gray-50 text-gray-700 transition"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          data-testid="habit-save-button" //
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {existingHabit ? 'Save Changes' : 'Create Habit'}
        </button>
      </div>
    </form>
  );
}