import { usePath } from 'hooks';
import { order_by, useQuery } from 'gql';
import { useState, useDeferredValue } from 'react';

const DrawerElement = ({
  id,
  path,
  fullpath,
  open,
  setOpen,
  index,
}: {
  id: string;
  path: string[];
  fullpath: string[];
  open: boolean[][];
  setOpen: Function;
  index: number;
}) => {
  useQuery().node({ id })?.id;
  const slicedPath = fullpath.slice(0, path.length);

  const selected =
    path.length === slicedPath.length &&
    path.every((v, i) => v === slicedPath[i]);

  return (
    selected ? (
        <DrawerList
          key={id}
          id={id}
          path={path}
          fullpath={fullpath}
          open={open}
          setOpen={setOpen}
          index={index}
        />
      ) : null
  );
};

const DrawerList = ({
  id,
  path,
  fullpath,
  open,
  setOpen,
  index,
}: {
  id: string;
  path: string[];
  fullpath: string[];
  open: boolean[][];
  setOpen: Function;
  index: number;
}) => {
  const query = useQuery().node({ id });

  const children = query?.children({
    order_by: [{ index: order_by.asc }],
  });

  return (
    <>
      {children?.map(
        ({ id, key }) =>
          id && (
            <DrawerElement
              key={id ?? 0}
              id={id}
              path={path.concat([key!])}
              fullpath={fullpath}
              open={open}
              setOpen={setOpen}
              index={index + 1}
            />
          )
      )}
    </>
  );
};

const Level1 = ({ id }: { id: string; }) => {
  const [listOpenValue, setListOpen] = useState<boolean[][]>([]);
  const listOpen = useDeferredValue(listOpenValue);
  const path = usePath();
  const query = useQuery().node({ id });
  query?.id


  const ctxPath = ["radikal_ungdom", "hb1"];
  
  return (
    query?.contextId ? (
      <DrawerList
        id={query.contextId}
        path={ctxPath}
        fullpath={path}
        open={listOpen}
        setOpen={setListOpen}
        index={0}
      />
    ) : null
  );
};

export default Level1;