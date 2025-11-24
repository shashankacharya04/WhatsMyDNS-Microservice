import React from "react";

function Preview(props) {
  const { whois, dns, value } = props;
  console.log("Preview componentwhois data in comp is", whois.caching);
  console.log("Preview component DNS data in comp is", dns);
  console.log("Preview component value data in comp is", value);

  return (
    <div className="flex gap-2">
      {/* <a
        href={`https:${value}/?noCache=1`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mb-4 inline-block"
      >
        Click here to load the website
      </a> */}
      {/* WHOIS Information */}
      <div className=" border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                Cached:{""}
                {whois.caching ? "🟢" : "🔴"}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Domain:</td>
              <td>{whois.data?.domainName}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Registrar:</td>
              <td>{whois.data?.registrar}</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Creation Date:</td>
              <td> {whois.data?.creationDate}</td>
            </tr>
            <tr>
              <td>Expiry Date:</td>
              <td> {whois.data?.expiryDate}</td>
            </tr>
            <tr>
              <td>status:</td>
              <td>
                <ul className="list-disc list-inside ml-2 text-sm text-green-400">
                  {whois.data?.status?.map((server, index) => (
                    <li key={index}>{server}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Name Servers:</td>
              <td>
                {" "}
                <ul className="list-disc list-inside ml-2 text-sm text-green-400">
                  {whois.data?.nameServers?.map((server, index) => (
                    <li key={index}>{server}</li>
                  ))}
                </ul>{" "}
              </td>
            </tr>
          </tbody>
        </table>
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
  );
}

export default Preview;
