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
import { useSession } from "hooks";
import { useRouter } from "next/router";
import { AutoButton, PollDialog } from "comps";
import { useState } from "react";
import {
  nodes_set_input,
  relations_constraint,
  relations_insert_input,
  relations_update_column,
  useMutation,
  useQuery,
} from "gql";
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
  id,
  child,
}: {
  id: string;
  child: boolean;
}) {
  const [_, setSession] = useSession();
  const router = useRouter();
  const [openPollDialog, setOpenPollDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const query = useQuery();
  const node = query.node({ id });
  const contextId = node?.context?.id;
  const namespace = node?.namespace;
  const parentId = node?.parentId;

  const [updateNode] = useMutation(
    (mutation, args: nodes_set_input) => {
      return mutation.updateNode({
        pk_columns: { id },
        _set: args,
      })?.id;
    },
    { refetchQueries: [node, query.node({ id: parentId })] }
  );

  const [deleteContent] = useMutation(
    (mutation, id: string) => {
      return mutation.deleteNode({ id })?.id;
    },
    {
      refetchQueries: [query.node({ id: parentId })],
    }
  );

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

  const handleDelete = async () => {
    await deleteContent({ args: id });

    const path = await fromId(parentId);
    router.push("/" + path.join("/"));
  };

  const handlePublish = async () => {
    await updateNode({ args: { mutable: false } });
  };

  const handleAddPoll = async (_: any) => {
    setOpenPollDialog(true);
  };

  const handleFocus = (id: string | null) => async (_: any) => {
    await set("active", id);
  };

  if (!(node?.mutable && node?.isOwner) && !node?.isContextOwner) return null;

  return (
    <>
      <CardActions>
        {
          node?.isContextOwner && [
            <AutoButton
              key="focus"
              text="Vis"
              icon={<Visibility />}
              onClick={handleFocus(id)}
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
            ["vote/policy", "vote/position", "vote/change"].includes(
              node?.mimeId ?? ""
            ) && (
              <AutoButton
                key="poll"
                text="Ny afstemning"
                icon={<Poll />}
                onClick={handleAddPoll}
              />
            ),
            ["wiki/event", "wiki/group"].includes(node?.mimeId ?? "") && (
              <AutoButton
                key="member"
                text="Medlemmer"
                icon={<People />}
                onClick={() => router.push(`${router.asPath}?app=member`)}
              />
            ),
          ]
        }
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
          onClick={() =>
            router.push(
              `${router.asPath + (child ? `/${namespace}` : "")}?app=editor`
            )
          }
        />
        {node?.mutable && (
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
        <PollDialog
          key="poll-dialog"
          id={id}
          open={openPollDialog}
          setOpen={setOpenPollDialog}
        />,
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
