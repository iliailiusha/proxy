export default async (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const tgPath = url.searchParams.get("tgPath");
  const targetHost = url.searchParams.get("host") || "api.telegram.org";
  if (!tgPath) {
    return res.status(400).json({ ok: false, error: "Missing tgPath" });
  }
  const apiUrl = `https://${targetHost}/${tgPath}`;
  const headers = { "Content-Type": "application/json" };
  if (url.searchParams.get("auth")) {
    headers["Authorization"] = `Bearer ${url.searchParams.get("auth")}`;
  }
  try {
    const r = await fetch(apiUrl, {
      method: req.method,
      headers,
      body: ["GET", "HEAD"].includes(req.method) ? null : JSON.stringify(req.body)
    });
    const ct = r.headers.get("content-type") || "";
    if (ct.includes("image")) {
      const buf = await r.arrayBuffer();
      res.setHeader("Content-Type", ct);
      res.status(r.status).end(Buffer.from(buf));
    } else if (ct.includes("json")) {
      res.status(r.status).json(await r.json());
    } else {
      const text = await r.text();
      res.status(r.status).send(text);
    }
  } catch (e) {
    res.status(502).json({ ok: false, error: e.message });
  }
};
