const express = require("express");

//const whois = require("whois");
// const dns = require("dns");

const getWhoisData = require("./controllers/whois.controllers");
const getDnsDetails = require("./controllers/dns.controllers");

const app = express();
const cors = require("cors");

app.use(cors({
  origin:["https://whats-my-dns-client.vercel.app/","http://localhost:5173"],
  methods:["GET","POST"],
  credentials:true
}));
app.use(express.json());



app.post("/whois",getWhoisData.getWhoisData);
app.post("/dnsrecords/A",getDnsDetails.Arecords);
app.post("/dnsrecords/MX",getDnsDetails.MXrecords);
app.post("/dnsrecords/TXT",getDnsDetails.TXTrecords);
app.post("/dnsrecords/NS",getDnsDetails.Nameservers);

//nameservers///
// resolvers.forEach(({r_name, ip})=>{
// dns.setServers([ip])
// dns.resolveNs("17-netsoltest.com", (err, nameservers) => {
//   console.log(`\nChecking from: ${r_name} (${ip})`);
//   if (err) {
//     console.error('Error:', err.message);
//   } else {
//     console.log('Nameservers:', nameservers);
//   }
// });
// })

// dns.lookup('17-netsoltest.com', function (err, addresses, family) {
//   console.log("DNS address",addresses);
//   console.log("DNS family",family);
//   console.log("DNS err",err);
// });

/// A records ///
// resolvers.forEach(({r_name, ip})=>{
//   dns.setServers([ip])
//   dns.lookup("17-netsoltest.com", (err, ip) => {
//     console.log(`\nChecking from: ${r_name} (${ip})`);
//     if (err) {
//       console.error('Error:', err.message);
//     } else {
//       console.log('A records are :', ip);
//     }
//   });
//   })


/// CNAME records ///
// dns.resolveCname('w3schools.com', function (err, addresses, family) {
//   console.log("CNAME address",addresses);
//   console.log("DNS family",family);
//   console.log("DNS err",err);
// });


///MX records
// dns.resolveMx('17-netsoltest.com', (err, addresses) => {
//   console.log('MX records:', addresses);
// });

//TXT records
// dns.resolveTxt('17-netsoltest.com', (err, records) => {
//   console.log('TXT records:', records);
// });



app.listen(3001, () => {
  console.log("Server running on port 3001");
});
