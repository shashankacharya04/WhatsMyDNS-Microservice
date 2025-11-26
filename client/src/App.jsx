import { useEffect, useState } from "react";
import "./App.css";
import Preview from "./components/Preview";

function App() {
  const [value, setValue] = useState("");
  const [submittedValue, setsubmittedValue] = useState("");
  const [whois, setWhois] = useState({});
  const [dns, setDNS] = useState({
    A: [],
    MX: [],
    TXT: [],
  });

  //const baseUrl = import.meta.env.VITE_API_PROD_ENDPOINT;
  const baseUrl = import.meta.env.VITE_MICRO_PROD
  console.log("basurl is", baseUrl);

  //make this a hook in future

  // async function getWhoisData(filteredValue) {
  //   const payload = filteredValue;
  //   console.log("payload is", payload);
  //   const response = await fetch(`${baseUrl}/whois`, {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({ payload }),
  //   }); // response will be like
  //   //{domainName: 'youtube.com', registrar: 'MarkMonitor, Inc.', creationDate: '2005-02-15T05:13:12+0000', expiryDate: '2026-02-15T00:00:00+0000', nameServers: Array(4), …}

  //   const data = await response.json();
  //   console.log("whois data is", data);
  //   setWhois(data);
  //   console.log("whois", whois);
  // }


async function Lookup(filteredValue) {
    const domain = filteredValue;
    console.log("Domain  is", domain);
    const response = await fetch(`${baseUrl}/lookup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ domain }),
    }); // response will be like
    //{domainName: 'youtube.com', registrar: 'MarkMonitor, Inc.', creationDate: '2005-02-15T05:13:12+0000', expiryDate: '2026-02-15T00:00:00+0000', nameServers: Array(4), …}

    const data = await response.json();
    console.log("APP.JSX whois data is", data);
    setWhois({
    caching: false,       // or true if backend says so
    data: data.whois,     // nest whois under `.data`
  });
    console.log("whois", whois);
    setDNS(data.dns)
    console.log("DNS", dns);
  }

  // async function getDnsDetails(filteredValue) {
  //   const dnsAPI = [
  //     fetch(`${baseUrl}/dnsrecords/A`, {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ submittedValue: filteredValue }),
  //     }),
  //     fetch(`${baseUrl}/dnsrecords/MX`, {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ submittedValue: filteredValue }),
  //     }),
  //     fetch(`${baseUrl}/dnsrecords/TXT`, {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ submittedValue: filteredValue }),
  //     }),
  //     fetch(`${baseUrl}/dnsrecords/NS`, {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ submittedValue: filteredValue }),
  //     }),
  //   ];

  //   const values = await Promise.all(dnsAPI);
  //   const response = await Promise.all(values.map((value) => value.json()));
  //   console.log("DNS values are", response);
  //   const formatted = {
  //     A: response[0],
  //     MX: response[1],
  //     TXT: response[2],
  //     NS: response[3],
  //   };
  //   setDNS(formatted);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setsubmittedValue(value);
  };

  const domainValidator = (value) => {
    // console.log();
    if (value.includes("@")) {
      const parts = value.split("@");
      if (parts.length === 2) {
        return parts[1];
      }
    }

    try {
      const hostname = new URL(value).hostname;
      const parts = hostname.split(".");
      return parts.length > 2 ? parts.slice(-2).join(".") : hostname;
    } catch (e) {
      // Invalid URL, return value as-is
      return value;
    }
  };
  const noCache =()=>{

  }

  useEffect(() => {
    const filteredValue = domainValidator(submittedValue);
    console.log("filtered value is ", filteredValue);
    Lookup(filteredValue);
    //getWhoisData(filteredValue);
    //getDnsDetails(filteredValue);
  }, [submittedValue]); // optimize

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter domain or email"
          onChange={(e) => setValue(e.target.value)}
          className="input input-primary text-white m-3"
        />
        <button type="submit" className="btn btn-soft btn-primary">
          submit
        </button>
        
      </form>
      {submittedValue && (
        <Preview value={submittedValue} whois={whois} dns={dns} />
      )}
    </>
  );
}

export default App;
