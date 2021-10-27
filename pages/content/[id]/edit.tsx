import React, { useState, useEffect, Suspense } from "react";
import {
  Image,
  Link as NextLink,
  AuthorTextField,
  FileUploader,
  Editor,
  ExpandButton,
  ContentBreadcrumps,
} from "comps";
import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  authorships_insert_input,
  authorships,
} from "gql";
import {
  Box,
  Divider,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  Link,
  CardContent,
  TextField,
  Grid,
  Paper,
  CardHeader,
  Tooltip,
  Collapse,
  Avatar,
} from "@mui/material";
import { Publish, Save, Delete, Subject, Edit } from "@mui/icons-material";
import { useSession } from "hooks";

const getFileUrl = (file: any) =>
  file?.path && file?.token
    ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${file?.path}?token=${file?.token}`
    : null;

export default function Id() {
  const [_, setSession] = useSession();
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    if (id) setSession({ path: `/content/${id}/edit` });
  }, [id]);

  if (!id) return null;

  return (
    <Suspense fallback={null}>
      <IdRaw id={id} />
    </Suspense>
  );
}

function IdRaw({ id }: { id: string }) {
  const [session] = useSession();
  const router = useRouter();
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const [updateContent] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_contents_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    }
  );
  const [deleteContent] = useMutation((mutation, id: string) => {
    return mutation.delete_contents_by_pk({ id })?.id;
  });
  const [deleteAuthors] = useMutation((mutation, id: string) => {
    return mutation.delete_authorships_by_pk({ id })?.id;
  });
  const [addAuthors] = useMutation(
    (mutation, args: authorships_insert_input[]) => {
      return mutation.insert_authorships({ objects: args })?.returning;
    }
  );

  const [expand, setExpand] = useState(true);
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState<authorships[]>([]);
  const [data, setData] = useState("");
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (content) {
      setName(content?.name ?? "");
      setAuthors(content?.authors().map((author) => ({ ...author })));
      setData(content?.data ?? "");
      setImage(getFileUrl(content?.file));
    }
  }, [content]);

  const handleSave = (published: boolean) => async () => {
    await updateContent({
      args: { id, set: { name, data, published, fileId: image?.id } },
    });
    await deleteAuthors({ args: id });
    const objects = authors.map((author: any) =>
      author.identity?.email
        ? { contentId: id, email: author.identity?.email }
        : { contentId: id, name: author.name }
    );
    await addAuthors({ args: objects });
    router.push(`/content/${id}`);
  };

  const handleDelete = async () => {
    await deleteContent({ args: id });

    if (content?.parentId) {
      router.push(`/content/${content?.parent?.id}`);
    } else {
      router.push(`/folder/${content?.folder?.id}`);
    }
  };

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  return (
    <>
      <ContentBreadcrumps id={id} />
      <Card elevation={3} sx={{ m: 1 }}>
        <CardHeader
          title={name}
          avatar={
            <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
              <Edit />
            </Avatar>
          }
          subheader={
            !(content?.parent && content?.folder?.mode === "candidates")
              ? formatAuthors(authors)
              : ""
          }
          action={<ExpandButton onClick={() => setExpand(!expand)} />}
        />
        <Divider />
        <Collapse in={expand} timeout="auto">
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              endIcon={<Delete />}
              onClick={handleDelete}
            >
              Slet
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="primary"
              variant="contained"
              endIcon={<Save />}
              onClick={handleSave(false)}
            >
              Gem
            </Button>
            {!content?.published ||
              (session?.roles?.includes("admin") && (
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<Publish />}
                  onClick={handleSave(true)}
                >
                  Indsend
                </Button>
              ))}
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
              <Grid item xs={12}>
                <AuthorTextField value={authors} onChange={setAuthors} />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9}>
                    <FileUploader
                      contentId={content?.id}
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
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
      <Editor value={data} onChange={setData} />
    </>
  );
}
