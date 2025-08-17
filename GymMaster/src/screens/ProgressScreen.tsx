import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ProgressScreenProps {
  navigation: any;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Моковые данные для демонстрации
  const progressData = {
    week: {
      workouts: 4,
      totalTime: 180,
      calories: 1200,
      exercises: 15
    },
    month: {
      workouts: 16,
      totalTime: 720,
      calories: 4800,
      exercises: 60
    },
    year: {
      workouts: 192,
      totalTime: 8640,
      calories: 57600,
      exercises: 720
    }
  };

  const periodLabels = {
    week: 'Неделя',
    month: 'Месяц',
    year: 'Год'
  };

  const currentData = progressData[selectedPeriod];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
  };

  const achievements = [
    {
      title: 'Первая тренировка',
      description: 'Завершили первую тренировку',
      icon: 'trophy',
      completed: true,
      color: ['#FFD700', '#FFA500']
    },
    {
      title: 'Неделя тренировок',
      description: 'Тренировались 7 дней подряд',
      icon: 'calendar',
      completed: true,
      color: ['#4CAF50', '#66BB6A']
    },
    {
      title: 'Силач',
      description: 'Выполнили 100 подходов',
      icon: 'fitness',
      completed: false,
      color: ['#FF6B6B', '#FF8E8E']
    },
    {
      title: 'Выносливость',
      description: 'Тренировались 30 дней',
      icon: 'trending-up',
      completed: false,
      color: ['#45B7D1', '#6BC5D8']
    }
  ];

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
        <Text style={styles.headerTitle}>Мой прогресс</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.periodSelector}>
          {(['week', 'month', 'year'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive
              ]}>
                {periodLabels[period]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Статистика за {periodLabels[selectedPeriod].toLowerCase()}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.statGradient}
              >
                <Ionicons name="fitness-outline" size={32} color="white" />
                <Text style={styles.statValue}>{currentData.workouts}</Text>
                <Text style={styles.statLabel}>Тренировок</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#4ECDC4', '#6EE7DF']}
                style={styles.statGradient}
              >
                <Ionicons name="time-outline" size={32} color="white" />
                <Text style={styles.statValue}>{formatTime(currentData.totalTime)}</Text>
                <Text style={styles.statLabel}>Время</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#45B7D1', '#6BC5D8']}
                style={styles.statGradient}
              >
                <Ionicons name="flame-outline" size={32} color="white" />
                <Text style={styles.statValue}>{currentData.calories}</Text>
                <Text style={styles.statLabel}>Калории</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#96CEB4', '#A8D5BA']}
                style={styles.statGradient}
              >
                <Ionicons name="repeat-outline" size={32} color="white" />
                <Text style={styles.statValue}>{currentData.exercises}</Text>
                <Text style={styles.statLabel}>Упражнений</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Достижения</Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <LinearGradient
                colors={achievement.completed ? achievement.color : ['#f0f0f0', '#e0e0e0']}
                style={styles.achievementGradient}
              >
                <View style={styles.achievementContent}>
                  <View style={styles.achievementLeft}>
                    <Ionicons 
                      name={achievement.icon as any} 
                      size={32} 
                      color={achievement.completed ? 'white' : '#ccc'} 
                    />
                    <View style={styles.achievementText}>
                      <Text style={[
                        styles.achievementTitle,
                        achievement.completed && styles.achievementTitleCompleted
                      ]}>
                        {achievement.title}
                      </Text>
                      <Text style={[
                        styles.achievementDescription,
                        achievement.completed && styles.achievementDescriptionCompleted
                      ]}>
                        {achievement.description}
                      </Text>
                    </View>
                  </View>
                  {achievement.completed && (
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                  )}
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>

        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>Цели на месяц</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Тренировки</Text>
              <Text style={styles.goalProgress}>12 / 20</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
          </View>
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Время тренировок</Text>
              <Text style={styles.goalProgress}>8ч / 15ч</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '53%' }]} />
            </View>
          </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  periodButtonActive: {
    backgroundColor: '#667eea',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  periodTextActive: {
    color: 'white',
  },
  statsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  achievementsContainer: {
    marginBottom: 30,
  },
  achievementCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  achievementGradient: {
    padding: 20,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  achievementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  achievementText: {
    marginLeft: 15,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  achievementTitleCompleted: {
    color: 'white',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#999',
  },
  achievementDescriptionCompleted: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  goalsContainer: {
    marginBottom: 30,
  },
  goalCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  goalProgress: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 4,
  },
});

export default ProgressScreen;