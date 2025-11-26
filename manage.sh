#!/bin/bash

CMD=${1:-help}

case $CMD in
    start)
        docker compose up -d
        ;;
    stop)
        docker compose down
        ;;
    restart)
        docker compose restart
        ;;
    logs)
        docker compose logs -f app
        ;;
    logs-db)
        docker compose logs -f db
        ;;
    status)
        docker compose ps
        ;;
    update)
        docker compose down
        docker compose build --no-cache
        docker compose up -d
        ;;
    backup)
        mkdir -p backups
        docker compose exec db pg_dump -U postgres botdb > backups/backup_$(date +%Y%m%d_%H%M%S).sql
        echo "✅ Бэкап создан"
        ;;
    help)
        echo "Использование: $0 [команда]"
        echo "Команды: start, stop, restart, logs, logs-db, status, update, backup"
        ;;
    *)
        echo "Неизвестная команда: $CMD"
        ;;
esac