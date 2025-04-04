import { useState } from "react";
import "./App.css";
import Preview from "./components/Preview";

function App() {
  const [value, setValue] = useState("");
  const [submittedValue, setsubmittedValue] = useState("");
  const [whois, setWhois] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setsubmittedValue(value);
    const response = await fetch("http://localhost:3001/whois", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ submittedValue }),
    });
    const data = await response.json();
    console.log("whois data is", data);
    setWhois(data);
    console.log("whois", whois);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter domain or email"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      {submittedValue && <Preview value={submittedValue} whois={whois} />}
    </>
  );
}

export default App;
