export default async (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const tgPath = url.searchParams.get("tgPath");
  if (!tgPath) {
    return res.status(400).json({ ok: false, error: "Missing tgPath" });
  }
  const apiUrl = `https://api.telegram.org/${tgPath}`;
  try {
    const r = await fetch(apiUrl, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: ["GET", "HEAD"].includes(req.method) ? null : JSON.stringify(req.body)
    });
    res.status(r.status).json(await r.json());
  } catch (e) {
    res.status(502).json({ ok: false, error: e.message });
  }
};
