import { Level1 } from 'comps';
import { Suspense } from 'react';

const Index = () => {
  return (
    <Suspense fallback={null}>
      <Level1 />
    </Suspense>
  );
};

export default Index;
