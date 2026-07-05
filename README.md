# MikuTG Proxy

Cloudflare Worker прокси для Telegram Bot API.

## Deploy

1. Нажать **Deploy with Workers** в Cloudflare Dashboard
2. Или: `npx wrangler deploy`

## Использование

После деплоя URL будет: `https://miku-tg-proxy.<поддомен>.workers.dev/bot`

Добавить в HF Space Secrets: `API_BASE_URL` = этот URL
