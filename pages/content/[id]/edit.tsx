import React, { useState, useEffect, Suspense } from "react";
import {
  Link as NextLink,
  AuthorTextField,
  FileUploader,
  Editor,
  ExpandButton,
} from "comps";
import { useRouter } from "next/router";
import {
  useQuery,
  useMutation,
  authorships_insert_input,
  authorships,
} from "gql";
import Image from "next/image";
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
} from "@mui/material";
import { Publish, Save, Delete, Subject } from "@mui/icons-material";

const getFileUrl = (file: any) =>
  file
    ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${file.path}?token=${file.token}`
    : null;

export default function Id() {
  return (
    <Suspense fallback={null}>
      <IdRaw />
    </Suspense>
  );
}

function IdRaw() {
  const router = useRouter();
  const id = router.query.id as string;
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const [updateContent] = useMutation(
    (mutation, args: { id: string; set: any }) => {
      return mutation.update_contents_by_pk({
        pk_columns: { id: args.id },
        _set: args.set,
      });
    }
  );
  const [deleteContent] = useMutation((mutation, id: string) => {
    return mutation.delete_contents_by_pk({ id });
  });
  const [deleteAuthors] = useMutation((mutation, id: string) => {
    return mutation.delete_authorships_by_pk({ id });
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
      setImage({ ...content?.file } ?? "");
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
      <Breadcrumbs sx={{ p: [2, 0, 2, 2] }}>
        <Link
          component={NextLink}
          sx={{ alignItems: "center", display: "flex" }}
          color="primary"
          href="/folder"
        >
          <Tooltip title="Indhold">
            <Subject />
          </Tooltip>
        </Link>
        {content?.parent ? (
          <Link
            component={NextLink}
            color="primary"
            href={`/content/${content?.parent.id}`}
          >
            {content?.parent.name}
          </Link>
        ) : (
          <Link
            component={NextLink}
            color="primary"
            href={`/folder/${content?.folder?.id}`}
          >
            {content?.folder?.name}
          </Link>
        )}
        <Link component={NextLink} color="primary" href={`/content/${id}`}>
          {name}
        </Link>
      </Breadcrumbs>
      <Card elevation={3} sx={{ m: 1 }}>
        <CardHeader
          title={`${name} (Redigering)`}
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
            {!content?.published && (
              <Button
                color="primary"
                variant="contained"
                endIcon={<Publish />}
                onClick={handleSave(true)}
              >
                Indsend
              </Button>
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
              <Grid item xs={12}>
                <AuthorTextField value={authors} onChange={setAuthors} />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9}>
                    <FileUploader contentId={content?.id} onNewFile={setImage}>
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
                        <Image
                          alt="Billede for indhold"
                          src={getFileUrl(image) || ""}
                        />
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
