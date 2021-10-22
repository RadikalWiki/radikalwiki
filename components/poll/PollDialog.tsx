import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Switch,
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
  const [minVote, setMinVote] = useState(1);
  const [maxVote, setMaxVote] = useState(1);
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const [hidden, setHidden] = useState(content?.folder?.mode == "candidates");
  const [addPoll] = useMutation((mutation, args: polls_insert_input) => {
    return mutation.insert_polls_one({ object: args })?.id;
  });
  const [stopPoll] = useMutation((mutation) => {
    return mutation.update_polls({ where: { content: { folder: { eventId: { _eq: session?.event?.id } } } }, _set: { active: false } })?.affected_rows
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
      : content?.children().map(({ name }) => name).concat("Blank");
  const optionsCount = options?.length || 0;

  const handleAddPoll = async (_: any) => {
    await stopPoll();
    const pollId = await addPoll({
      args: {
          contentId: content?.id,
          minVote,
          maxVote,
          hidden,
          options: `{${options}}`,
        },
    });
    await updateEvent({
      args: { id: session?.event?.id as string, set: { pollId } },
    });
    router.push(`/poll/${pollId}`);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Ny Afstemning</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="number"
              value={minVote}
              disabled={content?.folder?.mode == "changes"}
              onChange={(e) => {
                const maxOpt = optionsCount - 1;
                const val = parseInt(e.target.value);
                setMinVote(val > maxOpt ? maxOpt : val > 0 ? val : 1);
                setMaxVote(
                  val > maxOpt ? maxOpt : val > maxVote ? val : maxVote
                );
              }}
              autoFocus
              label="Minimum valg"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              value={maxVote}
              disabled={content?.folder?.mode == "changes"}
              onChange={(e) => {
                const maxOpt = optionsCount - 1;
                const val = parseInt(e.target.value);
                setMinVote(minVote > val && val > 0 ? val : minVote);
                setMaxVote(val > maxOpt ? maxOpt : val > 0 ? val : 1);
              }}
              label="Maksimum valg"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleAddPoll}>
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
