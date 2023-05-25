import {
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  useMediaQuery,
  Toolbar,
  AppBar,
  Skeleton,
  Stack,
  Avatar,
} from '@mui/material';
import {
  Close,
  ConnectedTv,
  ExpandLess,
  ExpandMore,
  FileOpen,
} from '@mui/icons-material';
import { useSession, usePath, useNode, useLink } from 'hooks';
import { fromId } from 'core/path';
import { Link as NextLink, MimeAvatar, MimeIcon, HomeList, Bar } from 'comps';
import { order_by, resolved } from 'gql';
import {
  useState,
  startTransition,
  useEffect,
  Suspense,
  useDeferredValue,
} from 'react';
import { drawerWidth } from 'core/constants';
import { Box } from '@mui/system';
import { useUserId } from '@nhost/nextjs';

const DrawerElement = ({
  id,
  path,
  fullpath,
  open,
  setOpen,
  setDrawerOpen,
  index,
  childIndex,
  iconIndex,
}: {
  id: string;
  path: string[];
  fullpath: string[];
  open: boolean[][];
  setOpen: Function;
  setDrawerOpen: Function;
  index: number;
  childIndex: number;
  iconIndex?: number;
}) => {
  const node = useNode({ id });
  const query = node.useQuery();
  const link = useLink();
  const slicedPath = fullpath.slice(0, path.length);
  const userId = useUserId();

  const selected =
    path.length === slicedPath.length &&
    path.every((v, i) => v === slicedPath[i]);

  const expanded = (open[index]?.[childIndex] ?? false) || selected;

  const childrenCount =
    query
      ?.children_aggregate({
        order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
        where: {
          _and: [
            {
              _or: [
                { mutable: { _eq: false } },
                { ownerId: { _eq: userId } },
                { members: { nodeId: { _eq: userId } } },
              ],
            },
            {
              mime: {
                hidden: { _eq: false },
              },
            },
          ],
        },
      })
      ?.aggregate?.count() ?? 0;

  return (
    <>
      <ListItemButton
        sx={{
          pl: 1 + index,
        }}
        selected={selected}
        onClick={() => {
          startTransition(() => {
            setDrawerOpen(false);
            link.path(path);
          });
        }}
      >
        <ListItemIcon>
          <MimeIcon
            mimeId={query?.data({ path: 'type' }) ?? query?.mimeId}
            index={iconIndex}
            name={query?.name}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ hyphens: 'auto' }}>{query?.name}</Typography>
        </ListItemText>
        {childrenCount > 0 && (
          <ListItemSecondaryAction>
            <IconButton
              disabled={selected}
              onClick={(e) => {
                e.stopPropagation();
                startTransition(() => {
                  const newChildOpen = [
                    ...new Array(childIndex).fill(false),
                    !open[index]?.[childIndex] ?? false,
                  ];

                  const newOpen =
                    open.length > 0
                      ? [
                          ...open.slice(0, index),
                          newChildOpen,
                          ...open.slice(index + 1),
                        ]
                      : [...new Array(index).fill([]), newChildOpen];

                  setOpen(newOpen);
                });
              }}
              edge="end"
            >
              {open[index]?.[childIndex] || selected ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItemButton>

      {expanded && (
        <Suspense
          fallback={[...Array(childrenCount).keys()].map((key) => (
            <ListItemButton
              key={key}
              sx={{
                pl: index + 2,
              }}
            >
              <ListItemIcon>
                <Skeleton variant="circular" width={24} height={24} />
              </ListItemIcon>
            </ListItemButton>
          ))}
        >
          {childrenCount > 0 && query?.id && (
            <DrawerList
              key={query?.id ?? 0}
              id={query?.id}
              path={path}
              fullpath={fullpath}
              open={open}
              setOpen={setOpen}
              index={index}
              childIndex={childIndex}
              setDrawerOpen={setDrawerOpen}
            />
          )}
        </Suspense>
      )}
    </>
  );
};

const DrawerList = ({
  id,
  path,
  fullpath,
  open,
  setOpen,
  setDrawerOpen,
  index,
  childIndex,
}: {
  id: string;
  path: string[];
  fullpath: string[];
  open: boolean[][];
  setOpen: Function;
  setDrawerOpen: Function;
  index: number;
  childIndex: number;
}) => {
  const node = useNode({ id });
  const query = node.useQuery();
  const userId = useUserId();

  const children =
    query?.children({
      order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      where: {
        _and: [
          {
            _or: [
              { mutable: { _eq: false } },
              { ownerId: { _eq: userId } },
              { members: { nodeId: { _eq: userId } } },
            ],
          },
          {
            mime: {
              hidden: { _eq: false },
            },
          },
        ],
      },
    }) ?? [];

  const number = children.filter((child) => child.mime?.icon == 'number');
  const letter = children.filter((child) => child.mime?.icon == 'letter');
  const findIndex = (id?: string) => {
    const numberIndex = number.findIndex((elem) => elem.id === id);
    if (numberIndex !== -1) return numberIndex;
    const letterIndex = letter.findIndex((elem) => elem.id === id);
    if (letterIndex !== -1) return letterIndex;
    return undefined;
  };

  return (
    <>
      {children?.map(
        ({ id, key }, childIndex) =>
          id && (
            <DrawerElement
              key={id ?? 0}
              id={id}
              path={path.concat([key!])}
              fullpath={fullpath}
              open={open}
              setOpen={setOpen}
              index={index + 1}
              childIndex={childIndex}
              iconIndex={findIndex(id)}
              setDrawerOpen={setDrawerOpen}
            />
          )
      )}
    </>
  );
};

const MenuList = ({ setOpen }: { setOpen: Function }) => {
  const link = useLink();
  const [listOpenValue, setListOpen] = useState<boolean[][]>([]);
  const listOpen = useDeferredValue(listOpenValue);
  const [session, setSession] = useSession();
  const path = usePath();
  const node = useNode({
    id: session?.prefix?.id,
  });
  const query = node.useQuery();

  const contextId = session?.prefix?.id ?? node?.contextId;

  useEffect(() => {
    if (session?.prefix === undefined) {
      Promise.all([
        fromId(contextId),
        resolved(() => {
          const node = query?.context;
          return {
            id: node?.id,
            name: node?.name ?? '',
            mime: node?.mimeId!,
            key: node?.key,
          };
        }),
      ]).then(([path, prefix]) => {
        startTransition(() => {
          setSession({
            prefix: {
              ...prefix,
              path,
            },
          });
        });
      });
    }
  }, [session, setSession]);

  const handleCurrent = async () => {
    const id = await resolved(
      () =>
        query?.context?.relations({
          where: { name: { _eq: 'active' } },
        })?.[0]?.nodeId,
      { noCache: true }
    );
    startTransition(() => {
      link.id(id ?? contextId!);
      setOpen(false);
    });
  };

  return (
    <List
      sx={{
        pt: 0,
        pb: 0,
        width: '100%',
      }}
    >
      <ListItemButton
        component={NextLink}
        href={`/${session?.prefix?.path?.join('/')}?app=screen`}
        target="_blank"
      >
        <ListItemIcon>
          <ConnectedTv />
        </ListItemIcon>
        <ListItemText primary="Skærm" />
      </ListItemButton>
      <ListItemButton onClick={handleCurrent}>
        <ListItemIcon>
          <FileOpen />
        </ListItemIcon>
        <ListItemText primary="Aktuelle Punkt" />
      </ListItemButton>
      {node.id && (
        <DrawerList
          id={node.id}
          path={session?.prefix?.path ?? []}
          fullpath={path}
          open={listOpen}
          setOpen={setListOpen}
          setDrawerOpen={setOpen}
          index={0}
          childIndex={0}
        />
      )}
    </List>
  );
};

const Title = () => {
  const [session] = useSession();
  const node = useNode({
    id: session?.prefix?.id,
  });
  const query = node.useQuery();

  return (
    <>
      <IconButton>
        <MimeAvatar name={query?.name} mimeId={query?.mimeId} />
      </IconButton>
      <Typography sx={{ m: 2, color: 'common.white' }}>{node?.name}</Typography>
    </>
  );
};

const Drawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const link = useLink();
  const largeScreen = useMediaQuery('(min-width:1200px)');
  const path = usePath();
  const [session] = useSession();
  const home = path.length === 0;

  const list = home ? (
    <Suspense>
      <HomeList setOpen={setOpen} />
    </Suspense>
  ) : (
    <MenuList setOpen={setOpen} />
  );

  return (
    <MuiDrawer
      sx={
        largeScreen
          ? {
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                ml: '40px',
                width: drawerWidth,
                boxSizing: 'border-box',
                borderRadius: '0px 20px 20px 0px',
              },
            }
          : {
              position: 'absolute',
              width: '100%',
              '& .MuiDrawer-paper': {
                width: '100%',
              },
            }
      }
      variant={largeScreen ? 'permanent' : 'persistent'}
      open={open || largeScreen}
      onMouseLeave={() => setOpen(false)}
    >
      <Box
        sx={{
          // Disable scroll (Firefox)
          scrollbarWidth: 'none',
          // Disable scroll (Webkit)
          '::-webkit-scrollbar': {
            display: 'none',
          },
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          pb: 8,
        }}
      >
        {list}
      </Box>
      <AppBar
        elevation={0}
        sx={{
          top: 'auto',
          bottom: 0,
          background: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          onClick={() => {
            if (!home) {
              link.path(session?.prefix?.path ?? path);
              setOpen(false);
            }
          }}
          sx={{
            pr: 1,
            pl: 1,
            cursor: 'pointer',
            borderRadius: '20px',
            width: largeScreen ? `${drawerWidth}px` : '100%',

            bottom: 0,
            position: 'absolute',
            ml: largeScreen ? 5 : 0,
          }}
          disableGutters
        >
          <Bar>
            <Stack direction="row">
              {home ? (
                <>
                  <IconButton>
                    <MimeAvatar mimeId="app/home" />
                  </IconButton>
                  <Typography sx={{ m: 2, color: 'common.white' }}>
                    Hjem
                  </Typography>
                </>
              ) : (
                <Suspense>
                  <Title />
                </Suspense>
              )}
              <Box sx={{ flexGrow: 1 }} />
              {!largeScreen && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    startTransition(() => {
                      setOpen(false);
                    });
                  }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <Close />
                  </Avatar>
                </IconButton>
              )}
            </Stack>
          </Bar>
        </Toolbar>
      </AppBar>
    </MuiDrawer>
  );
};

export default Drawer;
