import { Level4 } from 'comps';
import { useQuery } from 'gql';

const Level3 = ({ id }: { id: string }) => {
  const query = useQuery().node({ id });
  query?.mutable;
  return <Level4 id={id} />;
};

export default Level3;
