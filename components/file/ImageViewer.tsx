import { Box } from '@mui/system';
import { Image } from 'comps';

export default function ImageViewer({ file }: { file: any }) {
  return (
    file && (
      <Box sx={{ p: 1, m: 1 }}>
        <Image src={file} alt="" layout="fill" />
      </Box>
    )
  );
}
