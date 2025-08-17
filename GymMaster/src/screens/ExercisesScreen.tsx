import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { exercises } from '../data/exercises';
import { Exercise } from '../types';

interface ExercisesScreenProps {
  navigation: any;
}

const ExercisesScreen: React.FC<ExercisesScreenProps> = ({ navigation }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const difficultyLabels = {
    beginner: 'Начинающий',
    intermediate: 'Опытный',
    advanced: 'Профессионал'
  };

  const difficultyColors = {
    beginner: ['#4CAF50', '#66BB6A'],
    intermediate: ['#FF9800', '#FFB74D'],
    advanced: ['#F44336', '#EF5350']
  };

  const filteredExercises = exercises.filter(ex => ex.difficulty === selectedDifficulty);

  const renderExercise = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.exerciseImage} />
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.exerciseStats}>
          <View style={styles.stat}>
            <Ionicons name="repeat-outline" size={16} color="#666" />
            <Text style={styles.statText}>{item.sets} x {item.reps}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.statText}>{item.restBetweenSets}с</Text>
          </View>
        </View>
        <View style={styles.muscleGroups}>
          {item.muscleGroups.slice(0, 2).map((muscle, index) => (
            <View key={index} style={styles.muscleTag}>
              <Text style={styles.muscleText}>{muscle}</Text>
            </View>
          ))}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Упражнения</Text>
      </LinearGradient>

      <View style={styles.difficultySelector}>
        {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
          <TouchableOpacity
            key={difficulty}
            style={[
              styles.difficultyButton,
              selectedDifficulty === difficulty && styles.difficultyButtonActive
            ]}
            onPress={() => setSelectedDifficulty(difficulty)}
          >
            <LinearGradient
              colors={selectedDifficulty === difficulty ? difficultyColors[difficulty] : ['#f0f0f0', '#e0e0e0']}
              style={styles.difficultyGradient}
            >
              <Text style={[
                styles.difficultyText,
                selectedDifficulty === difficulty && styles.difficultyTextActive
              ]}>
                {difficultyLabels[difficulty]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.exercisesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  difficultySelector: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
  },
  difficultyButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  difficultyButtonActive: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  difficultyGradient: {
    padding: 12,
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  difficultyTextActive: {
    color: 'white',
  },
  exercisesList: {
    padding: 20,
    paddingTop: 10,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  exerciseStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  muscleGroups: {
    flexDirection: 'row',
  },
  muscleTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  muscleText: {
    fontSize: 10,
    color: '#666',
  },
});

export default ExercisesScreen;