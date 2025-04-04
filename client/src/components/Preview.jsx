import React from "react";

function Preview(props) {
  //console.log("domain is", domain);
  console.log("whois data in the component is ", props.whois);
  return (
    <div>
      hello there I am shashank, {props.value}
      {/* <iframe src={`https://www.${props.value}/`} /> */}
      <iframe src={`https:${props.value}/?noCache=1`} />
      <a
        href={`https:${props.value}/?noCache=1`}
        target="_blank"
        rel="noopener noreferrer"
      >
        click here to load the website
      </a>
    </div>
  );
}

export default Preview;
