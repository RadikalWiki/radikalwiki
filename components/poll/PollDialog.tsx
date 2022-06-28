import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  FormControlLabel,
  Switch,
  Slider,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import {
  nodes_insert_input,
  relations_constraint,
  relations_insert_input,
  relations_update_column,
  useMutation,
  useQuery,
} from "gql";
import { useSession } from "hooks";
import { useNode } from "hooks";
import { Add, PlayArrow } from "@mui/icons-material";

export default function PollDialog({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: Function;
  id: string;
}) {
  const router = useRouter();
  const [session] = useSession();
  const { query: node, insert } = useNode({ id });
  const contextId = node?.contextId;

  const [insertRelation] = useMutation(
    (mutation, args: relations_insert_input) => {
      return mutation.insertRelation({
        object: args,
        on_conflict: {
          constraint: relations_constraint.relations_parent_id_name_key,
          update_columns: [relations_update_column.nodeId],
        },
      })?.id;
    }
  );
  const set = async (name: string, nodeId: string | null) => {
    return await insertRelation({
      args: { parentId: contextId, name, nodeId },
    });
  };

  const [voteCount, setVoteCount] = React.useState<number[]>([1, 1]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVoteCount(newValue as number[]);
  };

  const [hidden, setHidden] = useState(node?.mimeId == "vote/position");

  const [stopPoll] = useMutation((mutation) => {
    return mutation.updateNodes({
      where: { parentId: { _eq: id } },
      _set: { mutable: false },
    })?.affected_rows;
  });

  const options = ["vote/policy", "vote/change"].includes(
    node?.mimeId ?? ""
  )
    ? ["For", "Imod", "Blank"]
    : node
        ?.children({ where: { mimeId: { _eq: "vote/candidate" } } })
        .map(({ name }) => name)
        .concat("Blank");
  const optionsCount = options?.length || 0;

  const handleAddPoll = async (_: any) => {
    await stopPoll();
    const namespace = new Date(
      new Date().getTime() + (session?.timeDiff ?? 0)
    ).toLocaleString();
    const poll = await insert({
      name: node?.name,
      namespace,
      mimeId: "vote/poll",
      data: {
        minVote: voteCount[0],
        maxVote: voteCount[1],
        hidden,
        options: options,
      },
    });

    await set("active", poll.id);
    router.push(`${router.asPath.split("?")[0]}/${poll.namespace}`);
  };

  const getMarks = (count: number) =>
    [...Array(count - 1).keys()].map((i) => ({
      value: i + 1,
      label: `${i + 1}`,
    }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Ny Afstemning</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2}>
          {!["vote/policy", "vote/change"].includes(node?.mimeId ?? "") && (
            <>
              <Typography>Stemmeinterval</Typography>
              <Slider
                value={voteCount}
                onChange={handleChange}
                valueLabelDisplay="off"
                min={1}
                marks={getMarks(optionsCount)}
                max={optionsCount - 1}
              />
            </>
          )}
          <FormControlLabel
            control={
              <Switch
                checked={hidden}
                onChange={() => setHidden(!hidden)}
                color="primary"
              />
            }
            label="Skjul resultatet"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          endIcon={<PlayArrow />}
          variant="contained"
          color="primary"
          onClick={handleAddPoll}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
