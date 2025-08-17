#!/bin/bash

# GymMaster - Создание APK файла для установки на телефон
# Этот скрипт создает APK файл, который можно скачать и установить на Android телефон

echo "🏋️‍♂️ GymMaster - Создание APK файла для телефона"
echo "================================================="
echo ""

echo "📱 Создание APK файла для установки на телефон..."
echo ""

# Проверяем наличие EAS CLI
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI не установлен. Устанавливаем..."
    npm install -g @expo/eas-cli
fi

# Проверяем авторизацию в Expo
if ! eas whoami &> /dev/null; then
    echo "❌ Не авторизованы в Expo. Выполните 'eas login'"
    echo "💡 Для создания APK без авторизации используйте: npx expo build:android"
    exit 1
fi

echo "✅ Проверка зависимостей..."
npm install

echo "🔧 Создание APK файла..."
echo "📱 Это может занять 10-15 минут..."

# Создаем APK файл
eas build --platform android --profile production --local

echo ""
echo "🎉 APK файл создан!"
echo ""
echo "📋 Инструкции по установке:"
echo "1. APK файл находится в папке: ./android/app/build/outputs/apk/release/"
echo "2. Скопируйте APK файл на ваш телефон"
echo "3. На телефоне включите 'Установка из неизвестных источников'"
echo "4. Откройте APK файл и установите приложение"
echo ""
echo "📱 GymMaster готов к установке на ваш телефон!"
echo "💪 Ваш путь к силе и здоровью!"