import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const profileData = {
    name: 'Александр',
    level: 'Опытный',
    workoutsCompleted: 24,
    totalTime: 1200, // в минутах
    streak: 7, // дней подряд
    achievements: 8,
  };

  const settingsItems = [
    {
      title: 'Уведомления',
      subtitle: 'Напоминания о тренировках',
      icon: 'notifications-outline',
      type: 'switch',
      value: notifications,
      onValueChange: setNotifications,
    },
    {
      title: 'Звуки',
      subtitle: 'Звуковые сигналы таймера',
      icon: 'volume-high-outline',
      type: 'switch',
      value: soundEnabled,
      onValueChange: setSoundEnabled,
    },
    {
      title: 'Вибрация',
      subtitle: 'Вибрация при уведомлениях',
      icon: 'phone-portrait-outline',
      type: 'switch',
      value: vibrationEnabled,
      onValueChange: setVibrationEnabled,
    },
    {
      title: 'Темная тема',
      subtitle: 'Переключить темную тему',
      icon: 'moon-outline',
      type: 'switch',
      value: darkMode,
      onValueChange: setDarkMode,
    },
  ];

  const menuItems = [
    {
      title: 'Мои цели',
      subtitle: 'Управление целями тренировок',
      icon: 'target-outline',
      action: () => navigation.navigate('Goals'),
    },
    {
      title: 'История тренировок',
      subtitle: 'Просмотр прошлых тренировок',
      icon: 'time-outline',
      action: () => navigation.navigate('WorkoutHistory'),
    },
    {
      title: 'Избранные упражнения',
      subtitle: 'Ваши любимые упражнения',
      icon: 'heart-outline',
      action: () => navigation.navigate('Favorites'),
    },
    {
      title: 'Экспорт данных',
      subtitle: 'Сохранить прогресс',
      icon: 'download-outline',
      action: () => exportData(),
    },
    {
      title: 'О приложении',
      subtitle: 'Версия и информация',
      icon: 'information-circle-outline',
      action: () => navigation.navigate('About'),
    },
  ];

  const exportData = () => {
    Alert.alert(
      'Экспорт данных',
      'Ваши данные будут сохранены в файл. Продолжить?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Экспорт', onPress: () => Alert.alert('Успех', 'Данные экспортированы!') },
      ]
    );
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
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
        <Text style={styles.headerTitle}>Профиль</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Профиль пользователя */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.profileCard}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="white" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profileData.name}</Text>
                <Text style={styles.profileLevel}>{profileData.level}</Text>
              </View>
            </View>
            
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{profileData.workoutsCompleted}</Text>
                <Text style={styles.statLabel}>Тренировок</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatTime(profileData.totalTime)}</Text>
                <Text style={styles.statLabel}>Время</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{profileData.streak}</Text>
                <Text style={styles.statLabel}>Дней подряд</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{profileData.achievements}</Text>
                <Text style={styles.statLabel}>Достижений</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Настройки */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          {settingsItems.map((item, index) => (
            <View key={index} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name={item.icon as any} size={24} color="#667eea" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.onValueChange}
                trackColor={{ false: '#e0e0e0', true: '#667eea' }}
                thumbColor={item.value ? '#fff' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        {/* Меню */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Меню</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={24} color="#667eea" />
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Выход */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => Alert.alert('Выход', 'Вы уверены, что хотите выйти?')}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Выйти из аккаунта</Text>
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
  profileSection: {
    marginBottom: 25,
  },
  profileCard: {
    borderRadius: 20,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  profileLevel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
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
  settingItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuText: {
    marginLeft: 15,
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 15,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ProfileScreen;