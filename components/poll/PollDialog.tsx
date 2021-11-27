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
} from "@mui/material";
import { polls_insert_input, useMutation, useQuery } from "gql";
import { useSession } from "hooks";

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
  const [session, setSession] = useSession();

  const query = useQuery();
  const content = query.contents_by_pk({ id });

  const [voteCount, setVoteCount] = React.useState<number[]>([1, 1]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVoteCount(newValue as number[]);
  };

  const [hidden, setHidden] = useState(content?.folder?.mode == "candidates");
  const [addPoll] = useMutation((mutation, args: polls_insert_input) => {
    return mutation.insert_polls_one({ object: args })?.id;
  });
  const [stopPoll] = useMutation((mutation) => {
    return mutation.update_polls({
      where: { content: { folder: { eventId: { _eq: session?.event?.id } } } },
      _set: { active: false },
    })?.affected_rows;
  });
  const [updateEvent] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_events_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    }
  );

  const options =
    content?.folder?.mode == "changes"
      ? ["For", "Imod", "Blank"]
      : content
          ?.children()
          .map(({ name }) => name)
          .concat("Blank");
  const optionsCount = options?.length || 0;

  const handleAddPoll = async (_: any) => {
    await stopPoll();
    const pollId = await addPoll({
      args: {
        contentId: content?.id,
        minVote: voteCount[0],
        maxVote: voteCount[1],
        hidden,
        options: `{${options}}`,
      },
    });
    await updateEvent({
      args: { id: session?.event?.id as string, set: { pollId } },
    });
    router.push(`/poll/${pollId}`);
  };

  const getMarks = (count: number) => {
    const marks = []
    for (let i = 0; i < count; i++) { 
      marks.push({ value: i, label: `${i}`})
    }
    return marks
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Ny Afstemning</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <>
          <Typography>Stemmeinterval</Typography>
          <Slider
            disabled={content?.folder?.mode == "changes"}
            value={voteCount}
            onChange={handleChange}
            valueLabelDisplay="off"
            min={1}
            marks={getMarks(optionsCount)}
            max={optionsCount - 1}
          />
          </>
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
        <Button variant="contained" color="primary" onClick={handleAddPoll}>
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
