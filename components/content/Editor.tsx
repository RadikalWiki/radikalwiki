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
import { resolved } from "gql";
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
import { Node } from "hooks";
import { nhost } from "nhost";

export default function Editor({ node }: { node: Node }) {
  const router = useRouter();
  const query = node.useQuery();
  const update = node.useUpdate();
  const $delete = node.useDelete();
  const nodeMembers = node.useMembers();
  const parentId = query?.parentId;
  const data = query?.data();

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
          const members = await resolved(() => {
            return query?.members().map(({ nodeId, name, email, node }) => ({
              nodeId: nodeId!,
              name: name!,
              email: email!,
              mimeId: node?.mimeId,
            }));
          });
          if (members?.[0]?.nodeId || members?.[0]?.email || members?.[0]?.name)
            setMembers(members);
        };
        fetchMembers();
      }
      const fetch = async () => {
        setName(query.name ?? "");
        setContent(structuredClone(data?.content));
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
    if (fileId) {
      fetch();
    }
  }, [fileId]);

  const handleSave = (mutable?: boolean) => async () => {
    if (!["wiki/group", "wiki/event"].includes(query?.mimeId ?? "")) {
      await nodeMembers.delete();
      await nodeMembers.insert(members.map(member => ({ ...member, mimeId: undefined })));
    }
    await update({
      set: { name, data: { content, image: fileId }, mutable },
    });
    router.push(router.asPath.split("?")[0]);
  };

  const handleDelete = async () => {
    await nodeMembers.delete();
    await $delete();
    const path = await fromId(parentId);
    router.push("/" + path.join("/"));
  };

  const editable = query?.mutable && query?.isOwner;

  return (
    <>
      <Card sx={{ m: 0 }}>
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
                      text="Upload Billede"
                      onNewFile={async ({ fileId }: { fileId: string }) => {
                        setFileId(fileId);
                      }}
                    />
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
        <Slate
          value={content}
          onChange={(value: any) => setContent(structuredClone(value))}
          readOnly={false}
        />
      </Card>
    </>
  );
}
