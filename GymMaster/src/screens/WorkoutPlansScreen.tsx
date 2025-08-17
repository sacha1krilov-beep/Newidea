import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { workoutPlans } from '../data/workoutPlans';
import { WorkoutPlan } from '../types';

interface WorkoutPlansScreenProps {
  navigation: any;
}

const WorkoutPlansScreen: React.FC<WorkoutPlansScreenProps> = ({ navigation }) => {
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

  const categoryColors = {
    strength: ['#FF6B6B', '#FF8E8E'],
    cardio: ['#4ECDC4', '#6EE7DF'],
    flexibility: ['#45B7D1', '#6BC5D8'],
    mixed: ['#96CEB4', '#A8D5BA']
  };

  const categoryLabels = {
    strength: 'Сила',
    cardio: 'Кардио',
    flexibility: 'Гибкость',
    mixed: 'Смешанная'
  };

  const filteredPlans = workoutPlans.filter(plan => plan.difficulty === selectedDifficulty);

  const renderWorkoutPlan = ({ item }: { item: WorkoutPlan }) => (
    <TouchableOpacity
      style={styles.planCard}
      onPress={() => navigation.navigate('WorkoutPlanDetail', { plan: item })}
    >
      <LinearGradient
        colors={categoryColors[item.category]}
        style={styles.planCardGradient}
      >
        <View style={styles.planHeader}>
          <View>
            <Text style={styles.planName}>{item.name}</Text>
            <Text style={styles.planDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
        
        <View style={styles.planStats}>
          <View style={styles.planStat}>
            <Ionicons name="fitness-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.planStatText}>{item.exercises.length} упражнений</Text>
          </View>
          <View style={styles.planStat}>
            <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.planStatText}>{item.estimatedDuration} мин</Text>
          </View>
          <View style={styles.planStat}>
            <Ionicons name="trophy-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.planStatText}>{categoryLabels[item.category]}</Text>
          </View>
        </View>
      </LinearGradient>
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
        <Text style={styles.headerTitle}>Программы тренировок</Text>
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
        data={filteredPlans}
        renderItem={renderWorkoutPlan}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.plansList}
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
  plansList: {
    padding: 20,
    paddingTop: 10,
  },
  planCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  planCardGradient: {
    padding: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    flex: 1,
  },
  planDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
    flex: 1,
  },
  planStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planStatText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
});

export default WorkoutPlansScreen;