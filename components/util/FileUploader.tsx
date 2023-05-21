import { UploadFile } from '@mui/icons-material';
import { Button, CircularProgress, Input } from '@mui/material';
import { Box } from '@mui/system';
import { nhost } from 'nhost';
import { useState } from 'react';

const FileUploader = ({
  text,
  onNewFile,
}: {
  text: string;
  onNewFile: Function;
}) => {
  const [loading, setLoading] = useState(false);
  const handleChangeFile = async (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
    const res = await nhost.storage.upload({ file });
    onNewFile({ fileId: res.fileMetadata?.id, file });
    setLoading(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Input
        id="input-file"
        type="file"
        onChange={handleChangeFile}
        sx={{ display: 'none' }}
      />
      <label htmlFor="input-file">
        <Button
          color="secondary"
          component="span"
          variant="outlined"
          startIcon={<UploadFile />}
          disabled={loading}
        >
          {text}
        </Button>
      </label>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
};

export default FileUploader;
