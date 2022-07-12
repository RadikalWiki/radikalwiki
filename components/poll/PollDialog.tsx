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
import { Node, useSession } from "hooks";
import { PlayArrow } from "@mui/icons-material";

export default function PollDialog({
  node,
  open,
  setOpen,
}: {
  node: Node;
  open: boolean;
  setOpen: Function;
}) {
  const router = useRouter();
  const [session] = useSession();
  const pollId = node.subGet("active")?.id;
  const query = node.query;

  const [hidden, setHidden] = useState(query?.mimeId == "vote/position");
  const [voteCount, setVoteCount] = React.useState<number[]>([1, 1]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVoteCount(newValue as number[]);
  };

  const options = ["vote/policy", "vote/change"].includes(query?.mimeId ?? "")
    ? ["For", "Imod", "Blank"]
    : query
        ?.children({ where: { mimeId: { _eq: "vote/candidate" } } })
        .map(({ name }) => name)
        .concat("Blank");
  const optionsCount = options?.length || 0;

  const handleAddPoll = async (_: any) => {
    if (pollId) await node.update({ id: pollId, set: { mutable: false } });
    const namespace = new Date(new Date().getTime() + (session?.timeDiff ?? 0))
      .toLocaleString()
      .replaceAll("/", "");
    const poll = await node.insert({
      name: query?.name,
      namespace,
      mimeId: "vote/poll",
      data: {
        minVote: voteCount[0],
        maxVote: voteCount[1],
        hidden,
        options: options,
      },
    });

    await node.set("active", poll.id);
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
          {!["vote/policy", "vote/change"].includes(query?.mimeId ?? "") && (
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
