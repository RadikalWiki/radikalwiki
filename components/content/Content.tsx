import { Grid, Box, Paper, Collapse } from "@mui/material";
import { Slate, Image } from "comps";
import { Node } from "hooks";
import { nhost } from "nhost";
import { useEffect, useState } from "react";

function Content({ node, fontSize }: { node: Node; fontSize: string }) {
  const query = node.useQuery();
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState<string>();
  const data = query?.data();

  useEffect(() => {
    const fetch = async () => {
      if (data?.image) {
        const { presignedUrl } = await nhost.storage.getPresignedUrl({ fileId: data?.image });
        setImage(presignedUrl?.url ?? null);
      } else {
        setImage(null);
      }
    };
    fetch()
    setContent(structuredClone(data?.content))
  }, [query, data]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm>
        <Box sx={{ fontSize, overflowX: "auto" }}>
          <Collapse in={!!content} >
            <Slate value={content} readOnly />
          </Collapse>
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
