import { CardContent, Grid, Paper } from "@material-ui/core";
import Image from "material-ui-image";
import { useStyles } from "hooks";

export default function Content({ content }: { content: any }) {
  const classes = useStyles();
  const image = content?.file
    ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${content.file.path}?token=${content.file.token}`
    : null;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={image ? 8 : 12}>
        {content?.data && (
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: content?.data }} />
          </CardContent>
        )}
      </Grid>
      {image && (
        <Grid item xs={12} sm={4}>
          <Paper className={classes.image}>
            <Image src={image} />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}