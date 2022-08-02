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
} from "@mui/material";
import {
  Airplay,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Menu,
} from "@mui/icons-material";
import { useSession, usePath } from "hooks";
import { toWhere } from "core/path";
import { Link as NextLink } from "comps";
import { nodes, order_by, useQuery } from "gql";
import { MimeIcon } from "mime";
import { Fragment, useState, startTransition } from "react";

const DrawerList = (
  node: nodes,
  path: string[],
  fullpath: string[],
  open: boolean[][],
  setOpen: any,
  index: number
): any => {
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

    if (!child?.id) return;
    return (
      <Fragment key={child?.id ?? 0}>
        <ListItemButton
          sx={{ pl: 3 + index }}
          selected={selected}
          component={NextLink}
          href={`${path.join("/")}/${child?.namespace}`}
        >
          <ListItemIcon>
            <MimeIcon node={child} index={iconIndex} />
          </ListItemIcon>
          <ListItemText>
            <Typography>{child?.name ?? "Ukendt"}</Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
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
                });
              }}
              edge="end"
            >
              {!someChildren ? null : open[index]?.[childIndex] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemButton>

        {someChildren ? (
          <Collapse in={open[index]?.[childIndex] ?? false}>
            {DrawerList(
              child,
              path.concat([child?.namespace!]),
              fullpath,
              open,
              setOpen,
              index + 1
            )}
          </Collapse>
        ) : null}
      </Fragment>
    );
  });
  return index == 0 ? (
    <List>
      <ListItemButton
        selected
        component={NextLink}
        href={`/${path?.join("/")}`}
      >
        <ListItemIcon>
          <MimeIcon node={node} />
        </ListItemIcon>
        <ListItemText primary={node?.name} />
      </ListItemButton>
      {elements}
    </List>
  ) : (
    elements
  );
};

export default function Drawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const path = usePath();
  const query = useQuery();
  const [session] = useSession();

  const [listOpen, setListOpen] = useState<boolean[][]>([]);

  const prefix = session?.prefix?.path;
  const sliced = path.slice(0, prefix?.length);
  const show =
    sliced.length === prefix?.length && sliced.every((v, i) => v === prefix[i]);

  const node = query.nodes(
    toWhere(session?.prefix?.path ?? path.slice(0, 1))
  )[0];
  return (
    <MuiDrawer variant="persistent" open={open} onMouseLeave={() => setOpen()}>
      <List>
        <ListItem
          secondaryAction={
            <IconButton onClick={() => setOpen()}>
              <ChevronLeft />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Menu />
          </ListItemIcon>
          <ListItemText primary={<Typography variant="h6">Menu</Typography>} />
        </ListItem>
        <Divider />
        <ListItemButton
          component={NextLink}
          href={`/${session?.prefix?.path?.join("/")}?app=screen`}
          target="_blank"
        >
          <ListItemIcon>
            <Airplay />
          </ListItemIcon>
          <ListItemText primary="Skærm" />
        </ListItemButton>
        <Divider />
      </List>
      {show &&
        DrawerList(
          node,
          session?.prefix?.path ?? [],
          path,
          listOpen,
          setListOpen,
          0
        )}
    </MuiDrawer>
  );
}
