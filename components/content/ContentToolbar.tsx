import {
  CardActions,
  Box,
  Divider,
  Popover,
  Paper,
  Slider,
} from "@mui/material";
import {
  Delete,
  Edit,
  Publish,
  Visibility,
  VisibilityOff,
  Poll,
  People,
  ZoomIn,
} from "@mui/icons-material";
import { Node, useNode, useSession } from "hooks";
import { useRouter } from "next/router";
import { AutoButton, PollDialog } from "comps";
import { useState } from "react";
import { fromId } from "core/path";

const marks = [
  {
    value: 50,
    label: "50%",
  },
  {
    value: 100,
    label: "100%",
  },
  {
    value: 150,
    label: "150%",
  },
  {
    value: 200,
    label: "200%",
  },
  {
    value: 250,
    label: "250%",
  },
];
export default function ContentToolbar({
  node,
  child,
}: {
  node: Node;
  child: boolean;
}) {
  const query = node.query;
  const [_, setSession] = useSession();
  const router = useRouter();
  const [openPollDialog, setOpenPollDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const parentId = query?.parentId;
  const namespace = query?.namespace;
  const inserts = query?.inserts()?.map(mime => mime.id)

  const handleDelete = async () => {
    await node.delete();

    const path = await fromId(parentId);
    router.push("/" + path.join("/"));
  };

  const handlePublish = async () => {
    await node.update({ set: { mutable: false } });
  };

  const handleAddPoll = (_: any) => {
    setOpenPollDialog(true);
  };

  const handleFocus = (id: string | null) => async (_: any) => {
    await node.context.set("active", id);
  };

  if (!(query?.mutable && query?.isOwner) && !query?.isContextOwner)
    return null;

  return (
    <>
      <CardActions>
        {query?.isContextOwner && [
          <AutoButton
            key="focus"
            text="Vis"
            icon={<Visibility />}
            onClick={handleFocus(node.id)}
          />,
          <AutoButton
            key="hide"
            text="Skjul"
            icon={<VisibilityOff />}
            onClick={handleFocus(null)}
          />,
          !child && (
            <AutoButton
              key="zoom"
              text="Zoom"
              icon={<ZoomIn />}
              onClick={(e: any) => setAnchorEl(e.currentTarget)}
            />
          ),
          inserts?.includes("vote/poll") && (
            <AutoButton
              key="poll"
              text="Ny afstemning"
              icon={<Poll />}
              onClick={handleAddPoll}
            />
          ),
          ["wiki/event", "wiki/group"].includes(query?.mimeId ?? "") && (
            <AutoButton
              key="member"
              text="Medlemmer"
              icon={<People />}
              onClick={() => router.push(`${router.asPath}?app=member`)}
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
        {query?.mimeId !== "wiki/file" && <AutoButton
          key="edit"
          text="Rediger"
          icon={<Edit />}
          onClick={() =>
            router.push(
              `${router.asPath + (child ? `/${namespace}` : "")}?app=editor`
            )
          }
        />}
        {query?.mutable && (
          <AutoButton
            key="sent"
            text="Indsend"
            icon={<Publish />}
            onClick={handlePublish}
          />
        )}
      </CardActions>
      <Divider />
      {!child && [
        inserts?.includes("vote/poll") && (
          <PollDialog
            key="poll-dialog"
            node={node}
            open={openPollDialog}
            setOpen={setOpenPollDialog}
          />
        ),
        <Popover
          key="zoom-slider"
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={() => setAnchorEl(null)}
        >
          <Paper>
            <Slider
              sx={{ width: 200, margin: 3 }}
              min={50}
              max={250}
              defaultValue={200}
              step={50}
              marks={marks}
              onChange={(_, newValue) =>
                setSession({ screen: { size: `${newValue}%` } })
              }
            />
          </Paper>
        </Popover>,
      ]}
    </>
  );
}
