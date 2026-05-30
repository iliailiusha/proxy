export default async (req, res) => {
  const path = (req.query.path || []).join("/");
  const apiUrl = `https://api.telegram.org/${path}`;

  const headers = { "Content-Type": "application/json" };
  const opts = { method: req.method, headers };

  if (!["GET", "HEAD"].includes(req.method)) {
    opts.body = JSON.stringify(req.body);
  }

  try {
    const r = await fetch(apiUrl, opts);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    res.status(502).json({ ok: false, error: err.message });
  }
};
