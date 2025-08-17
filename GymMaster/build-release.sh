#!/bin/bash

# GymMaster - Скрипт сборки релизной версии
# Этот скрипт создает релизную сборку для Android

echo "🏋️‍♂️ GymMaster - Сборка релизной версии"
echo "========================================"

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

echo "🔧 Сборка для Android..."
eas build --platform android --profile production

echo "📱 Сборка для iOS..."
eas build --platform ios --profile production

echo "🎉 Сборка завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Дождитесь завершения сборки в Expo Dashboard"
echo "2. Скачайте APK/AAB файлы"
echo "3. Загрузите в Google Play Console"
echo "4. Опубликуйте приложение"
echo ""
echo "📚 Документация по публикации:"
echo "https://docs.expo.dev/distribution/uploading-apps/"