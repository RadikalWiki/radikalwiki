import React, { useState, useEffect } from "react";
import { Link as NextLink, AuthorTextField, FileUploader, Editor } from "comps";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useStyles, useSession } from "hooks";
import Image from "material-ui-image";
import {
  CONTENT_GET,
  CONTENT_UPDATE,
  CONTENT_DELETE,
  AUTHORSHIPS_ADD,
  CONTENT_DELETE_AUTHORSHIPS,
} from "gql";
import {
  Box,
  Divider,
  IconButton,
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
} from "@material-ui/core";
import { Publish, Save, Delete, ExpandMore, Subject } from "@material-ui/icons";

const getFileUrl = (file: any) =>
  file
    ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${file.path}?token=${file.token}`
    : null;

export default function Id() {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const {
    loading,
    data: { content } = {},
    error,
  } = useQuery(CONTENT_GET, {
    variables: { id },
  });
  const [updateContent] = useMutation(CONTENT_UPDATE);
  const [deleteContent] = useMutation(CONTENT_DELETE);
  const [delAuthors] = useMutation(CONTENT_DELETE_AUTHORSHIPS);
  const [addAuthors] = useMutation(AUTHORSHIPS_ADD);

  const [expand, setExpand] = useState(true);
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState([]);
  const [data, setData] = useState("");
  const [image, setImage] = useState<{
    id: string;
    path: string;
    token: string;
  } | null>(null);

  useEffect(() => {
    if (content) {
      setName(content.name);
      setAuthors(content.authors);
      setData(content.data);
      setImage(content.file);
    }
  }, [content]);

  const handleSave = (published: boolean) => async () => {
    await updateContent({
      variables: { id, set: { name, data, published, fileId: image?.id } },
    });
    await delAuthors({ variables: { id } });
    const objects = authors.map((author: any) =>
      author.email || author.identity?.email
        ? { contentId: id, email: author.email ?? author.identity?.email }
        : { contentId: id, name: author.name }
    );
    await addAuthors({ variables: { objects } });
    router.push(`/content/${id}`);
  };

  const handleDelete = async () => {
    await deleteContent({ variables: { id } });

    if (content.parent) {
      router.push(`/content/${content.parent.id}`);
    } else {
      router.push(`/folder/${content.folder.id}`);
    }
  };

  const formatAuthors = (a: any) =>
    a?.map((a: any) => a.identity?.displayName ?? a.name).join(", ");

  return (
    <>
      <Card className={classes.card}>
        <Breadcrumbs className={classes.bread}>
          <Link
            component={NextLink}
            className={classes.breadText}
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
              href={`/folder/${content?.folder.id}`}
            >
              {content?.folder.name}
            </Link>
          )}
          <Link component={NextLink} color="primary" href={`/content/${id}`}>
            {name}
          </Link>
        </Breadcrumbs>
      </Card>
      <Card className={classes.card}>
        <CardHeader
          title={`${name} (Redigering)`}
          subheader={
            !(content?.parent && content?.folder.mode === "candidates")
              ? formatAuthors(authors)
              : ""
          }
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expand,
              })}
              color="primary"
              onClick={() => setExpand(!expand)}
            >
              <Tooltip title={expand ? "Skjul" : "Vis"}>
                <ExpandMore />
              </Tooltip>
            </IconButton>
          }
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
            <Box className={classes.flexGrow} />
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
                      <Paper className={classes.image}>
                        <Image src={getFileUrl(image) || ""} />
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
