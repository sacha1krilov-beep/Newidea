class Exercise {
  final String id;
  final String level; // beginner, intermediate, advanced
  final String name;
  final String description;
  final String imageUrl; // local asset or network url
  final int sets;
  final int reps;
  final int restBetweenSets; // seconds
  final int restAfterExercise; // seconds

  const Exercise({
    required this.id,
    required this.level,
    required this.name,
    required this.description,
    required this.imageUrl,
    required this.sets,
    required this.reps,
    required this.restBetweenSets,
    required this.restAfterExercise,
  });
}