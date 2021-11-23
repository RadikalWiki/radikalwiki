import { CardContent, Grid, Paper, Box } from "@mui/material";
import { Image } from "comps";
import { useQuery } from "gql";

function Content({ id, fontSize }: { id: string; fontSize: string }) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const image =
    content?.file?.path && content.file?.token
      ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${content.file?.path}?token=${content.file?.token}`
      : null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={image ? 8 : 12}>
        {content?.data && (
          <CardContent>
            <Box
              dangerouslySetInnerHTML={{ __html: content?.data }}
              sx={{ fontSize, overflowX: "auto" }}
            />
          </CardContent>
        )}
      </Grid>
      {image && (
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 1, m: 1 }}>
            <Image alt="Billede for indhold" layout="fill" src={image} />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

export default Content;
