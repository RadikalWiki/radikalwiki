import { Grid, Box, Paper, Collapse } from "@mui/material";
import { Slate, Image } from "comps";
import { Node } from "hooks";
import { nhost } from "nhost";
import { useEffect, useState } from "react";

export default function Content({ node, fontSize }: { node: Node; fontSize: string }) {
  const query = node.useQuery();
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState<string>();
  const data = query?.data();

  useEffect(() => {
    const fetch = async () => {
      setImage(null);
      if (data?.image) {
        const { presignedUrl } = await nhost.storage.getPresignedUrl({
          fileId: data?.image,
        });
        setImage(presignedUrl?.url ?? null);
      }
    };
    fetch();
    setContent(structuredClone(data?.content));
  }, [data?.content, data?.image]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm>
        <Box sx={{ fontSize, overflowX: "auto" }}>
          <Collapse in={!!content}>
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