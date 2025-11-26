const express = require("express");
const whois = require("whois");
const nodeCache = require("node-cache");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());


app.use(cors({
  origin:["https://whats-my-dns-microservice-api-gatew.vercel.app"],
  methods:["GET","POST", "OPTIONS"],
  credentials:true
}));

const whoisCache = new nodeCache({stdTTL:3600});

app.post("/whois",async(req,res)=>{ //rate limit exeeded in development 
      const domain = req.query.domain;
      const cacheKey = `whois-${domain}`
      console.log("domain is:", domain);

      const cached = whoisCache.get(cacheKey);
      if(cached){
          console.log("Returning cached WHOIS data");
      return res.status(200).json({
          caching:true,
          data:cached
      });
      }
    
      try {
        const response =await fetch(`https://rdap.verisign.com/com/v1/domain/${domain}`);

        console.log("response is ",response)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await  response.json();
        const parsedData = {
          domainName: data?.ldhName,
          registrar: data?.entities?.[0]?.vcardArray?.[1]?.find(v => v[0] === "fn")?.[3],
          creationDate: data?.events?.find(e => e.eventAction === "registration")?.eventDate,
          expiryDate: data?.events?.find(e => e.eventAction === "expiration")?.eventDate,
          nameServers: data?.nameservers?.map(ns => ns.ldhName),
          status: data?.status,
        };
        whoisCache.set(cacheKey,parsedData);
        console.log("parsed RDAP data:", parsedData);
        res.status(200).json({
          caching:false,
          data:parsedData
        });
      } catch (err) {
        console.error("Error fetching RDAP data:", err);
        res.status(500).send("Error fetching RDAP data");
      }

  }
);

app.listen(5001, () => console.log("Whois microservice running on 5001"));