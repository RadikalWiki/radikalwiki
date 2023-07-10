import { Level3 } from 'comps';
import { useQuery } from 'gql';

const Level2 = ({ id }: { id: string }) => {
  const node = useQuery().node({ id });
  node?.mimeId

  return <Level3 id={id} />;
};

export default Level2;
