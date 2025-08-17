import 'package:flutter/material.dart';
import '../models/exercise.dart';

class ExerciseDetailScreen extends StatelessWidget {
  final Exercise exercise;
  const ExerciseDetailScreen({super.key, required this.exercise});

  String get _restBetweenSets => '${exercise.restBetweenSets ~/ 60}m ${exercise.restBetweenSets % 60}s';
  String get _restAfterExercise => '${exercise.restAfterExercise ~/ 60}m ${exercise.restAfterExercise % 60}s';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(exercise.name)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Image.network(
                exercise.imageUrl,
                width: double.infinity,
                height: 220,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 16),
            Text('Description', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 4),
            Text(exercise.description),
            const SizedBox(height: 16),
            Text('Routine', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 4),
            Text('${exercise.sets} sets x ${exercise.reps} reps'),
            const SizedBox(height: 4),
            Text('Rest between sets: $_restBetweenSets'),
            const SizedBox(height: 4),
            Text('Rest after exercise: $_restAfterExercise'),
          ],
        ),
      ),
    );
  }
}