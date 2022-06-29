import { Grid, Box, Paper } from "@mui/material";
import { Slate, Image } from "comps";
import { useNode } from "hooks";

function Content({ id, fontSize }: { id: string; fontSize: string }) {
  const { query } = useNode({ id });
  const data = query?.data();

  if (!data) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Box sx={{ fontSize, overflowX: "auto" }}>
          <Slate initValue={data.content} readOnly />
        </Box>
      </Grid>
      {data.image && (
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 1, m: 1 }}>
            <Image alt="Billede for indhold" layout="fill" src={data.image} />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

export default Content;
