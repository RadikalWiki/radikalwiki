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
  Avatar,
  ListItem,
  useMediaQuery,
  alpha,
  Toolbar,
  AppBar,
  ListItemAvatar,
  ListSubheader,
  Button,
} from "@mui/material";
import {
  Airplay,
  ChevronLeft,
  Close,
  ConnectedTv,
  Event,
  EventBusy,
  ExpandLess,
  ExpandMore,
  FileOpen,
  Home,
  Menu,
} from "@mui/icons-material";
import { useSession, usePath, useNode, Node } from "hooks";
import { fromId, toWhere } from "core/path";
import { Link as NextLink, MimeAvatar, MimeIcon } from "comps";
import {
  order_by,
  query,
  resolved,
  useQuery,
  nodes,
  useSubscription,
} from "gql";
import { useState, startTransition } from "react";
import { useRouter } from "next/router";
import { drawerWidth } from "core/constants";
import { Box } from "@mui/system";
import { useUserId } from "@nhost/react";

/*
const Icon = ({ id, index }: { id: string, index?: number }) => {
  const node = useNode({ id });
  return <MimeIcon node={node} index={index} />
}
*/

const DrawerElement = ({
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
  const router = useRouter();
  const slicedPath = fullpath.slice(0, path.length);

  const children = query?.children({
    order_by: [{ index: order_by.asc }],
    where: {
      mime: {
        hidden: { _eq: false },
      },
    },
  });

  //const letter = children?.filter((child) => child.mime?.icon == "letter");
  //const number = children?.filter((child) => child.mime?.icon == "number");

  const selected =
    path.length === slicedPath.length &&
    path.every((v, i) => v === slicedPath[i]);

  const length = children?.length ?? 0;

  return (
    <>
      {index !== 0 && (
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
          <ListItemIcon sx={{ color: selected ? "primary.main" : "" }}>
            {/* <Icon id={child?.id} index={iconIndex} /> */}
            <MimeIcon node={node} />
          </ListItemIcon>
          <ListItemText>
            <Typography>{node?.name}</Typography>
          </ListItemText>
          {length > 0 && (
            <ListItemSecondaryAction>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  startTransition(() => {
                    const newChildOpen = [
                      ...new Array(childIndex).fill(false),
                      !open[index]?.[childIndex] ?? false,
                      ...new Array(
                        siblings - childIndex ? siblings - childIndex : 0
                      ).fill(false),
                    ];

                    const newOpen = [
                      ...open.slice(0, index),
                      newChildOpen,
                      ...open.slice(index + 1),
                    ];

                    setOpen(newOpen);
                    if (siblings) setDrawerOpen(false);
                  });
                }}
                edge="end"
              >
                {open[index]?.[childIndex] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItemButton>
      )}

      <Collapse
        mountOnEnter
        in={index === 0 || ((open[index]?.[childIndex] ?? false) || selected)}
      >
        {children?.map((child, childIndex) => (
          <DrawerElement
            key={child.id ?? 0}
            id={child.id}
            path={path.concat([child?.namespace!])}
            fullpath={fullpath}
            open={open}
            setOpen={setOpen}
            index={index + 1}
            childIndex={childIndex}
            setDrawerOpen={setDrawerOpen}
            siblings={length}
          />
        ))}
      </Collapse>
    </>
  );
};

const HomeList = ({ setOpen }: { setOpen: Function }) => {
  const router = useRouter();
  const userId = useUserId();
  const sub = useSubscription();
  const query = useQuery();
  const [_, setSession] = useSession();
  const events = sub.nodes({
    where: {
      _and: [
        { mimeId: { _eq: "wiki/event" } },
        {
          members: {
            _and: [{ accepted: { _eq: true } }, { nodeId: { _eq: userId } }],
          },
        },
      ],
    },
  });

  const handleEventSelect = (id: any) => async () => {
    const prefix = await resolved(() => {
      const node = query.node({ id });
      return {
        id: node?.id,
        name: node?.name ?? "",
        mime: node?.mimeId!,
        namespace: node?.namespace,
      };
    });

    const path = await fromId(id);
    startTransition(() => {
      setSession({
        prefix: {
          ...prefix,
          path,
        },
      });
      setOpen(false);
      router.push(`/${path.join("/")}`);
    });
  };

  return (
    <>
      <List>
        <ListItem key={0}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: (t) => t.palette.secondary.main }}>
              <Event />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Begivenheder" />
        </ListItem>
        <Divider />
        {events.map(({ id = 0, name }) => (
          <ListItem
            key={id}
            hidden={id == 0}
            button
            onClick={handleEventSelect(id)}
          >
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
        {events?.length == 0 && (
          <ListItem key={-1}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: (t) => t.palette.secondary.main }}>
                <EventBusy />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Ingen begivenheder" />
          </ListItem>
        )}
      </List>
      <Divider />
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
  const [session] = useSession();
  const largeScreen = useMediaQuery("(min-width:1200px)");
  const path = usePath();
  const query = useQuery();
  const home = path.length === 0;
  const node = useNode({
    where: toWhere(home ? [] : session?.prefix?.path ?? path),
  });
  const context = node.useContext();

  const [listOpen, setListOpen] = useState<boolean[][]>([[]]);

  const contextId = node?.contextId;

  const handleCurrent = async () => {
    const id = await resolved(
      () => {
        return query
          .node({ id: contextId })
          ?.relations({ where: { name: { _eq: "active" } } })?.[0]?.nodeId;
      },
      { noCache: true }
    );
    const path = await fromId(id ?? contextId);
    await router.push(`/${path.join("/")}`);
    setOpen(false);
  };

  const list = home ? (
    <HomeList setOpen={setOpen} />
  ) : (
    <List sx={{ pt: 0, pb: 0, width: "100%" }}>
      <ListItemButton
        sx={{ color: "secondary.main" }}
        component={NextLink}
        href={`/${session?.prefix?.path?.join("/")}?app=screen`}
        target="_blank"
      >
        <ListItemIcon sx={{ color: "secondary.main" }}>
          <ConnectedTv />
        </ListItemIcon>
        <ListItemText primary="Skærm" />
      </ListItemButton>
      <ListItemButton onClick={handleCurrent} sx={{ color: "secondary.main" }}>
        <ListItemIcon sx={{ color: "secondary.main" }}>
          <FileOpen />
        </ListItemIcon>
        <ListItemText primary="Aktuelle Punkt" />
      </ListItemButton>
      <Divider />
      <DrawerElement
        id={contextId}
        path={session?.prefix?.path ?? []}
        fullpath={path}
        open={listOpen}
        setOpen={setListOpen}
        setDrawerOpen={setOpen}
        index={0}
        childIndex={0}
        siblings={0}
      />
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
          onClick={(e) => {
            !home && router.push(`/${(session?.prefix?.path ?? []).join("/")}`);
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
          <MimeAvatar node={context} />
          <Typography sx={{ pl: 1 }} color="#fff" variant="h6">
            {context?.name}
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
