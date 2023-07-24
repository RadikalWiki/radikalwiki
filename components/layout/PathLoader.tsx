import { Loader } from 'comps';
import { useId } from 'core/path';

const PathLoader = () => {
  const id = useId();

  return <Loader id={id} />;
};

export default PathLoader;
