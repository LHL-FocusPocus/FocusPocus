import React from "react";
import BlacklistedCards from "./BlacklistedCards";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

const Container = styled(Box)`
  height: 80vh;
  padding: 0 40%;
`;

export default function Blacklisted({ blacklist }) {
  console.log("blacklist", blacklist);

  const blacklistList = blacklist.map(website => {
    return (
      <BlacklistedCards
        key={website.blacklists_id}
        hostname={website.hostname}
        name={website.name}
      />
    );
  });
  return <Container>
    {blacklistList}
  </Container>;
}

/* blacklists_id: 1
category: "Internet Media"
hostname: "reddit.com"
name: "Reddit"
user_id: 1
website_id: 1
 */
