import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface NutritionScreenProps {
  navigation: any;
}

const NutritionScreen: React.FC<NutritionScreenProps> = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');

  const activityMultipliers = {
    low: 1.2,      // Сидячий образ жизни
    medium: 1.55,  // Умеренная активность
    high: 1.725,   // Высокая активность
  };

  const goalMultipliers = {
    lose: 0.85,    // Похудение
    maintain: 1,   // Поддержание веса
    gain: 1.15,    // Набор массы
  };

  const calculateCalories = () => {
    if (!age || !weight || !height) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (ageNum < 15 || ageNum > 80) {
      Alert.alert('Ошибка', 'Возраст должен быть от 15 до 80 лет');
      return;
    }

    // Формула Миффлина-Сан Жеора
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const tdee = bmr * activityMultipliers[activityLevel];
    const targetCalories = Math.round(tdee * goalMultipliers[goal]);

    // Расчет макронутриентов
    const protein = Math.round(weightNum * 2.2); // 2.2г на кг веса
    const fat = Math.round((targetCalories * 0.25) / 9); // 25% от калорий
    const carbs = Math.round((targetCalories - protein * 4 - fat * 9) / 4);

    Alert.alert(
      'Ваши рекомендации',
      `Калории: ${targetCalories} ккал/день\n\nБелки: ${protein}г\nЖиры: ${fat}г\nУглеводы: ${carbs}г\n\nВода: ${Math.round(weightNum * 35)}мл/день`,
      [{ text: 'OK' }]
    );
  };

  const nutritionTips = [
    {
      title: 'Белки',
      description: '2.2г на кг веса для роста мышц',
      icon: 'nutrition-outline',
      color: ['#FF6B6B', '#FF8E8E'],
    },
    {
      title: 'Жиры',
      description: '25% от общего количества калорий',
      icon: 'water-outline',
      color: ['#4ECDC4', '#6EE7DF'],
    },
    {
      title: 'Углеводы',
      description: 'Оставшиеся калории после белков и жиров',
      icon: 'leaf-outline',
      color: ['#45B7D1', '#6BC5D8'],
    },
    {
      title: 'Вода',
      description: '35мл на кг веса тела',
      icon: 'droplet-outline',
      color: ['#96CEB4', '#A8D5BA'],
    },
  ];

  const mealSuggestions = [
    {
      meal: 'Завтрак',
      suggestions: ['Овсянка с ягодами', 'Яичница с овощами', 'Творог с фруктами'],
    },
    {
      meal: 'Обед',
      suggestions: ['Куриная грудка с рисом', 'Лосось с овощами', 'Индейка с гречкой'],
    },
    {
      meal: 'Ужин',
      suggestions: ['Творог с орехами', 'Рыба с салатом', 'Кефир с ягодами'],
    },
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
        <Text style={styles.headerTitle}>Питание</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Калькулятор калорий */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Калькулятор калорий</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Возраст</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="25"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Вес (кг)</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="70"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Рост (см)</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="175"
              keyboardType="numeric"
            />
          </View>

          {/* Пол */}
          <View style={styles.optionGroup}>
            <Text style={styles.inputLabel}>Пол</Text>
            <View style={styles.optionButtons}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  gender === 'male' && styles.optionButtonActive
                ]}
                onPress={() => setGender('male')}
              >
                <Text style={[
                  styles.optionText,
                  gender === 'male' && styles.optionTextActive
                ]}>Мужской</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  gender === 'female' && styles.optionButtonActive
                ]}
                onPress={() => setGender('female')}
              >
                <Text style={[
                  styles.optionText,
                  gender === 'female' && styles.optionTextActive
                ]}>Женский</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Уровень активности */}
          <View style={styles.optionGroup}>
            <Text style={styles.inputLabel}>Уровень активности</Text>
            <View style={styles.optionButtons}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  activityLevel === 'low' && styles.optionButtonActive
                ]}
                onPress={() => setActivityLevel('low')}
              >
                <Text style={[
                  styles.optionText,
                  activityLevel === 'low' && styles.optionTextActive
                ]}>Низкий</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  activityLevel === 'medium' && styles.optionButtonActive
                ]}
                onPress={() => setActivityLevel('medium')}
              >
                <Text style={[
                  styles.optionText,
                  activityLevel === 'medium' && styles.optionTextActive
                ]}>Средний</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  activityLevel === 'high' && styles.optionButtonActive
                ]}
                onPress={() => setActivityLevel('high')}
              >
                <Text style={[
                  styles.optionText,
                  activityLevel === 'high' && styles.optionTextActive
                ]}>Высокий</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Цель */}
          <View style={styles.optionGroup}>
            <Text style={styles.inputLabel}>Цель</Text>
            <View style={styles.optionButtons}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  goal === 'lose' && styles.optionButtonActive
                ]}
                onPress={() => setGoal('lose')}
              >
                <Text style={[
                  styles.optionText,
                  goal === 'lose' && styles.optionTextActive
                ]}>Похудеть</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  goal === 'maintain' && styles.optionButtonActive
                ]}
                onPress={() => setGoal('maintain')}
              >
                <Text style={[
                  styles.optionText,
                  goal === 'maintain' && styles.optionTextActive
                ]}>Поддержать</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  goal === 'gain' && styles.optionButtonActive
                ]}
                onPress={() => setGoal('gain')}
              >
                <Text style={[
                  styles.optionText,
                  goal === 'gain' && styles.optionTextActive
                ]}>Набрать</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateCalories}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.calculateGradient}
            >
              <Ionicons name="calculator-outline" size={24} color="white" />
              <Text style={styles.calculateText}>Рассчитать</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Рекомендации по макронутриентам */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Макронутриенты</Text>
          {nutritionTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <LinearGradient
                colors={tip.color}
                style={styles.tipGradient}
              >
                <Ionicons name={tip.icon as any} size={32} color="white" />
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>

        {/* Рекомендации по приемам пищи */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Рекомендации по питанию</Text>
          {mealSuggestions.map((meal, index) => (
            <View key={index} style={styles.mealCard}>
              <Text style={styles.mealTitle}>{meal.meal}</Text>
              {meal.suggestions.map((suggestion, suggestionIndex) => (
                <View key={suggestionIndex} style={styles.suggestionItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </View>
              ))}
            </View>
          ))}
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
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionGroup: {
    marginBottom: 15,
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionButtonActive: {
    backgroundColor: '#667eea',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  optionTextActive: {
    color: 'white',
  },
  calculateButton: {
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  calculateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  calculateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tipCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  tipContent: {
    marginLeft: 15,
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  mealCard: {
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
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default NutritionScreen;