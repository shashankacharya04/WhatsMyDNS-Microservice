const express = require("express");
const whois = require("whois");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.post("/whois",(req,res)=>{
    //const domain = "google.com"
    const {submittedValue:domain} = req.body
    console.log("domain is ", req.body);
    whois.lookup(domain, (err, data) => {
      if (err) return res.status(500).send("Error fetching WHOIS data");
  //  console.log("whois data is",data)
     const parsedData = {
      domainName: data.match(/Domain Name:\s*(.+)/)?.[1],
      registrar: data.match(/Registrar:\s*(.+)/)?.[1],
      creationDate: data.match(/Creation Date:\s*(.+)/)?.[1],
      expiryDate: data.match(/Expiration Date:\s*(.+)/)?.[1],
      nameServers: [...data.matchAll(/Name Server:\s*(.+)/g)].map(m => m[1]),
      registrantOrg: data.match(/Registrant Organization:\s*(.+)/)?.[1],
      country: data.match(/Registrant Country:\s*(.+)/)?.[1],
    };
    console.log("parsed data:", parsedData);
    res.status(200).json(parsedData);
    });
})


app.listen(3001, () => {
  console.log("Server running on port 3001");
});
