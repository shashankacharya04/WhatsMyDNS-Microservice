const express = require("express");
const axios = require("axios");

const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors({
  origin:["http://localhost:5173","https://whats-my-dns-client.vercel.app"],
  methods:["GET","POST", "OPTIONS"],
  credentials:true
}));


app.post("/lookup", async (req, res) => {
    const domain = req.body.domain;
    console.log("domain is",domain)
    const whois = await axios.post(`http://localhost:5001/whois?domain=${domain}`);
    const Adns = await axios.post(`http://localhost:5002/dnsrecords/a?domain=${domain}`);
    const NSdns = await axios.post(`http://localhost:5002/dnsrecords/NS?domain=${domain}`);
    const TXTdns = await axios.post(`http://localhost:5002/dnsrecords/TXT?domain=${domain}`);
    const MXdns = await axios.post(`http://localhost:5002/dnsrecords/MX?domain=${domain}`);

    res.json({
        whois: whois.data.data,
        dns:{
        A:Adns.data,
        NS:NSdns.data,
        TXT:TXTdns.data,
        MX:MXdns.data
        }
        
    });
});

app.listen(5000, () => console.log("API Gateway running on 5000"));