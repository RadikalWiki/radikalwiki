import React, { Suspense, useState } from 'react';
import {
  Link as NextLink,
  AddChangeButton,
  Content,
  ContentToolbar,
  AutoButton,
  MimeAvatar,
  MemberChips,
} from 'comps';
import { useRouter } from 'next/router';
import {
  ExpandMore,
  ExpandLess,
  LowPriority,
  LockOpen,
  Face,
  DoNotDisturb,
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
  Skeleton,
} from '@mui/material';
import { order_by } from 'gql';
import { IconId } from 'mime';
import { Node, useNode, useScreen } from 'hooks';
import { TransitionGroup } from 'react-transition-group';

const ChildListElement = ({ id, index }: { id: string; index: number }) => {
  const node = useNode({ id });
  const query = node.useQuery();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const item = (
    <>
      <ListItem
        button
        component={NextLink}
        href={`${router.asPath}/${query?.namespace}`}
      >
        <ListItemAvatar>
          <MimeAvatar mimeId={query?.mimeId} index={index} />
        </ListItemAvatar>
        <ListItemText
          primary={query?.name}
          secondary={<MemberChips node={node} child />}
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
  return id ? item : null;
};

const ChildListRaw = ({ node }: { node: Node }) => {
  const children = node.useQuery()?.children({
    where: { mimeId: { _eq: 'vote/change' } },
    order_by: [{ index: order_by.asc }],
  });

  return (
    <List>
      <TransitionGroup>
        {children?.map(({ id }, index) => (
          <Collapse key={id ?? 0}>
            {id && <ChildListElement id={id} index={index} />}
          </Collapse>
        ))}
        {children?.length == 0 && (
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
              <ListItemText primary="Ingen ændringsforslag" />
            </ListItem>
          </Collapse>
        )}
      </TransitionGroup>
    </List>
  );
};

const ChangeList = ({ node }: { node: Node }) => {
  const screen = useScreen();
  const router = useRouter();
  const query = node.useQuery();

  if (screen) return null;

  return (
    <Card sx={{ m: 0 }}>
      <CardHeader
        title={<Typography> Ændringsforslag </Typography>}
        avatar={
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
            }}
          >
            <IconId mimeId="vote/change" />
          </Avatar>
        }
        action={
          <CardActions sx={{ p: 0 }}>
            {query?.isContextOwner && (
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
};

export default ChangeList;
