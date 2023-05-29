import { nhost } from 'nhost';
import { startTransition, useEffect, useState } from 'react';

const useFile = ({
  fileId,
  quality,
  width = 500,
  height,
}: {
  fileId?: string;
  quality?: number;
  width?: number;
  height?: number;
}) => {
  const [file, setFile] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetch = async () => {
      if (fileId) {
        const { presignedUrl } = await nhost.storage.getPresignedUrl({
          fileId,
          quality,
          width,
          height,
        });
        setFile(presignedUrl?.url);
      }
    };
    startTransition(() => {
      fetch();
    });
  }, [fileId]);

  return file;
};

export default useFile;
