import { Level3 } from 'comps';
import { useNode } from 'hooks';

const Level2 = ({ id }: { id: string }) => {
  const node = useNode({ id });
  if (!node?.mimeId) return null;

  return <Level3 node={node} />;
};

export default Level2;
