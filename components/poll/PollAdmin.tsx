import React from "react";
import { Button, Divider } from "@mui/material";
import { useRefetch } from "gql";
import { AdminCard } from "comps";
import { Node, useNode } from "hooks";
import { Stop } from "@mui/icons-material";

export default function PollAdmin({ node }: { node: Node }) {
  const data = node.sub?.data();
  const refetch = useRefetch();
 
  const handleStopPoll = async (_: any) => {
    await node.update({ set: { mutable: false, data: { ...data } } });
    await refetch(() => node.query?.children({ where: { mimeId: { _eq: "vote/vote" } } }).map(vote => vote.data))
  };

  if (!node.sub?.mutable || !node.sub?.isContextOwner) return null;

  return (
    <AdminCard title="Administrer Afstemning">
      <Divider />
      <Button
        size="large"
        color="secondary"
        variant="contained"
        endIcon={<Stop />}
        sx={{ color: "#fff", m: 2 }}
        onClick={handleStopPoll}
      >
        Stop
      </Button>
    </AdminCard>
  );
}
