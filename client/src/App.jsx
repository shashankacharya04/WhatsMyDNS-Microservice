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

  //make this a hook in future
  async function getWhoisData() {
    const response = await fetch("http://localhost:3001/whois", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ submittedValue }),
    }); // response will be like
    //{domainName: 'youtube.com', registrar: 'MarkMonitor, Inc.', creationDate: '2005-02-15T05:13:12+0000', expiryDate: '2026-02-15T00:00:00+0000', nameServers: Array(4), …}

    const data = await response.json();
    console.log("whois data is", data);
    setWhois(data);
    console.log("whois", whois);
  }
  async function getDnsDetails() {
    const dnsAPI = [
      fetch("http://localhost:3001/dnsrecords/A", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ submittedValue }),
      }),
      fetch("http://localhost:3001/dnsrecords/MX", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ submittedValue }),
      }),
      fetch("http://localhost:3001/dnsrecords/TXT", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ submittedValue }),
      }),
      fetch("http://localhost:3001/dnsrecords/NS", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ submittedValue }),
      }),
    ];

    const values = await Promise.all(dnsAPI);
    const response = await Promise.all(values.map((value) => value.json()));
    console.log("DNS values are", response);
    const formatted = {
      A: response[0],
      MX: response[1],
      TXT: response[2],
      NS: response[3],
    };
    setDNS(formatted);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setsubmittedValue(value);
  };

  useEffect(() => {
    getWhoisData();
    getDnsDetails();
  }, [submittedValue]); // optimize

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter domain or email"
          onChange={(e) => setValue(e.target.value)}
          className="input input-primary text-white m-10"
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
