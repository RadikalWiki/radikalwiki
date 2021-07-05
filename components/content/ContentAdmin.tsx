import React from "react";
import { useRouter } from "next/router";
import { Button, ButtonGroup } from "@material-ui/core";
import { useStyles } from "hooks";
import { useMutation, useQuery } from "@apollo/client";
import { AdminCard } from "comps";
import {
  CONTENT_GET,
  EVENT_SET_CONTENT,
  EVENT_SET_POLL,
  POLL_ADD,
  POLL_DEL,
  POLL_STOP,
} from "gql";

export default function ContentCard({ id }: { id: string }) {
  const router = useRouter();
  const classes = useStyles();
  const [addPoll] = useMutation(POLL_ADD);
  const [stopPoll] = useMutation(POLL_STOP);
  const [focusContent] = useMutation(EVENT_SET_CONTENT);
  const [focusPoll] = useMutation(EVENT_SET_POLL);
  const { data } = useQuery(CONTENT_GET, { variables: { id } });

  const content = data?.content;

  const handleAddPoll = async (_: any) => {
    stopPoll();
    const { data: { poll } = {} } = await addPoll({
      variables: { contentId: id },
    });
    await focusPoll({ variables: { pollId: poll?.id } });
    router.push(`/poll/${poll.id}`);
  };

  const handleStopPoll = (_: any) => {
    stopPoll();
  };

  const handleFocusContent = (id: any) => async (_: any) => {
    await focusContent({ variables: { contentId: id } });
  };

  if (!content) return null;

  return (
    <AdminCard show={true}>
      <ButtonGroup
        variant="contained"
        color="primary"
        className={classes.adminButton}
      >
        <Button size="large" color="secondary" onClick={handleFocusContent(id)}>
          Vis på skærm
        </Button>
        <Button
          size="large"
          color="secondary"
          onClick={handleFocusContent(null)}
        >
          Skjul på skærm
        </Button>
      </ButtonGroup>
      <Button
        size="large"
        className={classes.adminButton}
        color="secondary"
        variant="contained"
        onClick={handleAddPoll}
      >
        Start ny afstemning
      </Button>
    </AdminCard>
  );
}
