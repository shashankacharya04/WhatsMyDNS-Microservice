require("dotenv").config();

const express = require("express");
const axios = require("axios");


const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors({
  origin:["http://localhost:5173","https://whats-my-dns-client.vercel.app","https://whats-my-dns-microservice-9eew.vercel.app"],
  methods:["GET","POST", "OPTIONS"],
  credentials:true
}));


const WhoisURL = process.env.hosted_whois?.trim();
const DNSURL = process.env.hosted_DNS?.trim();

// if (!WhoisURL || !DNSURL) {
//   throw new Error("Environment variables are missing on Vercel");
// }

app.post("/lookup", async (req, res) => {
  try {
    const domain = req.body.domain;
    console.log("domain is", domain);

    const whois = await axios.post(
      `${WhoisURL}/whois?domain=${domain}`,
      {},
      { timeout: 10000 }
    );

    const Adns = await axios.post(
      `${DNSURL}/dnsrecords/A?domain=${domain}`,
      {},
      { timeout: 10000 }
    );

    const NSdns = await axios.post(
      `${DNSURL}/dnsrecords/NS?domain=${domain}`,
      {},
      { timeout: 10000 }
    );

    const TXTdns = await axios.post(
      `${DNSURL}/dnsrecords/TXT?domain=${domain}`,
      {},
      { timeout: 10000 }
    );

    const MXdns = await axios.post(
      `${DNSURL}/dnsrecords/MX?domain=${domain}`,
      {},
      { timeout: 10000 }
    );

    return res.json({
      whois: whois.data,
      dns: {
        A: Adns.data,
        NS: NSdns.data,
        TXT: TXTdns.data,
        MX: MXdns.data
      }
    });

  } catch (error) {
    console.error("LOOKUP ERROR:", error.message);

    return res.status(500).json({
      error: "One of the microservices failed",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("API Gateway running on", PORT));