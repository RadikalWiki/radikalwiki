import React from 'react';
import { useId } from 'core/path';
import { Level1 } from 'comps';

const Path = () => {
  const id = useId();

  return <>
    {id && 
      <Level1 id={id} />
    }
  </>;
};

export default Path;
