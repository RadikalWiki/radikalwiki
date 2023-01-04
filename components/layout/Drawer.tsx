import {
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  useMediaQuery,
  alpha,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import {
  ChevronLeft,
  Close,
  ConnectedTv,
  ExpandLess,
  ExpandMore,
  FileOpen,
  Home,
} from "@mui/icons-material";
import { useSession, usePath, useNode } from "hooks";
import { fromId } from "core/path";
import { Link as NextLink, MimeAvatar, MimeIcon, HomeList } from "comps";
import {
  order_by,
  resolved,
  nodes,
} from "gql";
import { useState, startTransition, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import { drawerWidth } from "core/constants";
import { Box } from "@mui/system";
import { useUserId } from "@nhost/react";

const DrawerElement = ({
  query,
  path,
  fullpath,
  open,
  setOpen,
  setDrawerOpen,
  index,
  childIndex,
  iconIndex,
}: {
  query: nodes;
  path: string[];
  fullpath: string[];
  open: boolean[][];
  setOpen: Function;
  setDrawerOpen: Function;
  index: number;
  childIndex: number;
  iconIndex?: number;
}) => {
  const router = useRouter();
  const slicedPath = fullpath.slice(0, path.length);
  const userId = useUserId();

  const selected =
    path.length === slicedPath.length &&
    path.every((v, i) => v === slicedPath[i]);

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
          color: selected ? "primary.main" : "",
        }}
        selected={selected}
        onClick={() => {
          startTransition(() => {
            setDrawerOpen(false);
            router.push(`${path.join("/")}`);
          });
        }}
      >
        <ListItemIcon sx={{ color: selected ? "primary.main" : "secondary.main" }}>
          {/* <Icon id={child?.id} index={iconIndex} /> */}
          <MimeIcon mimeId={query.data({ path: "type" }) ?? query.mimeId} index={iconIndex} />
        </ListItemIcon>
        <ListItemText>
          <Typography>{query?.name}</Typography>
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
      <Collapse
        mountOnEnter
        in={(open[index]?.[childIndex] ?? false) || selected}
      >
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          {childrenCount > 0 && (
            <DrawerList
              key={query.id ?? 0}
              id={query.id}
              path={path}
              fullpath={fullpath}
              open={open}
              setOpen={setOpen}
              index={index}
              childIndex={childIndex}
              setDrawerOpen={setDrawerOpen}
              siblings={length}
            />
          )}
        </Suspense>
      </Collapse>
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
  siblings,
}: {
  id: string;
  path: string[];
  fullpath: string[];
  open: boolean[][];
  setOpen: Function;
  setDrawerOpen: Function;
  index: number;
  childIndex: number;
  siblings: number;
}) => {
  const node = useNode({ id });
  const query = node.useQuery();
  const slicedPath = fullpath.slice(0, path.length);
  const userId = useUserId();

  const children = query?.children({
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

  const number = children.filter((child) => child.mime?.icon == "number");
  const letter = children.filter((child) => child.mime?.icon == "letter");
  const findIndex = (id: string) => {
    const numberIndex = number.findIndex(elem => elem.id === id)
    if (numberIndex !== -1)
      return numberIndex;
    const letterIndex = letter.findIndex(elem => elem.id === id)
    if (letterIndex !== -1)
      return letterIndex
    return undefined;
  }

  return (
    <>
      {children?.map((child, childIndex) => (
        <DrawerElement
          key={child.id ?? 0}
          query={child}
          path={path.concat([child?.namespace!])}
          fullpath={fullpath}
          open={open}
          setOpen={setOpen}
          index={index + 1}
          childIndex={childIndex}
          iconIndex={findIndex(child.id)}
          setDrawerOpen={setDrawerOpen}
        />
      ))}
    </>
  );
};

export default function Drawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const router = useRouter();
  const [session, setSession] = useSession();
  const largeScreen = useMediaQuery("(min-width:1200px)");
  const path = usePath();
  const home = path.length === 0;
  const node = useNode({
    id: home ? undefined : session?.prefix?.id
  });
  const query = node.useQuery();
  //const context = node.useContext();

  const [listOpen, setListOpen] = useState<boolean[][]>([]);

  const contextId = session?.prefix?.id ?? node?.contextId;

  const handleCurrent = async () => {
    const id = await resolved(
      () => {
        return query?.context?.relations({
          where: { name: { _eq: "active" } },
        })?.[0]?.nodeId;
      },
      { noCache: true }
    );
    const path = await fromId(id ?? contextId);
    await router.push(`/${path.join("/")}`);
    setOpen(false);
  };

  useEffect(() => {
    if (session?.prefix === undefined && !home) {
      Promise.all([
        fromId(contextId),
        resolved(() => {
          const node = query?.context;
          return {
            id: node?.id,
            name: node?.name ?? "",
            mime: node?.mimeId!,
            namespace: node?.namespace,
          };
        }),
      ]).then(([path, prefix]) => {
        setSession({
          prefix: {
            ...prefix,
            path,
          },
        });
      });
    }
  }, [session, setSession]);

  const list = home ? (
    <HomeList setOpen={setOpen} />
  ) : (
    <List sx={{ pt: 0, pb: 0, width: "100%" }}>
      <ListItemButton
        component={NextLink}
        href={`/${session?.prefix?.path?.join("/")}?app=screen`}
        target="_blank"
      >
        <ListItemIcon sx={{ color: "secondary.main" }}>
          <ConnectedTv />
        </ListItemIcon>
        <ListItemText primary="Skærm" />
      </ListItemButton>
      <ListItemButton onClick={handleCurrent}>
        <ListItemIcon sx={{ color: "secondary.main" }}>
          <FileOpen />
        </ListItemIcon>
        <ListItemText primary="Aktuelle Punkt" />
      </ListItemButton>
      <Divider />
      <Suspense fallback={<CircularProgress />}>
        <DrawerList
          id={node.id}
          path={session?.prefix?.path ?? []}
          fullpath={path}
          open={listOpen}
          setOpen={setListOpen}
          setDrawerOpen={setOpen}
          index={0}
          childIndex={0}
          siblings={0}
        />
      </Suspense>
    </List>
  );

  return (
    <MuiDrawer
      sx={
        largeScreen
          ? {
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                height: `calc(100% - 64px)`,
                boxSizing: "border-box",
              },
            }
          : {
              position: "absolute",
              width: "100%",
              "& .MuiDrawer-paper": {
                width: "100%",
              },
            }
      }
      variant={largeScreen ? "permanent" : "persistent"}
      open={open || largeScreen}
      onMouseLeave={() => setOpen(false)}
    >
      <Box
        sx={{
          // Disable scroll (Firefox)
          scrollbarWidth: "none",
          // Disable scroll (Webkit)
          "::-webkit-scrollbar": {
            display: "none",
          },
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          height: "calc(100vh - 64px)",
        }}
      >
        <Toolbar
          onClick={() => {
            if (!home) {
              router.push(`/${(session?.prefix?.path ?? path).join("/")}`);
              setOpen(false);
            }
          }}
          sx={{
            cursor: "pointer",
            ml: largeScreen ? -2 : 0,
            bgcolor: "primary.main",
            "&:hover, &:focus": {
              bgcolor: (t) => alpha(t.palette.primary.main, 0.9),
            },
          }}
        >
          {home ? (
            <IconButton
              sx={{ color: "#fff" }}
              onClick={(e) => {
                e.stopPropagation();
                startTransition(() => {
                  router.back();
                });
              }}
            >
              <ChevronLeft />
            </IconButton>
          ) : path.length > 0 ? (
            <IconButton
              sx={{ color: "#fff" }}
              onClick={(e) => {
                e.stopPropagation();
                startTransition(() => {
                  router.push("/");
                });
              }}
            >
              <Home />
            </IconButton>
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
          <MimeAvatar mimeId={query?.mimeId} />
          <Typography sx={{ pl: 1 }} color="#fff" variant="h6">
            {node?.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {!largeScreen && (
            <IconButton
              sx={{ color: "#fff" }}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              <Close />
            </IconButton>
          )}
        </Toolbar>
        {list}
      </Box>
    </MuiDrawer>
  );
}
