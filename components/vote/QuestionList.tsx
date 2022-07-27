import React, { Children, Suspense, useState } from "react";
import {
  Link as NextLink,
  AddQuestionButton,
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
  Delete,
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
import { nodes, order_by } from "gql";
import { getIcon } from "mime";
import { Node, useNode } from "hooks";
import { TransitionGroup } from "react-transition-group";

function ChildListElement({ node, child, index }: { node: Node, child?: nodes; index: number }) {
  //const node = useNode({ id });
  //const query = node.query;
  const router = useRouter();
  const id = child?.id

  return (
    <>
      <ListItem
        button
        component={NextLink}
        href={`${router.asPath}/${child?.namespace}`}
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: (t) => t.palette.secondary.main,
            }}
          >
            {index + 1}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={child?.data()?.text}
          secondary={
            <Chip
              key={child?.owner?.id}
              icon={<Face />}
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ mr: 0.5 }}
              label={child?.owner?.displayName}
            />
          }
        />
        {(child?.isOwner || child?.isContextOwner) && (
          <ListItemSecondaryAction>
            <IconButton
              color="primary"
              onClick={() => {
                node.delete({ id });
              }}
              size="large"
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </>
  );
}

export default function QuestionList({ node }: { node: Node }) {
  const router = useRouter();
  const children = node.query?.children({
    where: { mimeId: { _eq: "vote/question" } },
    order_by: [{ index: order_by.asc }],
  });

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={<Typography color="secondary">Spørgsmål</Typography>}
        avatar={
          <Avatar
            sx={{
              bgcolor: (t) => t.palette.secondary.main,
            }}
          >
            {getIcon("vote/question")}
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
            <AddQuestionButton node={node} />
          </CardActions>
        }
      />
      <Divider />
      <List>
        <TransitionGroup>
          {children?.map((child, index: number) => {
            return (
              <Collapse key={child?.id ?? 0}>
                <Suspense fallback={null}>
                  <ChildListElement node={node} child={child} index={index} />
                </Suspense>
              </Collapse>
            );
          })}
          {!children?.[0]?.id && (
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
                <ListItemText primary="Ingen spørgsmål" />
              </ListItem>
            </Collapse>
          )}
        </TransitionGroup>
      </List>
    </Card>
  );
}
