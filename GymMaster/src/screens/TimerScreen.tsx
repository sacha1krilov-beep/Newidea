import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../types';

const { width, height } = Dimensions.get('window');

interface TimerScreenProps {
  navigation: any;
  route: {
    params: {
      exercise?: Exercise;
    };
  };
}

const TimerScreen: React.FC<TimerScreenProps> = ({ navigation, route }) => {
  const { exercise } = route.params || {};
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'work' | 'rest' | 'break'>('work');
  const [currentSet, setCurrentSet] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const defaultRestTime = 60; // 60 секунд по умолчанию
  const defaultBreakTime = 120; // 2 минуты между упражнениями

  useEffect(() => {
    if (exercise) {
      setTimeLeft(exercise.restBetweenSets);
    } else {
      setTimeLeft(defaultRestTime);
    }
  }, [exercise]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            // Звуковой сигнал или вибрация здесь
            Alert.alert('Время истекло!', 'Можете начинать следующий подход');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (exercise) {
      setTimeLeft(exercise.restBetweenSets);
    } else {
      setTimeLeft(defaultRestTime);
    }
  };

  const setCustomTime = (seconds: number) => {
    setIsRunning(false);
    setTimeLeft(seconds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'work':
        return 'Рабочий подход';
      case 'rest':
        return 'Отдых между подходами';
      case 'break':
        return 'Отдых между упражнениями';
      default:
        return 'Таймер';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'work':
        return ['#FF6B6B', '#FF8E8E'];
      case 'rest':
        return ['#4ECDC4', '#6EE7DF'];
      case 'break':
        return ['#45B7D1', '#6BC5D8'];
      default:
        return ['#667eea', '#764ba2'];
    }
  };

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
        <Text style={styles.headerTitle}>Таймер тренировки</Text>
      </LinearGradient>

      <View style={styles.content}>
        {exercise && (
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>
              Подход {currentSet} из {exercise.sets} • {exercise.reps} повторений
            </Text>
          </View>
        )}

        <View style={styles.timerContainer}>
          <LinearGradient
            colors={getPhaseColor()}
            style={styles.timerGradient}
          >
            <Text style={styles.phaseText}>{getPhaseText()}</Text>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            
            <View style={styles.timerControls}>
              {!isRunning ? (
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={startTimer}
                >
                  <Ionicons name="play" size={32} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={pauseTimer}
                >
                  <Ionicons name="pause" size={32} color="white" />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={styles.controlButton}
                onPress={resetTimer}
              >
                <Ionicons name="refresh" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.quickTimeButtons}>
          <Text style={styles.sectionTitle}>Быстрые настройки</Text>
          <View style={styles.timeButtonsGrid}>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setCustomTime(30)}
            >
              <Text style={styles.timeButtonText}>30с</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setCustomTime(60)}
            >
              <Text style={styles.timeButtonText}>1м</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setCustomTime(90)}
            >
              <Text style={styles.timeButtonText}>1.5м</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setCustomTime(120)}
            >
              <Text style={styles.timeButtonText}>2м</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setCustomTime(180)}
            >
              <Text style={styles.timeButtonText}>3м</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setCustomTime(300)}
            >
              <Text style={styles.timeButtonText}>5м</Text>
            </TouchableOpacity>
          </View>
        </View>

        {exercise && (
          <View style={styles.exerciseStats}>
            <Text style={styles.sectionTitle}>Статистика упражнения</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Ionicons name="repeat-outline" size={24} color="#667eea" />
                <Text style={styles.statValue}>{exercise.sets}</Text>
                <Text style={styles.statLabel}>Подходов</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="fitness-outline" size={24} color="#667eea" />
                <Text style={styles.statValue}>{exercise.reps}</Text>
                <Text style={styles.statLabel}>Повторений</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={24} color="#667eea" />
                <Text style={styles.statValue}>{exercise.restBetweenSets}с</Text>
                <Text style={styles.statLabel}>Отдых</Text>
              </View>
            </View>
          </View>
        )}
      </View>
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
  exerciseInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
  },
  timerContainer: {
    marginBottom: 30,
  },
  timerGradient: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    fontWeight: '600',
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    fontFamily: 'monospace',
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  quickTimeButtons: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  timeButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  exerciseStats: {
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
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
    fontSize: 20,
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
});

export default TimerScreen;