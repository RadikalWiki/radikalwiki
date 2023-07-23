import { Loader } from 'comps';
import { useId } from 'core/path';


const PathLoader = ({
  keys,
  parentId,
  fullpath,
}: {
  keys: string[];
  parentId?: string;
  fullpath: string[];
}) => {
  const id = useId();

  return <Loader id={id} />
};

export default PathLoader;
