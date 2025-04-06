import React from "react";

function Preview(props) {
  const { whois, dns, value } = props;
  console.log("whois data in comp is", whois);
  console.log("DNS data in comp is", dns);
  console.log("value data in comp is", value);

  return (
    <div className="p-4">
      <p className="mb-2 text-lg font-semibold text-gray-700">
        Hello there I am Shashank, {value}
      </p>
      <a
        href={`https:${value}/?noCache=1`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mb-4 inline-block"
      >
        Click here to load the website
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* WHOIS Information */}
        <div className="shadow-lg rounded-2xl p-6 border">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            WHOIS Information
          </h2>
          <div className="space-y-2 text-amber-100">
            <p>
              <span className="font-medium">🌐 Domain Name:</span>{" "}
              {whois.domainName}
            </p>
            <p>
              <span className="font-medium">🏢 Registrar:</span>{" "}
              {whois.registrar}
            </p>
            <p>
              <span className="font-medium">📅 Creation Date:</span>{" "}
              {whois.creationDate}
            </p>
            <p>
              <span className="font-medium">⏳ Expiry Date:</span>{" "}
              {whois.expiryDate}
            </p>
            <p>
              <span className="font-medium">🏛️ Registrant Organization:</span>{" "}
              {whois.registrantOrg}
            </p>
            <p>
              <span className="font-medium">🌍 Country:</span> {whois.country}
            </p>
            <div>
              <p className="font-medium mb-1">🧭 Name Servers:</p>
              <ul className="list-disc list-inside ml-2 text-sm text-green-400">
                {whois.nameServers?.map((server, index) => (
                  <li key={index}>{server}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* DNS Information */}

        <div className=" shadow-lg rounded-2xl p-4 border">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            DNS Information
          </h2>

          {/* DNS Section Generator */}
          {[
            { title: "🔹 A Records", data: dns.A, key: "ip" },
            { title: "📧 MX Records", data: dns.MX, key: "MX" },
            { title: "📝 TXT Records", data: dns.TXT, key: "TXT" },
            { title: "🧭 NS Records", data: dns.NS, key: "NS" },
          ].map((section, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                {section.title}
              </h3>
              {section.data?.map((record, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-medium text-sm text-slate-50">
                    {record.resolver}:
                  </p>
                  <ul className="list-disc list-inside text-sm ml-4 text-slate-100">
                    {section.key === "ip" && <li>{record.ip}</li>}

                    {section.key === "MX" &&
                      record.MX?.map((mx, mxIdx) => (
                        <li key={mxIdx}>
                          {mx.exchange} (Priority: {mx.priority})
                        </li>
                      ))}

                    {section.key === "TXT" &&
                      record.TXT?.map((txtArr, txtIdx) => (
                        <li key={txtIdx}>{txtArr.join(" ")}</li>
                      ))}

                    {section.key === "NS" &&
                      record.NS?.map((ns, nsIdx) => <li key={nsIdx}>{ns}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preview;
