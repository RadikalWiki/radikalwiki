import { Grid, Box, Paper, Collapse } from '@mui/material';
import { Slate, Image } from 'comps';
import { Node } from 'hooks';
import { nhost } from 'nhost';
import { startTransition, useEffect, useState } from 'react';

const Content = ({ node, fontSize }: { node: Node; fontSize: string }) => {
  const query = node.useQuery();
  const data = query?.data();
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState<string>(
    structuredClone(data?.content)
  );

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
    startTransition(() => {
      fetch();
      setContent(structuredClone(data?.content));
    });
  }, [JSON.stringify(data?.content), data?.image]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm>
        <Box sx={{ fontSize, overflowX: 'auto' }}>
          <Collapse in={!!content}>
            <Slate value={content} readOnly />
          </Collapse>
        </Box>
      </Grid>
      {image && (
        <Grid item xs={12} sm={4}>
          <Image alt="Billede for indhold" layout="fill" src={image} />
        </Grid>
      )}
    </Grid>
  );
};

export default Content;
