import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const GymFitApp());
}

class GymFitApp extends StatelessWidget {
  const GymFitApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GymFit',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const HomeScreen(),
    );
  }
}