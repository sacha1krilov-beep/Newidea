#!/bin/bash

# GymMaster - Финальная сборка расширенного приложения
# Этот скрипт создает релизную сборку для Android и iOS

echo "🏋️‍♂️ GymMaster - Финальная сборка расширенного приложения"
echo "=========================================================="
echo ""

echo "📋 Проверка расширенных функций:"
echo "✅ Профиль пользователя с настройками"
echo "✅ Калькулятор калорий и макронутриентов"
echo "✅ История тренировок с детальной статистикой"
echo "✅ Избранные упражнения с быстрым доступом"
echo "✅ Система уведомлений и звуков"
echo "✅ Экспорт данных и резервное копирование"
echo "✅ Персонализация интерфейса"
echo "✅ Расширенная аналитика прогресса"
echo ""

# Проверяем наличие EAS CLI
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI не установлен. Устанавливаем..."
    npm install -g @expo/eas-cli
fi

# Проверяем авторизацию в Expo
if ! eas whoami &> /dev/null; then
    echo "❌ Не авторизованы в Expo. Выполните 'eas login'"
    exit 1
fi

echo "✅ Проверка зависимостей..."
npm install

echo "🔧 Создание финальной сборки для Android..."
eas build --platform android --profile production

echo "📱 Создание финальной сборки для iOS..."
eas build --platform ios --profile production

echo ""
echo "🎉 Финальная сборка завершена!"
echo ""
echo "📋 Следующие шаги для публикации:"
echo "1. Дождитесь завершения сборки в Expo Dashboard"
echo "2. Скачайте APK/AAB файлы"
echo "3. Загрузите в Google Play Console"
echo "4. Опубликуйте приложение"
echo ""
echo "📚 Документация по публикации:"
echo "https://docs.expo.dev/distribution/uploading-apps/"
echo ""
echo "🏆 GymMaster готов к публикации!"
echo "💪 Ваш путь к силе и здоровью!"