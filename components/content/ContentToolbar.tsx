import { CardActions, Button, Box } from "@material-ui/core";
import { Delete, Edit, Publish } from "@material-ui/icons";
import { useSession, useStyles } from "hooks";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  CONTENT_UPDATE,
  CONTENT_DELETE,
  POLL_ADD,
  POLL_STOP,
  EVENT_UPDATE,
} from "gql";

export default function ContentToolbar({ content }: { content: any }) {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const [updateContent] = useMutation(CONTENT_UPDATE);
  const [deleteContent] = useMutation(CONTENT_DELETE);
  const [addPoll] = useMutation(POLL_ADD);
  const [stopPoll] = useMutation(POLL_STOP);
  const [updateEvent] = useMutation(EVENT_UPDATE);

  const handleDelete = async () => {
    await deleteContent({ variables: { id: content?.id } });

    if (content.parent) {
      router.push(`/content/${content.parent.id}`);
    } else {
      router.push(`/folder/${content.folder.id}`);
    }
  };

  const handlePublish = async () => {
    await updateContent({
      variables: { id: content?.id, set: { published: true } },
    });
  };

  // TODO: properly style MUI buttons with next.js
  const handleEdit = async () => {
    router.push(`/content/${content?.id}/edit`);
  };

  const handleAddPoll = async (_: any) => {
    stopPoll({ variables: { eventId: session?.event?.id } });
    const { data: { poll } = {} } = await addPoll({
      variables: { object: { contentId: content.id } },
    });
    await updateEvent({
      variables: { id: session?.event?.id, set: { pollId: poll?.id } },
    });
    router.push(`/poll/${poll.id}`);
  };

  const handleFocusContent = (id: any) => async (_: any) => {
    await updateEvent({
      variables: { id: session?.event?.id, set: { contentId: id } },
    });
  };

  return (
    <CardActions>
      <Button
        color="primary"
        variant="contained"
        onClick={handleFocusContent(content?.id)}
      >
        Vis
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={handleFocusContent(null)}
      >
        Skjul
      </Button>
      {!(content?.parent && content?.folder.mode == "candidates") && (
        <Button
          className={classes.adminButton}
          color="primary"
          variant="contained"
          onClick={handleAddPoll}
        >
          Ny afstemning
        </Button>
      )}
      <Box className={classes.flexGrow} />
      <Button
        color="primary"
        variant="contained"
        endIcon={<Delete />}
        onClick={handleDelete}
      >
        Slet
      </Button>
      <Button
        color="primary"
        variant="contained"
        endIcon={<Edit />}
        onClick={handleEdit}
      >
        Rediger
      </Button>
      {!content?.published && (
        <Button
          color="primary"
          variant="contained"
          endIcon={<Publish />}
          onClick={handlePublish}
        >
          Indsend
        </Button>
      )}
    </CardActions>
  );
}
