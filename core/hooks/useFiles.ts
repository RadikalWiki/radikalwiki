import { nhost } from 'nhost';
import { startTransition, useEffect, useState } from 'react';

const useFiles = ({
  fileIds,
  quality,
  width = 500,
  height,
}: {
  fileIds?: string[];
  quality?: number;
  width?: number;
  height?: number;
}) => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (fileIds) {
        const preUrls = await Promise.all(
          fileIds.map((fileId) =>
            fileId
              ? nhost.storage.getPresignedUrl({
                  fileId,
                  quality,
                  width,
                  height,
                })
              : Promise.resolve(null)
          )
        );
        setFiles(preUrls.map((preUrl) => preUrl?.presignedUrl?.url ?? ''));
      }
    };
    startTransition(() => {
      fetch();
    });
  }, [JSON.stringify(fileIds)]);

  return files;
};

export default useFiles;
