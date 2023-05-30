import { Level2 } from 'comps';
import { useQuery } from 'gql';

const Level1 = () => {
  const query = useQuery();
  const node = query.nodes({ where: { parentId: { _is_null: true } } }).at(0);
  return node?.id ? <Level2 id={node.id} /> : null;
};

export default Level1;
