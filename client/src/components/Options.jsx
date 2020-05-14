import React from "react";
import Navbar from "./Navbar";
import Blacklisted from "./Blacklisted";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const Container = styled(Box)`
  padding: 3em;
  height: 100%;
`;

export default function Options({ user, blacklist, disableBlacklistedSite }) {
  return (
    <div>
      <Navbar user={user} />
      <Container bgcolor="background.paper">
        <Blacklisted
          disableBlacklistedSite={disableBlacklistedSite}
          blacklist={blacklist}
        />
      </Container>
    </div>
  );
}
