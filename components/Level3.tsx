import { Level4 } from 'comps';
import { Node } from 'hooks';

const Level3 = ({ node }: { node: Node }) => {
  const query = node.useQuery();
  query?.mutable || query?.name;
  return <Level4 node={node} />;
};

export default Level3;
