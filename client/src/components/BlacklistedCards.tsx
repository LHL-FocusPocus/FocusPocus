import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import { Card, CardHeader, Avatar, IconButton } from "@material-ui/core";

interface Props {
  hostname: string;
  name: string;
  deleteSite: any;
  id: number;
}

const Logo = styled(Avatar)`
  height: 60px;
  width: 60px;
`;

const Container = styled(Card)`
  max-width: 345;
  text-align: center;s
`;

const Delete = styled(IconButton)`
  margin-top: 27%;
  margin-right: 20%;
`;

export default function BlacklistedCards({
  hostname,
  name,
  deleteSite,
  id,
}: Props) {
  return (
    <Container>
      <CardHeader
        avatar={
          <Logo aria-label="logo" src={`//logo.clearbit.com/${hostname}`} />
        }
        titleTypographyProps={{ variant: "h5" }}
        title={`${name}`}
        style={{ paddingRight: "40px" }}
        action={
          <Delete onClick={() => deleteSite(id)} aria-label="Delete">
            <DeleteIcon />
          </Delete>
        }
      />
    </Container>
  );
}
