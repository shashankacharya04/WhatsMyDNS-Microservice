require("dotenv").config();

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

const WhoisURL = process.env.hosted_whois
const DNSURL = process.env.hosted_DNS

console.log("WhoisURL is", WhoisURL);
console.log("DNS URL is", DNSURL)

app.post("/lookup", async (req, res) => {
    const domain = req.body.domain;
    console.log("domain is",domain)
    const whois = await axios.post(`${WhoisURL}/whois?domain=${domain}`);
    const Adns = await axios.post(`${DNSURL}/dnsrecords/a?domain=${domain}`);
    const NSdns = await axios.post(`${DNSURL}/dnsrecords/NS?domain=${domain}`);
    const TXTdns = await axios.post(`${DNSURL}/dnsrecords/TXT?domain=${domain}`);
    const MXdns = await axios.post(`${DNSURL}/dnsrecords/MX?domain=${domain}`);

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