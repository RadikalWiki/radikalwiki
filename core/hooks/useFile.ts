import { nhost } from 'nhost';
import { startTransition, useEffect, useState } from 'react';

const useFile = ({
  fileId,
  quality,
  width = 500,
  height,
  image,
}: {
  fileId?: string;
  quality?: number;
  width?: number;
  height?: number;
  image?: boolean;
}) => {
  const [file, setFile] = useState<string | undefined>(undefined);

  useEffect(() => {
    setFile(undefined);
    const fetch = async () => {
      if (fileId) {
        const { presignedUrl } = await nhost.storage.getPresignedUrl({
          fileId,
          ...(image
            ? {
                quality,
                width,
                height,
              }
            : {}),
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
