import React, { useState, useEffect } from "react";
import { Link as NextLink, AuthorTextField, FileUploader, Editor } from "comps";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useStyles, useSession } from "hooks";

import {
  CONTENT_GET,
  CONTENT_UPDATE,
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
} from "@material-ui/core";
import { Publish, Save } from "@material-ui/icons";

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
  const [delAuthors] = useMutation(CONTENT_DELETE_AUTHORSHIPS);
  const [addAuthors] = useMutation(AUTHORSHIPS_ADD);

  const [name, setName] = useState("");
  const [authors, setAuthors] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    if (content) {
      setName(content.name);
      setAuthors(content.authors);
      setData(content.data);
    }
  }, [content]);

  const handleSave = (published: boolean) => async () => {
    await updateContent({ variables: { id, set: { name, data, published } } });
    await delAuthors({ variables: { contentId: id } });
    const objects = authors.map((author: any) =>
      author.identity?.email
        ? { contentId: id, email: author.identity.email }
        : { contentId: id, name: author.name }
    );
    const res = await addAuthors({ variables: { objects } });
  };

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
          {/*<FileUploader>
            <Button variant="contained" component="span">
              Upload Billede
            </Button>
          </FileUploader>*/}
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
          </Grid>
        </CardContent>
      </Card>
      <Editor value={data} onChange={setData} />
    </>
  );
}
