import 'package:flutter/material.dart';
import '../models/exercise.dart';
import 'dart:async';

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
            const SizedBox(height: 24),
            Center(
              child: ElevatedButton.icon(
                icon: const Icon(Icons.timer),
                label: const Text('Start Rest Timer'),
                onPressed: () => _showRestTimer(context, exercise.restBetweenSets),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showRestTimer(BuildContext context, int seconds) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => _RestTimerDialog(initialSeconds: seconds),
    );
  }
}

class _RestTimerDialog extends StatefulWidget {
  final int initialSeconds;
  const _RestTimerDialog({required this.initialSeconds});

  @override
  State<_RestTimerDialog> createState() => _RestTimerDialogState();
}

class _RestTimerDialogState extends State<_RestTimerDialog> {
  late int remaining;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    remaining = widget.initialSeconds;
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (remaining <= 1) {
        t.cancel();
        Navigator.of(context).pop();
      } else {
        setState(() => remaining--);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Rest Timer'),
      content: Text('$remaining seconds'),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('Stop'),
        ),
      ],
    );
  }
}