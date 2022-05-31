import { CardContent, Grid, Box } from "@mui/material";
import { useQuery } from "gql";

function Content({ id, fontSize }: { id: string; fontSize: string }) {
  const query = useQuery();
  const node = query.node({ id });
  //const image =
  //  node?.file?.path && node.file?.token
  //    ? `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/storage/o${node.file?.path}?token=${node.file?.token}`
  //    : null;

  const content = node?.data({ path: "content" });

  if (!content) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardContent>
          <Box
            dangerouslySetInnerHTML={{ __html: content }}
            sx={{ fontSize, overflowX: "auto" }}
          />
        </CardContent>
      </Grid>
      {/*image && (
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 1, m: 1 }}>
            <Image alt="Billede for indhold" layout="fill" src={image} />
          </Paper>
        </Grid>
      )*/}
    </Grid>
  );
}

export default Content;
