import { Node } from 'hooks';

const Level4 = ({ node }: { node: Node }) => {
  const query = node.useQuery();
  query?.id;

  return null;
};

export default Level4;
