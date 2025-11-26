#!/bin/bash

DOMAIN="madkids.pilligrim28.ru"
PORT="3001"

echo "🌐 Настройка Nginx для домена $DOMAIN..."

# Проверяем Nginx
if ! command -v nginx &> /dev/null; then
    echo "Установка Nginx..."
    sudo apt update
    sudo apt install nginx -y
fi

# Создаем конфиг
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    access_log /var/log/nginx/${DOMAIN}.access.log;
    error_log /var/log/nginx/${DOMAIN}.error.log;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
}
EOF

# Активируем сайт
if [ ! -f "/etc/nginx/sites-enabled/$DOMAIN" ]; then
    sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
    echo "✅ Сайт $DOMAIN активирован"
fi

# Проверяем конфигурацию
if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "✅ Nginx перезагружен"
    echo ""
    echo "🎉 Домен $DOMAIN настроен!"
    echo "📱 Приложение доступно по: http://$DOMAIN"
else
    echo "❌ Ошибка в конфигурации Nginx"
    exit 1
fi