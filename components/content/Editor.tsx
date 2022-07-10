import React, { useState, useEffect, Suspense } from "react";
import {
  AuthorTextField,
  ExpandButton,
  AutoButton,
  Slate,
  FileUploader,
  Image,
} from "comps";
import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  members_insert_input,
  members_constraint,
  resolved,
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
  Paper,
  Button,
} from "@mui/material";
import { Publish, Save, Delete, Edit } from "@mui/icons-material";
import { fromId } from "core/path";
import { useNode } from "hooks";
import nhost from "nhost";

export default function Editor({ id }: { id: string }) {
  const router = useRouter();
  const node = useNode({
    id,
  });
  const query = node.query;
  const parentId = query?.parentId;

  const [expand, setExpand] = useState(true);
  const [name, setName] = useState("");
  const [members, setMembers] = useState<
    { nodeId: string; name?: string; email?: string }[]
  >([]);
  const [content, setContent] = useState<any>();
  const [fileId, setFileId] = useState<any>();
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (query) {
      if (!["wiki/group", "wiki/event"].includes(query?.mimeId ?? "")) {
        const fetchMembers = async () => {
          const members = await resolved(() =>
            query?.members().map((member) => ({
              nodeId: member?.nodeId,
              name: member?.name!,
              email: member?.email!,
            }))
          );
          if (members?.[0]?.nodeId || members?.[0]?.email || members?.[0]?.name)
            setMembers(members);
        };
        fetchMembers();
      }
      const fetch = async () => {
        const { name, data } = await resolved(
          () => {
            return { name: query.name, data: query.data() };
          },
          { noCache: true }
        );
        setName(name ?? "");
        setContent(data?.content);
        //const { presignedUrl } = await nhost.storage.getPresignedUrl({ fileId: data?.image });
        setFileId(data?.image);
      };
      fetch();
    }
  }, [query]);

  useEffect(() => {
    const fetch = async () => {
      const { presignedUrl } = await nhost.storage.getPresignedUrl({ fileId });
      setImage(presignedUrl?.url);
    };
    fetch()
  }, [fileId]);

  const handleSave = (mutable?: boolean) => async () => {
    if (!["wiki/group", "wiki/event"].includes(query?.mimeId ?? "")) {
      await node.members.delete();
      await node.members.insert(members);
    }
    await node.update({ name, data: { content, image: fileId }, mutable });
    router.push(router.asPath.split("?")[0]);
  };

  const handleDelete = async () => {
    await node.members.delete();
    await node.delete();
    const path = await fromId(parentId);
    router.push("/" + path.join("/"));
  };

  const editable = query?.mutable && query?.isOwner;

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
              {!["wiki/group", "wiki/event"].includes(query?.mimeId ?? "") && (
                <Grid item xs={12}>
                  <AuthorTextField value={members} onChange={setMembers} />
                </Grid>
              )}
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9}>
                    <FileUploader
                      contentId={query?.id}
                      onNewFile={async ({ fileId }: { fileId: string }) => {
                        setFileId(fileId);
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="secondary"
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
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
        <Slate value={content} onChange={setContent} readOnly={false} />
      </Card>
    </>
  );
}
