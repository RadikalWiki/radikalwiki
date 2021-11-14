import { CardActions, Box, Divider } from "@mui/material";
import {
  Delete,
  Edit,
  Publish,
  Visibility,
  VisibilityOff,
  Poll,
} from "@mui/icons-material";
import { useSession } from "hooks";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "gql";
import { AutoButton, PollDialog } from "comps";
import { useState } from "react";

function ContentToolbar({ id, child }: { id: string, child: boolean }) {
  const [session] = useSession();
  const router = useRouter();
  const query = useQuery();
  const [openPollDialog, setOpenPollDialog] = useState(false);
  const content = query.contents_by_pk({ id });
  const [updateContent] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_contents_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries: [
        query.contents_by_pk({ id }),
        query.contents({ where: { parentId: { _eq: id } } }),
      ],
    }
  );
  const [deleteContent] = useMutation(
    (mutation, id: string) => {
      return mutation.delete_contents_by_pk({ id })?.id;
    },
    {
      refetchQueries: [
        query.folders_by_pk({ id: content?.folderId })
      ],
    }
  );
  const [updateEvent] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_events_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    }
  );

  const editable =
    ((session?.user?.id === content?.creatorId ||
      (content
        ?.authors()
        .some((a: any) => a.identity?.user?.id === session?.user?.id) &&
        ((!content?.parent && !content?.folder?.lockContent) ||
          (content?.parent && !content?.folder?.lockChildren)))) &&
      !content?.published) ||
    session?.roles?.includes("admin");

  const handleDelete = async () => {
    await deleteContent({
      args: id,
    });

    if (content?.parentId) {
      router.push(`/content/${content.parentId}`);
    } else {
      router.push(`/folder/${content?.folderId}`);
    }
  };

  const handlePublish = async () => {
    await updateContent({
      args: { id: id, set: { published: true } },
    });
  };

  // TODO: properly style MUI buttons with next.js
  const handleEdit = async () => {
    router.push(`/content/${id}/edit`);
  };

  const handleAddPoll = async (_: any) => {
    setOpenPollDialog(true);
  };

  const handleFocusContent = (id: any) => async (_: any) => {
    await updateEvent({
      args: {
        id: session?.event?.id as string,
        set: { contentId: id, pollId: null },
      },
    });
  };

  const handleHide = (id: any) => async (_: any) => {
    await updateEvent({
      args: {
        id: session?.event?.id as string,
        set: { contentId: id, pollId: id },
      },
    });
  };

  if (!editable || !content) return null;

  return (
    <>
      <CardActions>
        {session?.roles?.includes("admin") && [
          <AutoButton
            key="focus"
            text="Vis"
            icon={<Visibility />}
            onClick={handleFocusContent(id)}
          />,
          <AutoButton
            key="hide"
            text="Skjul"
            icon={<VisibilityOff />}
            onClick={handleHide(null)}
          />,
          !(content?.parent && content?.folder?.mode == "candidates") && (
            <AutoButton
              key="poll"
              text="Ny afstemning"
              icon={<Poll />}
              onClick={handleAddPoll}
            />
          ),
        ]}
        <Box sx={{ flexGrow: 1 }} />
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
      {!child && (
        <PollDialog id={id} open={openPollDialog} setOpen={setOpenPollDialog} />
      )}
    </>
  );
}

export default ContentToolbar;
