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

interface WorkoutHistoryScreenProps {
  navigation: any;
}

interface WorkoutSession {
  id: string;
  date: string;
  name: string;
  duration: number;
  exercises: number;
  calories: number;
  type: 'strength' | 'cardio' | 'mixed';
}

const WorkoutHistoryScreen: React.FC<WorkoutHistoryScreenProps> = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  // Моковые данные истории тренировок
  const workoutHistory: WorkoutSession[] = [
    {
      id: '1',
      date: '2024-01-15',
      name: 'Силовая тренировка',
      duration: 75,
      exercises: 6,
      calories: 450,
      type: 'strength'
    },
    {
      id: '2',
      date: '2024-01-13',
      name: 'Кардио сессия',
      duration: 45,
      exercises: 4,
      calories: 320,
      type: 'cardio'
    },
    {
      id: '3',
      date: '2024-01-11',
      name: 'Смешанная тренировка',
      duration: 60,
      exercises: 5,
      calories: 380,
      type: 'mixed'
    },
    {
      id: '4',
      date: '2024-01-09',
      name: 'Силовая тренировка',
      duration: 80,
      exercises: 7,
      calories: 520,
      type: 'strength'
    },
    {
      id: '5',
      date: '2024-01-07',
      name: 'Кардио сессия',
      duration: 50,
      exercises: 3,
      calories: 350,
      type: 'cardio'
    },
    {
      id: '6',
      date: '2024-01-05',
      name: 'Смешанная тренировка',
      duration: 65,
      exercises: 6,
      calories: 410,
      type: 'mixed'
    },
  ];

  const periodLabels = {
    week: 'Неделя',
    month: 'Месяц',
    all: 'Все время'
  };

  const typeColors = {
    strength: ['#FF6B6B', '#FF8E8E'],
    cardio: ['#4ECDC4', '#6EE7DF'],
    mixed: ['#45B7D1', '#6BC5D8']
  };

  const typeLabels = {
    strength: 'Сила',
    cardio: 'Кардио',
    mixed: 'Смешанная'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
  };

  const renderWorkoutSession = ({ item }: { item: WorkoutSession }) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => navigation.navigate('WorkoutDetail', { session: item })}
    >
      <LinearGradient
        colors={typeColors[item.type]}
        style={styles.sessionGradient}
      >
        <View style={styles.sessionHeader}>
          <View>
            <Text style={styles.sessionName}>{item.name}</Text>
            <Text style={styles.sessionDate}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.sessionType}>
            <Text style={styles.typeText}>{typeLabels[item.type]}</Text>
          </View>
        </View>
        
        <View style={styles.sessionStats}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statText}>{formatDuration(item.duration)}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="fitness-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statText}>{item.exercises} упражнений</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statText}>{item.calories} ккал</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const totalStats = workoutHistory.reduce((acc, session) => ({
    totalSessions: acc.totalSessions + 1,
    totalDuration: acc.totalDuration + session.duration,
    totalCalories: acc.totalCalories + session.calories,
    totalExercises: acc.totalExercises + session.exercises,
  }), {
    totalSessions: 0,
    totalDuration: 0,
    totalCalories: 0,
    totalExercises: 0,
  });

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
        <Text style={styles.headerTitle}>История тренировок</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Фильтр по периодам */}
        <View style={styles.periodSelector}>
          {(['week', 'month', 'all'] as const).map((period) => (
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

        {/* Общая статистика */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Общая статистика</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.statGradient}
              >
                <Ionicons name="fitness-outline" size={32} color="white" />
                <Text style={styles.statValue}>{totalStats.totalSessions}</Text>
                <Text style={styles.statLabel}>Тренировок</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#4ECDC4', '#6EE7DF']}
                style={styles.statGradient}
              >
                <Ionicons name="time-outline" size={32} color="white" />
                <Text style={styles.statValue}>{formatDuration(totalStats.totalDuration)}</Text>
                <Text style={styles.statLabel}>Время</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#45B7D1', '#6BC5D8']}
                style={styles.statGradient}
              >
                <Ionicons name="flame-outline" size={32} color="white" />
                <Text style={styles.statValue}>{totalStats.totalCalories}</Text>
                <Text style={styles.statLabel}>Калории</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#96CEB4', '#A8D5BA']}
                style={styles.statGradient}
              >
                <Ionicons name="repeat-outline" size={32} color="white" />
                <Text style={styles.statValue}>{totalStats.totalExercises}</Text>
                <Text style={styles.statLabel}>Упражнений</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* История тренировок */}
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>История тренировок</Text>
          <FlatList
            data={workoutHistory}
            renderItem={renderWorkoutSession}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Кнопка экспорта */}
        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => navigation.navigate('ExportData')}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.exportGradient}
          >
            <Ionicons name="download-outline" size={24} color="white" />
            <Text style={styles.exportText}>Экспортировать данные</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    marginBottom: 25,
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
  historyContainer: {
    marginBottom: 25,
  },
  sessionCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sessionGradient: {
    padding: 20,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  sessionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  sessionDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sessionType: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  sessionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  exportButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 15,
    overflow: 'hidden',
  },
  exportGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  exportText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default WorkoutHistoryScreen;