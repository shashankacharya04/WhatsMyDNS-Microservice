const whois = require("whois");
const nodeCache = require("node-cache");
const whoisCache = new nodeCache({stdTTL:3600});
async function getWhoisData(req,res){ //rate limit exeeded in development 
    const { payload: domain } = req.body;
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
      const response =await  fetch(`https://rdap.verisign.com/com/v1/domain/${domain}`);

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
      console.error("Error fetching RDAP data:", err.message);
      res.status(500).send("Error fetching RDAP data");
    }

}




module.exports={
    getWhoisData:getWhoisData
}