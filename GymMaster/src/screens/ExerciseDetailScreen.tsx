import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../types';

const { width } = Dimensions.get('window');

interface ExerciseDetailScreenProps {
  navigation: any;
  route: {
    params: {
      exercise: Exercise;
    };
  };
}

const ExerciseDetailScreen: React.FC<ExerciseDetailScreenProps> = ({ navigation, route }) => {
  const { exercise } = route.params;

  const difficultyColors = {
    beginner: ['#4CAF50', '#66BB6A'],
    intermediate: ['#FF9800', '#FFB74D'],
    advanced: ['#F44336', '#EF5350']
  };

  const difficultyLabels = {
    beginner: 'Начинающий',
    intermediate: 'Опытный',
    advanced: 'Профессионал'
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}м ${remainingSeconds}с` : `${remainingSeconds}с`;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: exercise.imageUrl }} style={styles.exerciseImage} />
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)']}
            style={styles.backButtonGradient}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <LinearGradient
              colors={difficultyColors[exercise.difficulty]}
              style={styles.difficultyBadge}
            >
              <Text style={styles.difficultyText}>
                {difficultyLabels[exercise.difficulty]}
              </Text>
            </LinearGradient>
          </View>

          <Text style={styles.description}>{exercise.description}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="repeat-outline" size={24} color="#667eea" />
              <Text style={styles.statValue}>{exercise.sets} x {exercise.reps}</Text>
              <Text style={styles.statLabel}>Подходы x Повторения</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time-outline" size={24} color="#667eea" />
              <Text style={styles.statValue}>{formatTime(exercise.restBetweenSets)}</Text>
              <Text style={styles.statLabel}>Отдых между подходами</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="timer-outline" size={24} color="#667eea" />
              <Text style={styles.statValue}>{formatTime(exercise.restBetweenExercises)}</Text>
              <Text style={styles.statLabel}>Отдых между упражнениями</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Мышечные группы</Text>
            <View style={styles.muscleGroups}>
              {exercise.muscleGroups.map((muscle, index) => (
                <View key={index} style={styles.muscleTag}>
                  <Text style={styles.muscleText}>{muscle}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Инструкции по выполнению</Text>
            {exercise.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Советы</Text>
            {exercise.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('Timer', { exercise })}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.startButtonGradient}
            >
              <Ionicons name="play" size={24} color="white" />
              <Text style={styles.startButtonText}>Начать тренировку</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  exerciseImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  backButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 15,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleTag: {
    backgroundColor: '#667eea',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  instructionNumber: {
    backgroundColor: '#667eea',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    flex: 1,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginLeft: 10,
    flex: 1,
  },
  startButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 15,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ExerciseDetailScreen;