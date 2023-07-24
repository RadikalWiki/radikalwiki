import { fromId, useContextId } from 'core/path';
import { useEffect, useState } from 'react';

const useContextPath = () => {
  const [path, setPath] = useState<string[]>([]);
  const ctxId = useContextId()

  useEffect(() => {
    if (ctxId) fromId(ctxId).then(setPath);
  }, [ctxId]);

  return path;
};

export default useContextPath;
