import '../models/exercise.dart';

const List<Exercise> kExercises = [
  // Beginner exercises
  Exercise(
    id: 'b1',
    level: 'beginner',
    name: 'Push-ups',
    description:
        'Start in a high plank position with your hands shoulder-width apart. Lower your body until your chest nearly touches the floor, elbows at ~45°. Push back up. Keep core tight.',
    imageUrl: 'https://i.imgur.com/4ZQ2vXQ.png',
    sets: 3,
    reps: 10,
    restBetweenSets: 60,
    restAfterExercise: 90,
  ),
  Exercise(
    id: 'b2',
    level: 'beginner',
    name: 'Bodyweight Squat',
    description:
        'Stand with feet shoulder-width. Push hips back and bend knees to lower until thighs parallel to floor. Drive through heels to stand. Keep chest up.',
    imageUrl: 'https://i.imgur.com/Nzb8gWJ.png',
    sets: 3,
    reps: 12,
    restBetweenSets: 60,
    restAfterExercise: 90,
  ),
  // Intermediate exercises
  Exercise(
    id: 'i1',
    level: 'intermediate',
    name: 'Bench Press',
    description:
        'Lie on bench, grip bar slightly wider than shoulder-width. Lower bar to mid-chest while keeping elbows at 45°. Press bar back up, locking arms.',
    imageUrl: 'https://i.imgur.com/uVwqzjS.png',
    sets: 4,
    reps: 8,
    restBetweenSets: 90,
    restAfterExercise: 120,
  ),
  Exercise(
    id: 'i2',
    level: 'intermediate',
    name: 'Barbell Back Squat',
    description:
        'Position bar across traps, stand with feet shoulder-width. Sit back and down until hips below knees. Drive up through heels, keeping chest high.',
    imageUrl: 'https://i.imgur.com/tjkaX0y.png',
    sets: 4,
    reps: 6,
    restBetweenSets: 120,
    restAfterExercise: 150,
  ),
  // Advanced exercises
  Exercise(
    id: 'a1',
    level: 'advanced',
    name: 'Deadlift',
    description:
        'Stand mid-foot under barbell, hip-width stance. Grip bar just outside legs. Keep back neutral, chest up. Drive through floor, extend hips and knees simultaneously.',
    imageUrl: 'https://i.imgur.com/24Lxxtw.png',
    sets: 5,
    reps: 5,
    restBetweenSets: 180,
    restAfterExercise: 180,
  ),
  Exercise(
    id: 'a2',
    level: 'advanced',
    name: 'Weighted Pull-ups',
    description:
        'Attach weight belt. Hang from bar, hands shoulder-width. Pull chin above bar keeping chest up and elbows down. Lower with control.',
    imageUrl: 'https://i.imgur.com/mg9QWH8.png',
    sets: 4,
    reps: 6,
    restBetweenSets: 150,
    restAfterExercise: 180,
  ),
];