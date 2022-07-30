import React from "react";
import { InvitesTextField, InvitesFab, MembersDataGrid } from "comps";
import { Grid } from "@mui/material";
import { Node } from "hooks";

export default function MemberApp({ node }: { node: Node }) {
  if (!node?.id) return null;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InvitesTextField node={node} />
        </Grid>
        <Grid item xs={12}>
          <MembersDataGrid node={node} />
        </Grid>
      </Grid>
      <InvitesFab node={node} />
    </>
  );
}
