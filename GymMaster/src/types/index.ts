export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  muscleGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sets: number;
  reps: number;
  restBetweenSets: number; // в секундах
  restBetweenExercises: number; // в секундах
  instructions: string[];
  tips: string[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  estimatedDuration: number; // в минутах
  category: 'strength' | 'cardio' | 'flexibility' | 'mixed';
}

export interface User {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  preferences: {
    workoutDuration: number;
    focusAreas: string[];
    equipment: string[];
  };
}