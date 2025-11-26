#!/bin/bash

set -e

echo "🚀 Запуск развертывания (Docker Compose v2)..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
print_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Проверяем Docker Compose
if ! docker compose version &> /dev/null; then
    print_error "Docker Compose не установлен"
    exit 1
fi

# Проверяем файлы
if [ ! -f "docker-compose.yml" ]; then
    print_error "Файл docker-compose.yml не найден!"
    exit 1
fi

if [ ! -f ".env" ]; then
    print_warn "Файл .env не найден. Создаю шаблон..."
    cat > .env << EOF
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=botdb
BOT_TOKEN=your_bot_token_here
PORT=3000
EOF
    print_warn "Отредактируйте .env файл и установите реальный BOT_TOKEN!"
    exit 1
fi

# Останавливаем все
print_info "Останавливаем существующие контейнеры..."
docker compose down

# Запускаем БД
print_info "Запускаем базу данных..."
docker compose up -d db

# Ждем инициализации БД
print_info "Ожидаем запуск БД (20 секунд)..."
sleep 20

# Проверяем БД
if docker compose exec db pg_isready -U postgres; then
    print_info "✅ База данных готова"
else
    print_error "❌ База данных не запустилась"
    docker compose logs db
    exit 1
fi

# Собираем и запускаем приложение
print_info "Собираем и запускаем приложение..."
docker compose build --no-cache
docker compose up -d app

# Ждем запуска приложения
print_info "Ожидаем запуск приложения (10 секунд)..."
sleep 10

# Проверяем приложение
print_info "Проверяем статус сервисов..."
if docker compose ps | grep -q "Up"; then
    print_info "🎉 Все сервисы успешно запущены!"
    echo "================================"
    echo "📍 Локально: http://localhost:3001"
    echo "🌐 По домену: http://madkids.pilligrim28.ru"
    echo "📊 База данных: PostgreSQL на порту 5432"
    echo "================================"
else
    print_error "❌ Некоторые сервисы не запустились"
    docker compose logs
    exit 1
fi

# Показываем логи приложения
print_info "Последние логи приложения:"
docker compose logs app --tail=10