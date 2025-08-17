import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { exercises } from '../data/exercises';
import { Exercise } from '../types';

interface FavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  // Моковые избранные упражнения (ID упражнений)
  const [favoriteIds, setFavoriteIds] = useState(['1', '3', '6', '9', '12']);
  
  const favoriteExercises = exercises.filter(ex => favoriteIds.includes(ex.id));

  const removeFromFavorites = (exerciseId: string) => {
    Alert.alert(
      'Удалить из избранного',
      'Вы уверены, что хотите удалить это упражнение из избранного?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            setFavoriteIds(prev => prev.filter(id => id !== exerciseId));
          }
        },
      ]
    );
  };

  const renderFavoriteExercise = ({ item }: { item: Exercise }) => (
    <View style={styles.exerciseCard}>
      <TouchableOpacity
        style={styles.exerciseContent}
        onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
      >
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
        <View style={styles.exerciseActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Timer', { exercise: item })}
          >
            <Ionicons name="play" size={20} color="#667eea" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => removeFromFavorites(item.id)}
          >
            <Ionicons name="heart" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

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

  const stats = {
    total: favoriteExercises.length,
    beginner: favoriteExercises.filter(ex => ex.difficulty === 'beginner').length,
    intermediate: favoriteExercises.filter(ex => ex.difficulty === 'intermediate').length,
    advanced: favoriteExercises.filter(ex => ex.difficulty === 'advanced').length,
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
        <Text style={styles.headerTitle}>Избранные упражнения</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Статистика избранного */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Ваши избранные</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.statGradient}
              >
                <Ionicons name="heart" size={32} color="white" />
                <Text style={styles.statValue}>{stats.total}</Text>
                <Text style={styles.statLabel}>Всего</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#4CAF50', '#66BB6A']}
                style={styles.statGradient}
              >
                <Ionicons name="fitness-outline" size={32} color="white" />
                <Text style={styles.statValue}>{stats.beginner}</Text>
                <Text style={styles.statLabel}>Начинающий</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#FF9800', '#FFB74D']}
                style={styles.statGradient}
              >
                <Ionicons name="fitness-outline" size={32} color="white" />
                <Text style={styles.statValue}>{stats.intermediate}</Text>
                <Text style={styles.statLabel}>Опытный</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#F44336', '#EF5350']}
                style={styles.statGradient}
              >
                <Ionicons name="fitness-outline" size={32} color="white" />
                <Text style={styles.statValue}>{stats.advanced}</Text>
                <Text style={styles.statLabel}>Профессионал</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Список избранных упражнений */}
        <View style={styles.favoritesContainer}>
          <Text style={styles.sectionTitle}>Упражнения</Text>
          {favoriteExercises.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={64} color="#ccc" />
              <Text style={styles.emptyTitle}>Нет избранных упражнений</Text>
              <Text style={styles.emptyDescription}>
                Добавьте упражнения в избранное, чтобы быстро к ним обращаться
              </Text>
              <TouchableOpacity
                style={styles.browseButton}
                onPress={() => navigation.navigate('Exercises')}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.browseGradient}
                >
                  <Ionicons name="search" size={20} color="white" />
                  <Text style={styles.browseText}>Найти упражнения</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={favoriteExercises}
              renderItem={renderFavoriteExercise}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {/* Быстрые действия */}
        {favoriteExercises.length > 0 && (
          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Быстрые действия</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('Timer')}
              >
                <LinearGradient
                  colors={['#4ECDC4', '#6EE7DF']}
                  style={styles.actionGradient}
                >
                  <Ionicons name="play-circle" size={32} color="white" />
                  <Text style={styles.actionTitle}>Быстрая тренировка</Text>
                  <Text style={styles.actionDescription}>
                    Начать тренировку с избранными упражнениями
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate('Exercises')}
              >
                <LinearGradient
                  colors={['#45B7D1', '#6BC5D8']}
                  style={styles.actionGradient}
                >
                  <Ionicons name="add-circle" size={32} color="white" />
                  <Text style={styles.actionTitle}>Добавить еще</Text>
                  <Text style={styles.actionDescription}>
                    Найти и добавить новые упражнения
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  favoritesContainer: {
    marginBottom: 25,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  exerciseContent: {
    flexDirection: 'row',
    padding: 15,
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
  exerciseActions: {
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  browseButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  browseGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  browseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  actionsContainer: {
    marginBottom: 25,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default FavoritesScreen;