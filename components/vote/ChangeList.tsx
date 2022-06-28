import React, { Suspense, useState } from "react";
import {
  Link as NextLink,
  AddVoteChildButton,
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
import { nodes, order_by, useQuery } from "gql";
import { getIcon } from "mime";

function ChildListElement({ node, index }: { node: nodes; index: number }) {
  const authors = node?.members().map((m) => m.name ?? m.user?.displayName);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        button
        component={NextLink}
        href={`${router.asPath}/${node?.namespace}`}
      >
        <ListItemAvatar>
          {node?.mutable ? (
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <Tooltip title="Ikke indsendt">
                  <Avatar
                    sx={{
                      width: 18,
                      height: 18,
                      bgcolor: (theme) => theme.palette.primary.main,
                    }}
                  >
                    <LockOpen
                      sx={{
                        width: 14,
                        height: 14,
                        color: "#fff",
                      }}
                    />
                  </Avatar>
                </Tooltip>
              }
            >
              <Avatar
                sx={{
                  bgcolor: (t) => t.palette.secondary.main,
                }}
              >
                {index + 1}
              </Avatar>
            </Badge>
          ) : (
            <Avatar
              sx={{
                bgcolor: (theme) => theme.palette.secondary.main,
              }}
            >
              {index + 1}
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={node?.name}
          secondary={node?.members().map((m) => (
            <Chip
              key={m.id ?? 0}
              icon={<Face />}
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ mr: 0.5 }}
              label={m.name ?? m.user?.displayName}
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
      <Collapse mountOnEnter unmountOnExit in={open}>
        <Suspense fallback={null}>
          <ContentToolbar id={node?.id} child />
          <Content id={node?.id} fontSize="100%" />
        </Suspense>
        <Divider />
      </Collapse>
    </>
  );
}

function ChildListRaw({ node }: { node?: nodes }) {
  const children = node?.children({
    where: { mimeId: { _eq: "vote/change" } },
    order_by: [{ index: order_by.asc }],
  });

  return (
    <List>
      {children?.map((node, index: number) => {
        return (
          <ChildListElement key={node?.id ?? 0} node={node} index={index} />
        );
      })}
      {children?.length == 0 && (
        <ListItem button>
          <ListItemText primary="Ingen ændringsforslag" />
        </ListItem>
      )}
    </List>
  );
}

function ChangeList({ id }: { id: string }) {
  const router = useRouter();
  const query = useQuery();
  const node = query.node({ id });

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={<Typography color="secondary"> Ændringsforslag </Typography>}
        avatar={
          <Avatar
            sx={{
              bgcolor: (theme) => theme.palette.secondary.main,
            }}
          >
            {getIcon("vote/change")}
          </Avatar>
        }
        action={
          <CardActions sx={{ p: 0 }}>
            {node?.isContextOwner && (
              <AutoButton
                text="Sorter"
                icon={<LowPriority />}
                onClick={() => router.push(`${router.asPath}?app=sort`)}
              />
            )}
            <AddVoteChildButton id={id} />
          </CardActions>
        }
      />
      <Divider />
      <ChildListRaw node={node!} />
    </Card>
  );
}

export default function Component({ id }: { id: string }) {
  return (
    <Suspense fallback={null}>
      <ChangeList id={id} />
    </Suspense>
  );
}
