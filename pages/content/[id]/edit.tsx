import React, { useState, useEffect } from "react";
import { Link as NextLink, AuthorTextField, FileUploader, Editor } from "comps";
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
  Breadcrumbs,
  Card,
  Button,
  CardActions,
  Link,
  Typography,
  CardContent,
  TextField,
  Grid,
  ButtonGroup,
  Paper,
} from "@material-ui/core";
import { Publish, Save, Delete } from "@material-ui/icons";

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
    await delAuthors({ variables: { contentId: id } });
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
      router.push(`/category/${content.category.id}`);
    }
  };
  console.log(content);

  return (
    <>
      <Card className={classes.card}>
        <Breadcrumbs className={classes.bread}>
          <Link component={NextLink} color="primary" href="/category">
            <Typography className={classes.breadText}>Indhold</Typography>
          </Link>
          <Link
            component={NextLink}
            color="primary"
            href={`/category/${content?.category.id}`}
          >
            {content?.category.name}
          </Link>
          {content?.parent && (
            <Link
              component={NextLink}
              color="primary"
              href={`/content/${content?.parent.id}`}
            >
              {content?.parent.name}
            </Link>
          )}
          <Link component={NextLink} color="primary" href={`/content/${id}`}>
            {name}
          </Link>
        </Breadcrumbs>
      </Card>
      <Card className={classes.card}>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Delete />}
            onClick={handleDelete}
          >
            Slet
          </Button>
          <div className={classes.flexGrow} />
          <ButtonGroup variant="contained" color="primary">
            <Button endIcon={<Save />} onClick={handleSave(false)}>
              Gem
            </Button>
            <Button endIcon={<Publish />} onClick={handleSave(true)}>
              Indsend
            </Button>
          </ButtonGroup>
        </CardActions>
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
      </Card>
      <Editor value={data} onChange={setData} />
    </>
  );
}
