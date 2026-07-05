// Cloudflare Worker — прокси для Telegram Bot API
// 1. Зайди на https://dash.cloudflare.com → Workers & Pages → Create Worker
// 2. Вставь этот код → Deploy
// 3. Скопируй URL вида: https://miku-tg-proxy.твой-поддомен.workers.dev
// 4. Добавь Secret в HF Space: API_BASE_URL = https://miku-tg-proxy.твой-поддомен.workers.dev/bot

const TELEGRAM_API = "https://api.telegram.org";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const botPath = url.pathname.replace(/^\/bot/, "");
    const target = `${TELEGRAM_API}/bot${botPath}${url.search}`;

    const resp = await fetch(target, {
      method: request.method,
      headers: {
        "Content-Type": request.headers.get("Content-Type") || "application/json",
      },
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
    });

    const headers = new Headers(resp.headers);
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers,
    });
  },
};
