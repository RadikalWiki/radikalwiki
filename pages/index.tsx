import { Level1 } from 'comps';
import { useQuery } from 'gql';

const Index = () => {
  const id = "4bac0048-0a2b-4409-84e4-0040caf7909c";
  const path = ["radikal_ungdom", "hb1", "test"];
  const ctxPath = ["radikal_ungdom", "hb1"];
  const query = useQuery().node({ id });
  query?.id

  return (
    query?.contextId ? (
      <Level1
        id={query.contextId}
        path={ctxPath}
        fullpath={path}
        index={0}
      />
    ) : null
  );
};

export default Index;
