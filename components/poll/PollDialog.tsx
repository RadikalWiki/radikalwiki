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
} from "@material-ui/core";
import { POLL_ADD, POLL_STOP, EVENT_UPDATE } from "gql";
import { useMutation } from "@apollo/client";
import { useSession, useStyles } from "hooks";

export default function PollDialog({
  open,
  setOpen,
  content,
}: {
  open: boolean;
  setOpen: any;
  content: any;
}) {
  const router = useRouter();
  const [session, setSession] = useSession();
  const [minVote, setMinVote] = useState(1);
  const [maxVote, setMaxVote] = useState(1);
  const [addPoll] = useMutation(POLL_ADD);
  const [stopPoll] = useMutation(POLL_STOP);
  const [updateEvent] = useMutation(EVENT_UPDATE);

  const options =
    content?.folder.mode == "changes"
      ? ["For", "Imod", "Blank"]
      : content?.children.map((content: any) => content.name).concat("Blank");
  const optionsCount = options?.length;

  const handleAddPoll = async (_: any) => {
    stopPoll({ variables: { eventId: session?.event?.id } });
    const { data: { poll } = {} } = await addPoll({
      variables: {
        object: {
          contentId: content.id,
          minVote,
          maxVote,
          options: `{${options}}`,
        },
      },
    });
    await updateEvent({
      variables: { id: session?.event?.id, set: { pollId: poll?.id } },
    });
    router.push(`/poll/${poll.id}`);
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
              disabled={content?.folder.mode == "changes"}
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
              disabled={content?.folder.mode == "changes"}
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddPoll}>Start</Button>
      </DialogActions>
    </Dialog>
  );
}
