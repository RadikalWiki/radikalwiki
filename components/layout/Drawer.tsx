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
import { useSession, usePath } from "hooks";
import { fromId, toWhere } from "core/path";
import { Link as NextLink } from "comps";
import {
  order_by,
  query,
  resolved,
  useQuery,
  nodes,
  useSubscription,
} from "gql";
import { MimeAvatar, MimeIcon } from "mime";
import { Fragment, useState, startTransition } from "react";
import { useRouter } from "next/router";
import { drawerWidth } from "core/constants";
import { Box } from "@mui/system";
import { useUserId } from "@nhost/react";

const DrawerList = ({
  node,
  path,
  fullpath,
  open,
  setOpen,
  setDrawerOpen,
  index,
}: {
  node: nodes;
  path: string[];
  fullpath: string[];
  open: boolean[][];
  setOpen: Function;
  setDrawerOpen: Function;
  index: number;
}) => {
  const router = useRouter();
  const slicedPath = fullpath.slice(0, path.length + 1);

  const children = node?.children({
    order_by: [{ index: order_by.asc }],
    where: {
      mime: {
        hidden: { _eq: false },
      },
    },
  });

  const letter = children?.filter((child) => child.mime?.icon == "letter");
  const number = children?.filter((child) => child.mime?.icon == "number");

  const elements = children?.map((child, childIndex) => {
    const childPath = [...path, child.namespace];
    const selected =
      childPath.length === slicedPath.length &&
      childPath.every((v, i) => v === slicedPath[i]);
    const grandChildren = child?.children({
      order_by: [{ index: order_by.asc }],
      where: {
        mime: {
          hidden: { _eq: false },
        },
      },
    });
    const someChildren = grandChildren?.length && grandChildren?.[0].namespace;
    const iconIndex = (
      child?.mime?.icon == "letter"
        ? letter
        : child?.mime?.icon == "number"
        ? number
        : undefined
    )?.findIndex((e) => e.id === child.id);

    if (!child?.id) return null;

    return (
      <Fragment key={child?.id ?? 0}>
        <ListItemButton
          sx={{
            pl: 2 + index,
            color: selected ? "primary.main" : "",
          }}
          selected={selected}
          onClick={() => {
            startTransition(() => {
                setDrawerOpen(false);
                router.push(`${path.join("/")}/${child?.namespace}`);
            });
          }}
        >
          <ListItemIcon sx={{ color: selected ? "primary.main" : "" }}>
            <MimeIcon node={child} index={iconIndex} />
          </ListItemIcon>
          <ListItemText>
            <Typography>{child?.name}</Typography>
          </ListItemText>
          {!!someChildren && (
            <ListItemSecondaryAction>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  startTransition(() => {
                    const length = children.length;
                    const newChildOpen = [
                      ...new Array(childIndex).fill(false),
                      !open[index]?.[childIndex] ?? false,
                      ...new Array(
                        length - childIndex ? length - childIndex : 0
                      ).fill(false),
                    ];

                    const newOpen = [
                      ...open.slice(0, index),
                      newChildOpen,
                      ...open.slice(index + 1),
                    ];

                    setOpen(newOpen);
                    if (!someChildren) setDrawerOpen(false);
                  });
                }}
                edge="end"
              >
                {open[index]?.[childIndex] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItemButton>

        {someChildren ? (
          <Collapse in={open[index]?.[childIndex] ?? false}>
            <DrawerList
              node={child}
              path={path.concat([child?.namespace!])}
              fullpath={fullpath}
              open={open}
              setOpen={setOpen}
              index={index + 1}
              setDrawerOpen={setDrawerOpen}
            />
          </Collapse>
        ) : null}
      </Fragment>
    );
  });
  return <>{elements}</>;
};

const HomeList = ({
  setOpen,
  setHome,
}: {
  setOpen: Function;
  setHome: Function;
}) => {
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
    setSession({
      prefix: {
        ...prefix,
        path,
      },
    });
    startTransition(() => {
      setOpen(false);
      setHome(false);
    });
    router.push("/" + path.join("/"));
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

type DrawerState = "init" | "home" | "context";

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
  const [state, setState] = useState<DrawerState>("init");
  const home = state === "home" || (state === "init" && path.length === 0);

  const [listOpen, setListOpen] = useState<boolean[][]>([]);

  const node = query.nodes(
    toWhere(session?.prefix?.path ?? path.slice(0, 1))
  )[0];
  const contextId = node.contextId;

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
    await router.push("/" + path.join("/"));
    setOpen(false);
  };

  const list = home ? (
    <HomeList setOpen={setOpen} setHome={setState} />
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
      <DrawerList
        node={node}
        path={session?.prefix?.path ?? []}
        fullpath={path}
        open={listOpen}
        setOpen={setListOpen}
        setDrawerOpen={setOpen}
        index={0}
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
          {home && state !== "init" ? (
            <IconButton
              sx={{ color: "#fff" }}
              onClick={(e) => {
                e.stopPropagation();
                startTransition(() => {
                  router.back();
                  setState("context");
                });
              }}
            >
              <ChevronLeft />
            </IconButton>
          ) : path.length > 0 || state !== "init" ? (
            <IconButton
              sx={{ color: "#fff" }}
              onClick={(e) => {
                e.stopPropagation();
                startTransition(() => {
                  router.push("/");
                  setState("home");
                });
              }}
            >
              <Home />
            </IconButton>
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
          {home ? (
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <Home />
            </Avatar>
          ) : (
            <MimeAvatar node={node} />
          )}
          <Typography sx={{ pl: 1 }} color="#fff" variant="h6">
            {home ? "Hjem" : node?.name}
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
