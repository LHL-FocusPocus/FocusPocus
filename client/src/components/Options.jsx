import React from "react";
import Navbar from "./Navbar";
import Blacklisted from "./Blacklisted";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import QuotaSlider from "./QuotaSlider";
import TopBlacklisted from "./TopBlacklisted";

const Container = styled(Box)`
  padding: 5em;
  height: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Slider = styled(QuotaSlider)`
  ${'' /* width: 30%; */}
  ${'' /* padding-left: 20%; */}
  transform: translateX(200px);
`;

export default function Options({
  user,
  blacklisted,
  addBlacklistedSite,
  disableBlacklistedSite,
}) {
  return (
    <div>
      <Navbar user={user} />
      <Container bgcolor="background.paper">
        <Slider />
        <Blacklisted
          addBlacklistedSite={addBlacklistedSite}
          disableBlacklistedSite={disableBlacklistedSite}
          blacklisted={blacklisted}
        />
        <TopBlacklisted />
      </Container>
    </div>
  );
}
