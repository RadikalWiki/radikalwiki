import React, { Children, Suspense, useState } from 'react';
import {
  Link as NextLink,
  AddQuestionButton,
  Content,
  ContentToolbar,
  AutoButton,
} from 'comps';
import { useRouter } from 'next/router';
import {
  ExpandMore,
  ExpandLess,
  LowPriority,
  LockOpen,
  Face,
  DoNotDisturb,
  Delete,
} from '@mui/icons-material';
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
} from '@mui/material';
import { nodes, order_by } from 'gql';
import { IconId } from 'mime';
import { Node, useScreen } from 'hooks';
import { TransitionGroup } from 'react-transition-group';
import { useUserId } from '@nhost/nextjs';

export default function QuestionList({ node }: { node: Node }) {
  const screen = useScreen();
  const router = useRouter();
  const query = node.useQuery();
  const $delete = node.useDelete();
  const userId = useUserId();
  const children = query?.children({
    where: { mimeId: { _eq: 'vote/question' } },
    order_by: [{ index: order_by.asc }],
  });

  return (
    <Card sx={{ m: 0 }}>
      <CardHeader
        title={<Typography>Spørgsmål</Typography>}
        avatar={
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
            }}
          >
            <IconId mimeId="vote/question" />
          </Avatar>
        }
        action={
          !screen && (
            <CardActions sx={{ p: 0 }}>
              {query?.isContextOwner && !screen && (
                <AutoButton
                  text="Sorter"
                  icon={<LowPriority />}
                  onClick={() => router.push(`${router.asPath}?app=sort`)}
                />
              )}
              <AddQuestionButton node={node} />
            </CardActions>
          )
        }
      />
      <Divider />
      <List>
        <TransitionGroup>
          {children?.map((child, index) => {
            const item = (
              <Collapse key={child?.id ?? 0}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: 'secondary.main',
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
                  {!screen &&
                    (child.ownerId == userId || query?.isContextOwner) && (
                      <ListItemSecondaryAction>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            $delete({ id: child.id });
                          }}
                          size="large"
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                </ListItem>
              </Collapse>
            );
            return child?.id ? item : null;
          })}
          {!children?.[0]?.id && (
            <Collapse key={-1}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: 'secondary.main',
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
