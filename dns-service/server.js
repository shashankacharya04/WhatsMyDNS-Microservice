const express = require("express");
const cors = require("cors");
const dns = require("dns");

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://whats-my-dns-client.vercel.app",
    "https://whats-my-dns-microservice-api-gatew.vercel.app"
  ],
  methods: ["GET","POST","OPTIONS"],
  credentials: true
}));

app.post("/dnsrecords/A", async (req, res) => {
  const domain = req.query.domain;

  dns.lookup(domain, { all: true }, (err, addresses) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const results = addresses.map(a => ({
      resolver: "Render DNS",
      ip: a.address
    }));

    res.json(results);
  });
});

app.post("/dnsrecords/MX", (req, res) => {
  const domain = req.query.domain;

  dns.resolveMx(domain, (err, records) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json([{ resolver: "Render DNS", MX: records }]);
  });
});

app.post("/dnsrecords/TXT", (req, res) => {
  const domain = req.query.domain;

  dns.resolveTxt(domain, (err, records) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json([{ resolver: "Render DNS", TXT: records }]);
  });
});

app.post("/dnsrecords/NS", (req, res) => {
  const domain = req.query.domain;

  dns.resolveNs(domain, (err, records) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json([{ resolver: "Render DNS", NS: records }]);
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log("DNS microservice running on", PORT));
