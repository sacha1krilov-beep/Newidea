import { WorkoutPlan } from '../types';
import { exercises } from './exercises';

export const workoutPlans: WorkoutPlan[] = [
  // НАЧАЛЬНЫЙ УРОВЕНЬ
  {
    id: '1',
    name: 'Базовая тренировка для начинающих',
    description: 'Простая программа для тех, кто только начинает свой путь в фитнесе',
    difficulty: 'beginner',
    exercises: exercises.filter(ex => ex.difficulty === 'beginner'),
    estimatedDuration: 45,
    category: 'mixed'
  },
  {
    id: '2',
    name: 'Кардио для начинающих',
    description: 'Программа для развития выносливости и сжигания жира',
    difficulty: 'beginner',
    exercises: [
      exercises.find(ex => ex.id === '1')!,
      exercises.find(ex => ex.id === '2')!,
      exercises.find(ex => ex.id === '4')!,
      exercises.find(ex => ex.id === '3')!
    ],
    estimatedDuration: 30,
    category: 'cardio'
  },
  {
    id: '3',
    name: 'Силовая тренировка для начинающих',
    description: 'Программа для развития базовой силы',
    difficulty: 'beginner',
    exercises: [
      exercises.find(ex => ex.id === '1')!,
      exercises.find(ex => ex.id === '2')!,
      exercises.find(ex => ex.id === '5')!,
      exercises.find(ex => ex.id === '3')!
    ],
    estimatedDuration: 50,
    category: 'strength'
  },

  // СРЕДНИЙ УРОВЕНЬ
  {
    id: '4',
    name: 'Интенсивная тренировка',
    description: 'Программа для опытных спортсменов',
    difficulty: 'intermediate',
    exercises: exercises.filter(ex => ex.difficulty === 'intermediate'),
    estimatedDuration: 60,
    category: 'mixed'
  },
  {
    id: '5',
    name: 'Силовая программа',
    description: 'Фокус на развитие силы и мышечной массы',
    difficulty: 'intermediate',
    exercises: [
      exercises.find(ex => ex.id === '6')!,
      exercises.find(ex => ex.id === '7')!,
      exercises.find(ex => ex.id === '8')!,
      exercises.find(ex => ex.id === '9')!
    ],
    estimatedDuration: 70,
    category: 'strength'
  },
  {
    id: '6',
    name: 'Кардио и выносливость',
    description: 'Программа для развития выносливости',
    difficulty: 'intermediate',
    exercises: [
      exercises.find(ex => ex.id === '10')!,
      exercises.find(ex => ex.id === '6')!,
      exercises.find(ex => ex.id === '9')!,
      exercises.find(ex => ex.id === '7')!
    ],
    estimatedDuration: 55,
    category: 'cardio'
  },

  // ПРОДВИНУТЫЙ УРОВЕНЬ
  {
    id: '7',
    name: 'Элитная тренировка',
    description: 'Программа для профессиональных спортсменов',
    difficulty: 'advanced',
    exercises: exercises.filter(ex => ex.difficulty === 'advanced'),
    estimatedDuration: 90,
    category: 'mixed'
  },
  {
    id: '8',
    name: 'Максимальная сила',
    description: 'Программа для развития максимальной силы',
    difficulty: 'advanced',
    exercises: [
      exercises.find(ex => ex.id === '11')!,
      exercises.find(ex => ex.id === '12')!,
      exercises.find(ex => ex.id === '13')!,
      exercises.find(ex => ex.id === '14')!
    ],
    estimatedDuration: 100,
    category: 'strength'
  },
  {
    id: '9',
    name: 'Функциональная тренировка',
    description: 'Комплексная программа для развития всех физических качеств',
    difficulty: 'advanced',
    exercises: [
      exercises.find(ex => ex.id === '15')!,
      exercises.find(ex => ex.id === '11')!,
      exercises.find(ex => ex.id === '13')!,
      exercises.find(ex => ex.id === '14')!
    ],
    estimatedDuration: 80,
    category: 'mixed'
  }
];