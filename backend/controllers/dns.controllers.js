
const dns = require("dns");
const resolvers = [
  { r_name: 'Google DNS', ip: '8.8.8.8' },
  { r_name: 'Cloudflare DNS', ip: '1.1.1.1' },
  { r_name: 'OpenDNS', ip: '208.67.222.222' }
];

async function nameServers(req,res){
  const {submittedValue:domain}  =req.body
//const domain = "17-netsoltest.com"
try {
    const results = await Promise.all(
      resolvers.map(({ r_name, ip }) => {
        return new Promise((resolve, reject) => {
          dns.setServers([ip]);
          dns.resolveNs(domain, (err, address) => {
            if (err) {
              //console.error(`Error from ${r_name}: ${err.message}`);
              resolve({ resolver: r_name, error: err.message });
            } else {
              //console.log(`Checking from: ${r_name}, IP: ${address}`);
              resolve({ resolver: r_name, NS: address });
            }
          });
        });
      })
    );

    res.status(200).json(results); 
  //   [
  //     {
  //         "resolver": "Google DNS",
  //         "ip": "142.251.42.14"
  //     },
  //     {
  //         "resolver": "Cloudflare DNS",
  //         "ip": "142.251.42.14"
  //     },
  //     {
  //         "resolver": "OpenDNS",
  //         "ip": "142.251.42.14"
  //     }
  // ]
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}

async function aRecords(req,res){
    const {submittedValue:domain}  =req.body
//const domain = "17-netsoltest.com"
try {
    const results = await Promise.all(
      resolvers.map(({ r_name, ip }) => {
        return new Promise((resolve, reject) => {
          dns.setServers([ip]);
          dns.lookup(domain, (err, address) => {
            if (err) {
              //console.error(`Error from ${r_name}: ${err.message}`);
              resolve({ resolver: r_name, error: err.message });
            } else {
              //console.log(`Checking from: ${r_name}, IP: ${address}`);
              resolve({ resolver: r_name, ip: address });
            }
          });
        });
      })
    );

    res.status(200).json(results); 
  //   [
  //     {
  //         "resolver": "Google DNS",
  //         "ip": "142.251.42.14"
  //     },
  //     {
  //         "resolver": "Cloudflare DNS",
  //         "ip": "142.251.42.14"
  //     },
  //     {
  //         "resolver": "OpenDNS",
  //         "ip": "142.251.42.14"
  //     }
  // ]
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}

async function mxRecords(req,res){
  const {submittedValue:domain}  =req.body
  //const domain = "17-netsoltest.com"
  try {
      const results = await Promise.all(
        resolvers.map(({ r_name, ip }) => {
          return new Promise((resolve, reject) => {
            dns.setServers([ip]);
            dns.resolveMx(domain, (err, address) => {
              if (err) {
                //console.error(`Error from ${r_name}: ${err.message}`);
                resolve({ resolver: r_name, error: err.message });
              } else {
                //console.log(`Checking from: ${r_name}, mx: ${address}`);
                resolve({ resolver: r_name, MX: address });
              }
            });
          });
        })
      );
  
      res.status(200).json(results); 
    //   [
    //     {
    //         "resolver": "Google DNS",
    //         "ip": "142.251.42.14"
    //     },
    //     {
    //         "resolver": "Cloudflare DNS",
    //         "ip": "142.251.42.14"
    //     },
    //     {
    //         "resolver": "OpenDNS",
    //         "ip": "142.251.42.14"
    //     }
    // ]
    } catch (err) {
      res.status(500).json({ error: "Something went wrong", details: err.message });
    }
    
}
// function cnameRecords(req,res){
    
// }


async function txtRecords(req,res){
  const {submittedValue:domain}  =req.body
  //const domain = "17-netsoltest.com"
  try {
      const results = await Promise.all(
        resolvers.map(({ r_name, ip }) => {
          return new Promise((resolve, reject) => {
            dns.setServers([ip]);
            dns.resolveTxt(domain, (err, address) => {
              if (err) {
                //console.error(`Error from ${r_name}: ${err.message}`);
                resolve({ resolver: r_name, error: err.message });
              } else {
                //console.log(`Checking from: ${r_name}, mx: ${address}`);
                resolve({ resolver: r_name, TXT: address });
              }
            });
          });
        })
      );
  
      res.status(200).json(results); 
    //   [
    //     {
    //         "resolver": "Google DNS",
    //         "ip": "142.251.42.14"
    //     },
    //     {
    //         "resolver": "Cloudflare DNS",
    //         "ip": "142.251.42.14"
    //     },
    //     {
    //         "resolver": "OpenDNS",
    //         "ip": "142.251.42.14"
    //     }
    // ]
    } catch (err) {
      res.status(500).json({ error: "Something went wrong", details: err.message });
    }
}

module.exports ={
    nameserver:nameServers,
    Arecords:aRecords,
    MXrecords:mxRecords,
    TXTrecords:txtRecords,
    Nameservers:nameServers
}
