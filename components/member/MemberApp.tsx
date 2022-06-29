import React from "react";
import { InvitesTextField, InvitesFab, MembersDataGrid } from "comps";
import { Grid } from "@mui/material";
import { useNode } from "hooks";

export default function MemberApp() {
  const { query } = useNode();

  if (!query?.id) return null;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InvitesTextField id={query?.id} />
        </Grid>
        <Grid item xs={12}>
          <MembersDataGrid id={query?.id} />
        </Grid>
      </Grid>
      <InvitesFab id={query?.id} />
    </>
  );
}
