import { CardActions, Button, Box } from "@material-ui/core";
import { Delete, Edit, Publish } from "@material-ui/icons";
import { useStyles } from "hooks";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CONTENT_UPDATE, CONTENT_DELETE } from "gql";

export default function ContentToolbar({ content }: { content: any }) {
  const classes = useStyles();
  const router = useRouter();
  const [updateContent] = useMutation(CONTENT_UPDATE);
  const [deleteContent] = useMutation(CONTENT_DELETE);

  const handleDelete = async () => {
    await deleteContent({ variables: { id: content?.id } });

    if (content.parent) {
      router.push(`/content/${content.parent.id}`);
    } else {
      router.push(`/folder/${content.folder.id}`);
    }
  };

  const handlePublish = async () => {
    await updateContent({
      variables: { id: content?.id, set: { published: true } },
    });
  };

  // TODO: properly style MUI buttons with next.js
  const handleEdit = async () => {
    router.push(`/content/${content?.id}/edit`);
  };

  return (
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
        endIcon={<Edit />}
        onClick={handleEdit}
      >
        Rediger
      </Button>
      {!content?.published && (
        <Button
          color="primary"
          variant="contained"
          endIcon={<Publish />}
          onClick={handlePublish}
        >
          Indsend
        </Button>
      )}
    </CardActions>
  );
}
