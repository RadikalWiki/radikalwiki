import { Typography, Collapse, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from 'gql';
import { useSession, usePath, useContextPath } from 'hooks';
import { Suspense, startTransition, useEffect, useRef, useState } from 'react';
import { MimeAvatar, MimeAvatarId } from 'comps';
import { getName } from 'mime';
import { useRouter } from 'next/router';

const BreadcrumbsLink = ({
  parentId,
  fullpath,
  keys,
  open,
  setOpen,
  index,
  start,
}: {
  parentId?: string;
  fullpath: string[];
  keys: string[];
  open: boolean[];
  setOpen: Function;
  index: number;
  start: number;
}) => {
  const divRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const query = useQuery({ __experimentalGreedyFetch: true });
  const where = {
    _and:
      fullpath?.[0]?.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      ) && index == 1
        ? [{ id: { _eq: fullpath[0] } }]
        : parentId
        ? [{ key: { _eq: keys.at(-1) } }, { parentId: { _eq: parentId } }]
        : [{ parentId: { _is_null: true } }],
  };
  const node = query.nodes({ where }).at(0);

  useEffect(() => {
    if (keys.length === fullpath.length) {
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleClick = () => {
    if (open[index]) {
      if (keys.length === fullpath.length && !router.query.app) {
        const scroll = document.querySelector('#scroll');
        scroll?.scrollTo({ behavior: 'smooth', top: 0 });
      } else {
        router.push(`/${keys.slice(0, index).join('/')}`);
      }
    } else setOpen([...new Array(index).fill(false), true]);
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
              ...new Array(keys.length - index ? keys.length - index : 0).fill(
                false
              ),
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
                sx={{
                  overflowY: 'hidden',
                  ml: 0.5,
                  mr: 2,
                  maxHeight: 48,
                  maxWidth: 300,
                  hyphens: 'auto',
                  color: 'common.white',
                }}
              >
                {node?.name ?? 'Ukendt'}
              </Typography>
            </Collapse>
          </>
        </Box>
      )}
      {fullpath.length == 0 && (
        <Box
          key={node?.id ?? 0}
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: -1,
            cursor: 'pointer',
          }}
        >
          <>
            <MimeAvatar mimeId="app/home" />
            <Collapse orientation="horizontal" in={true}>
              <Typography
                ref={divRef}
                sx={{
                  overflowY: 'hidden',
                  ml: 0.5,
                  mr: 2,
                  maxHeight: 48,
                  maxWidth: 300,
                  hyphens: 'auto',
                  color: 'common.white',
                }}
              >
                Hjem
              </Typography>
            </Collapse>
          </>
        </Box>
      )}
      {keys.length === fullpath.length && router.query.app !== undefined && (
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
                keys.length - index + 1 ? keys.length - index + 1 : 0
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
                sx={{
                  overflowY: 'hidden',
                  ml: 0.5,
                  maxHeight: 48,
                  maxWidth: 300,
                  hyphens: 'auto',
                  color: 'common.white',
                }}
              >
                {getName(`app/${router.query.app}`) ?? 'Ukendt'}
              </Typography>
            </Collapse>
          </>
        </Box>
      )}
      {keys.length !== fullpath.length && node?.id && (
        <BreadcrumbsLink
          key={index + 1}
          parentId={node.id}
          fullpath={fullpath}
          keys={[...keys, fullpath[keys.length]]}
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
  const largeScreen = useMediaQuery('(min-width:1200px)');
  const ctxPath = useContextPath();

  const initOpen = [
    ...new Array(path.length + (router.query.app === undefined ? 0 : 1)).fill(
      false
    ),
    true,
  ];

  useEffect(() => {
    startTransition(() => {
      if (path.length > 0) setOpen(initOpen);
    });
  }, [path]);

  const sliced = path.slice(0, ctxPath.length);
  const start =
    ctxPath.length !== 0 &&
    sliced.length === ctxPath.length &&
    sliced.every((v, i) => v === ctxPath[i])
      ? ctxPath.length
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
        pl: largeScreen ? 2 : 1,
        // Disable scroll (Firefox)
        scrollbarWidth: 'none',
        // Disable scroll (Webkit)
        '::-webkit-scrollbar': {
          display: 'none',
        },
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <Suspense fallback={null}>
        <BreadcrumbsLink
          keys={[]}
          fullpath={path}
          open={open}
          setOpen={setOpen}
          index={0}
          start={start}
        />
      </Suspense>
    </Box>
  );
};

export default Breadcrumbs;
