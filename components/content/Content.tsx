import { Grid, Box, Paper } from "@mui/material";
import { Slate, Image } from "comps";
import { resolved } from "gql";
import { useNode } from "hooks";
import nhost from "nhost";
import { useEffect, useState } from "react";

function Content({ id, fontSize }: { id: string; fontSize: string }) {
  const { query } = useNode({ id });
  const [content, setContent] = useState<any>();
  const [image, setImage] = useState<any>();

  useEffect(() => {
    if (query) {
      const fetch = async () => {
        const data = await resolved(() => {
          return query.data();
        }, { noCache: true });
        setContent(data?.content);
        const { presignedUrl } = await nhost.storage.getPresignedUrl({ fileId: data?.image });
        setImage(presignedUrl?.url);
      };
      fetch()
    }
  }, [query]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Box sx={{ fontSize, overflowX: "auto" }}>
          <Slate value={content} readOnly />
        </Box>
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
