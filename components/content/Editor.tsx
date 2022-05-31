import React, { useState, useEffect, Suspense } from "react";
import { AuthorTextField, Quill, ExpandButton } from "comps";
import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  members_insert_input,
  members_constraint,
} from "gql";
import {
  Box,
  Divider,
  Card,
  CardActions,
  CardContent,
  TextField,
  Grid,
  CardHeader,
  Collapse,
  Avatar,
  Typography,
} from "@mui/material";
import { Publish, Save, Delete, Edit } from "@mui/icons-material";
import { AutoButton } from "comps/common";
import { fromId } from "core/path";

const getFileUrl = (file: any) =>
  file?.path && file?.token
    ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${file?.path}?token=${file?.token}`
    : null;

export default function Editor({ id }: { id: string }) {
  const router = useRouter();
  const query = useQuery();
  const node = query.node({ id });
  const parentId = node?.parentId;

  const [updateContent] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.updateNode({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries: [node],
    }
  );
  const [deleteContent] = useMutation(
    (mutation, id: string) => {
      return mutation.deleteNode({ id })?.id;
    },
    {
      refetchQueries: [query.node({ id: parentId })],
    }
  );

  const [addMember] = useMutation(
    (mutation, args: members_insert_input) => {
      return mutation.insertMember({
        object: args,
        on_conflict: {
          constraint: members_constraint.members_parent_id_node_id_key,
          update_columns: [],
        },
      })?.id;
    },
    {
      refetchQueries: [node],
    }
  );

  const [deleteMembers] = useMutation(
    (mutation) => {
      return mutation.deleteMembers({ where: { parentId: { _eq: id } } })
        ?.affected_rows;
    },
    {
      refetchQueries: [node],
    }
  );

  const [expand, setExpand] = useState(true);
  const [name, setName] = useState("");
  const [members, setMembers] = useState<
    { nodeId: string; name?: string; email?: string }[]
  >([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (node) {
      setName(node?.name ?? "");
      const members = node?.members().map((member) => ({
        nodeId: member?.nodeId,
        name: member?.name!,
        email: member?.email!,
      }));
      setMembers(members);
      setContent(node?.data({ path: "content" }) ?? "");
      //setImage(getFileUrl(node?.file));
    }
  }, [node]);

  const handleSave = (mutable?: boolean) => async () => {
    await deleteMembers();
    members.map(async (member) => {
      await addMember({ args: { ...member, parentId: id } });
    });
    await updateContent({
      args: {
        id,
        set: { name, data: { content }, mutable },
      },
    });
    router.push(router.asPath.split("?")[0]);
  };

  const handleDelete = async () => {
    await deleteContent({ args: id });
    const path = await fromId(parentId);
    router.push("/" + path.join("/"));
  };

  const editable = node?.mutable && node?.isOwner;

  return (
    <>
      <Card elevation={3} sx={{ m: 1 }}>
        <CardHeader
          title={<Typography color="secondary">{name}</Typography>}
          avatar={
            <Avatar sx={{ bgcolor: (t) => t.palette.secondary.main }}>
              <Edit />
            </Avatar>
          }
          action={<ExpandButton onClick={() => setExpand(!expand)} />}
        />
        <Divider />
        <Collapse in={expand} timeout="auto">
          <CardActions>
            <AutoButton text="Slet" icon={<Delete />} onClick={handleDelete} />
            <Box sx={{ flexGrow: 1 }} />
            <AutoButton text="Gem" icon={<Save />} onClick={handleSave()} />
            {editable && (
              <AutoButton
                text="Indsend"
                icon={<Publish />}
                onClick={handleSave(false)}
              />
            )}
          </CardActions>
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  label="Titel"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              {!["wiki/group", "wiki/event"].includes(
                node?.mime?.name ?? ""
              ) && (
                <Grid item xs={12}>
                  <AuthorTextField value={members} onChange={setMembers} />
                </Grid>
              )}
              {/* <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9}>
                    <FileUploader
                      contentId={node?.id}
                      onNewFile={(file: any) => setImage(getFileUrl(file))}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload Billede
                      </Button>
                    </FileUploader>
                  </Grid>
                  {image && (
                    <Grid item xs={3}>
                      <Paper sx={{ p: 1, m: 1 }}>
                        <Image alt="Billede for indhold" src={image} />
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </Grid> */}
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
      <Quill value={content} onChange={setContent} />
    </>
  );
}
