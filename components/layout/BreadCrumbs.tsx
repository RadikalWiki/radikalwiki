import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Stack,
  Skeleton,
  Typography,
  Collapse,
} from '@mui/material';
import { alpha, Box } from '@mui/system';
import { useQuery } from 'gql';
import { useSession, usePath } from 'hooks';
import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link as NextLink,
  MimeAvatar,
  MimeAvatarId,
  MimeIcon,
  MimeIconId,
} from 'comps';
import { getName } from 'mime';
import { useRouter } from 'next/router';
//import { toWhere } from "core/path";

const BreadcrumbsLink = ({
  parentId,
  fullpath,
  namespaces,
  open,
  setOpen,
  index,
  start,
}: {
  parentId?: string;
  fullpath: string[];
  namespaces: string[];
  open: boolean[];
  setOpen: Function;
  index: number;
  start: number;
}) => {
  const divRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const query = useQuery();
  const where = {
    _and: parentId
      ? [
          { namespace: { _eq: namespaces.at(-1) } },
          { parentId: { _eq: parentId } },
        ]
      : [{ parentId: { _is_null: true } }],
  };
  const node = query.nodes({ where }).at(0);

  useEffect(() => {
    if (namespaces.length === fullpath.length) {
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleClick = () => {
    if (open[index]) router.push(`/${namespaces.slice(0, index).join('/')}`);
    else setOpen([...new Array(index).fill(false), true]);
  };

  return (
    <>
      {index >= start && (
        <Box
          key={node?.id ?? 0}
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: -1,
            cursor: 'pointer',
          }}
          //color="secondary"
          onClick={handleClick}
          onMouseEnter={() => {
            const newOpen = [
              ...open.slice(0, index),
              true,
              ...new Array(
                namespaces.length - index ? namespaces.length - index : 0
              ).fill(false),
            ];
            setOpen(newOpen);
          }}
        >
          <>
            {node?.id ? (
              <MimeAvatarId id={node.id} />
            ) : (
              <MimeAvatar mimeId="unknown" />
            )}
            <Collapse orientation="horizontal" in={open[index]}>
              <Typography
                ref={divRef}
                color="#fff"
                sx={{
                  overflowY: 'hidden',
                  ml: 0.5,
                  mr: 2,
                  maxHeight: 48,
                  maxWidth: 300,
                  hyphens: 'auto',
                }}
              >
                {node?.name ?? 'Ukendt'}
              </Typography>
            </Collapse>
          </>
        </Box>
      )}
      {namespaces.length === fullpath.length &&
        router.query.app !== undefined && (
          <Box
            key={`${node?.id}${router.query.app}`}
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1,
              cursor: 'pointer',
            }}
            color="secondary"
            onClick={handleClick}
            onMouseEnter={() => {
              const newOpen = [
                ...open.slice(0, index + 1),
                true,
                ...new Array(
                  namespaces.length - index + 1
                    ? namespaces.length - index + 1
                    : 0
                ).fill(false),
              ];
              setOpen(newOpen);
            }}
          >
            <>
              <MimeAvatar mimeId={`app/${router.query.app}`} />
              <Collapse orientation="horizontal" in={open[index + 1]}>
                <Typography
                  ref={divRef}
                  color="#fff"
                  sx={{
                    overflowY: 'hidden',
                    ml: 0.5,
                    maxHeight: 48,
                    maxWidth: 300,
                    hyphens: 'auto',
                  }}
                >
                  {getName(`app/${router.query.app}`) ?? 'Ukendt'}
                </Typography>
              </Collapse>
            </>
          </Box>
        )}
      {namespaces.length !== fullpath.length && node?.id && (
        <BreadcrumbsLink
          key={index + 1}
          parentId={node.id}
          fullpath={fullpath}
          namespaces={[...namespaces, fullpath[namespaces.length]]}
          open={open}
          setOpen={setOpen}
          index={index + 1}
          start={start}
        />
      )}
    </>
  );
};

const Breadcrumbs = () => {
  const [session] = useSession();
  const router = useRouter();
  const path = usePath();
  const [open, setOpen] = useState<boolean[]>([]);

  const initOpen = [
    ...new Array(path.length + (router.query.app === undefined ? 0 : 1)).fill(
      false
    ),
    true,
  ];

  useEffect(() => {
    if (path.length > 0) setOpen(initOpen);
  }, [path]);

  const prefix = session?.prefix?.path ?? [];

  const sliced = path.slice(0, prefix.length);
  const start =
    prefix.length !== 0 &&
    sliced.length === prefix.length &&
    sliced.every((v, i) => v === prefix[i])
      ? prefix.length
      : 1;

  return (
    <Box
      onMouseLeave={() => {
        setOpen(initOpen);
      }}
      sx={{
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        overflowX: 'scroll',
        pl: 2,
        // Disable scroll (Firefox)
        scrollbarWidth: 'none',
        // Disable scroll (Webkit)
        '::-webkit-scrollbar': {
          display: 'none',
        },
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <BreadcrumbsLink
        namespaces={[]}
        fullpath={path}
        open={open}
        setOpen={setOpen}
        index={0}
        start={start}
      />
    </Box>
  );
}

export default Breadcrumbs;