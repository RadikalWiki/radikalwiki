import { CardActions, Box, Divider } from "@material-ui/core";
import {
  Delete,
  Edit,
  Publish,
  Visibility,
  VisibilityOff,
  Poll,
} from "@material-ui/icons";
import { useSession, useStyles } from "hooks";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  CONTENT_GET_TOOLBAR,
  CONTENT_UPDATE,
  CONTENT_DELETE,
  EVENT_UPDATE,
} from "gql";
import { AutoButton, PollDialog } from "comps";
import { memo, useState } from "react";

function ContentToolbar({ contentId }: { contentId: string }) {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();

  const [openPollDialog, setOpenPollDialog] = useState(false);
  const [updateContent] = useMutation(CONTENT_UPDATE);
  const [deleteContent] = useMutation(CONTENT_DELETE);
  const [updateEvent] = useMutation(EVENT_UPDATE);
  const {
    data: { content } = {},
    loading,
    error,
  } = useQuery(CONTENT_GET_TOOLBAR, {
    variables: { id: contentId },
  });

  const editable =
    ((session?.user.id === content?.creatorId ||
      (content?.authors.some(
        (a: any) => a.identity?.user?.id === session?.user.id
      ) &&
        ((!content?.parent && !content?.folder.lockContent) ||
          (content?.parent && !content?.folder.lockChildren)))) &&
      !content?.published) ||
    session?.roles.includes("admin");

  const handleDelete = async () => {
    await deleteContent({
      variables: { id: contentId },

      refetchQueries: [
        { query: CONTENT_GET_TOOLBAR, variables: { id: contentId } },
      ],
    });

    if (content.parent) {
      router.push(`/content/${content.parent.id}`);
    } else {
      router.push(`/folder/${content.folder.id}`);
    }
  };

  const handlePublish = async () => {
    await updateContent({
      variables: { id: contentId, set: { published: true } },
      refetchQueries: [
        { query: CONTENT_GET_TOOLBAR, variables: { id: contentId } },
      ],
    });
  };

  // TODO: properly style MUI buttons with next.js
  const handleEdit = async () => {
    router.push(`/content/${contentId}/edit`);
  };

  const handleAddPoll = async (_: any) => {
    setOpenPollDialog(true);
  };

  const handleFocusContent = (id: any) => async (_: any) => {
    await updateEvent({
      variables: {
        id: session?.event?.id,
        set: { contentId: id, pollId: null },
      },
    });
  };

  const handleHide = (id: any) => async (_: any) => {
    await updateEvent({
      variables: { id: session?.event?.id, set: { contentId: id, pollId: id } },
    });
  };

  if (!editable) return null;

  return (
    <>
      <CardActions>
        {session?.roles.includes("admin") && [
          <AutoButton
            key="focus"
            text="Vis"
            icon={<Visibility />}
            onClick={handleFocusContent(contentId)}
          />,
          <AutoButton
            key="hide"
            text="Skjul"
            icon={<VisibilityOff />}
            onClick={handleHide(null)}
          />,
          !(content?.parent && content?.folder.mode == "candidates") && (
            <AutoButton
              key="poll"
              text="Ny afstemning"
              icon={<Poll />}
              onClick={handleAddPoll}
            />
          ),
        ]}
        <Box className={classes.flexGrow} />
        <AutoButton
          key="delete"
          text="Slet"
          icon={<Delete />}
          onClick={handleDelete}
        />
        <AutoButton
          key="edit"
          text="Rediger"
          icon={<Edit />}
          onClick={handleEdit}
        />
        {!content?.published && (
          <AutoButton
            key="sent"
            text="Indsend"
            icon={<Publish />}
            onClick={handlePublish}
          />
        )}
      </CardActions>
      <Divider />
      {!(content?.parent && content?.folder.mode == "candidates") && (
        <PollDialog
          content={content}
          open={openPollDialog}
          setOpen={setOpenPollDialog}
        />
      )}
    </>
  );
}

export default memo(ContentToolbar);
