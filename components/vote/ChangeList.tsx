import React, { Suspense, useState } from "react";
import {
  Link as NextLink,
  AddChangeButton,
  Content,
  ContentToolbar,
  AutoButton,
} from "comps";
import { useRouter } from "next/router";
import {
  ExpandMore,
  ExpandLess,
  LowPriority,
  LockOpen,
  Face,
  DoNotDisturb,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Collapse,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  CardActions,
  Typography,
  Chip,
} from "@mui/material";
import { order_by } from "gql";
import { getIconFromId, MimeAvatar } from "mime";
import { Node, useNode, useScreen } from "hooks";
import { TransitionGroup } from "react-transition-group";

function ChildListElement({ id, index }: { id: string; index: number }) {
  const node = useNode({ id });
  const query = node.query;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (!id) return null; 

  return (
    <>
      <ListItem
        button
        component={NextLink}
        href={`${router.asPath}/${query?.namespace}`}
      >
        <ListItemAvatar>
          <MimeAvatar node={query} index={index} />
        </ListItemAvatar>
        <ListItemText
          primary={query?.name}
          secondary={query?.members().map(({ id, name, user }) => (
            <Chip
              key={id ?? 0}
              icon={<Face />}
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ mr: 0.5 }}
              label={name ?? user?.displayName}
            />
          ))}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
            size="large"
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <Collapse in={open}>
        <ContentToolbar node={node} child />
        <Content node={node} fontSize="100%" />
        <Divider />
      </Collapse>
    </>
  );
}

function ChildListRaw({ node }: { node: Node }) {
  const children = node.query?.children({
    where: { mimeId: { _eq: "vote/change" } },
    order_by: [{ index: order_by.asc }],
  });

  return (
    <List>
      <TransitionGroup>
        {children?.map(({ id }, index: number) => {
          return (
            <Collapse key={id ?? 0}>
              <Suspense fallback={null}>
                <ChildListElement id={id} index={index} />
              </Suspense>
            </Collapse>
          );
        })}
        {children?.length == 0 && (
          <Collapse key={-1}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: (t) => t.palette.secondary.main,
                  }}
                >
                  <DoNotDisturb />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Ingen ændringsforslag" />
            </ListItem>
          </Collapse>
        )}
      </TransitionGroup>
    </List>
  );
}

export default function ChangeList({ node }: { node: Node }) {
  const screen = useScreen();
  const router = useRouter();

  if (screen) return null;

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={<Typography color="secondary"> Ændringsforslag </Typography>}
        avatar={
          <Avatar
            sx={{
              bgcolor: (t) => t.palette.secondary.main,
            }}
          >
            {getIconFromId("vote/change")}
          </Avatar>
        }
        action={
          <CardActions sx={{ p: 0 }}>
            {node.query?.isContextOwner && (
              <AutoButton
                text="Sorter"
                icon={<LowPriority />}
                onClick={() => router.push(`${router.asPath}?app=sort`)}
              />
            )}
            <AddChangeButton node={node} />
          </CardActions>
        }
      />
      <Divider />
      <ChildListRaw node={node!} />
    </Card>
  );
}
