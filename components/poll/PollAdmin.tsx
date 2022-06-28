import React from "react";
import { Button, Divider } from "@mui/material";
import { useMutation, useRefetch } from "gql";
import { AdminCard } from "comps";
import { useNode } from "hooks";
import { Stop } from "@mui/icons-material";

export default function PollAdmin({ id }: { id: string }) {
  const { sub, query: node } = useNode({ id });
  const data = sub?.data();
  const refetch = useRefetch();
  const [update] = useMutation(
    (mutation, args: any) => {
      return mutation.updateNode({
        pk_columns: { id },
        _set: args,
      })?.id;
    }
  );
  

  const voters = sub?.context?.permissions({
    where: {
      _and: [
        { mimeId: { _eq: "vote/vote" } },
        { insert: { _eq: true } },
        { node: { members: { active: { _eq: true } } } },
      ],
    },
  })?.length;
  /*
  const voters = sub?.context?.mimes({
    where: {
      _and: [
        { name: { _eq: "vote/vote" } },
        {
          permisssions: {
            _and: [
              { insert: { _eq: true } },
              { node: { members: { active: { _eq: true } } } },
            ],
          },
        },
      ],
    },
  })?.length;
  */

  const handleStopPoll = async (_: any) => {
    await update({ args: { mutable: false, data: { ...data, voters } } });
    await refetch(() => node?.children({ where: { mimeId: { _eq: "vote/vote" } } }).map(vote => vote.data))
  };
  

  if (!sub?.mutable || !sub?.parent?.isOwner) return null;

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
