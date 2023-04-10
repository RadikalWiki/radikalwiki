import {
  CardActions,
  Box,
  Divider,
  Popover,
  Paper,
  Slider,
  Card,
  Stack,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Delete,
  Edit,
  Publish,
  Visibility,
  VisibilityOff,
  Poll,
  People,
  ZoomIn,
} from '@mui/icons-material';
import { Node, useNode, useSession } from 'hooks';
import {
  AutoButton,
  DeleteDialog,
  MimeIcon,
  MimeIconId,
  PollDialog,
} from 'comps';
import { useState } from 'react';
import { IconId } from 'mime';



const SelectItem = ({ id }: { id: string }) => {
  const node = useNode({ id });

  return (
    <ListItem>
      <ListItemIcon>{id && <MimeIconId id={id}/>}</ListItemIcon>
      <ListItemText>{node.name}</ListItemText>
    </ListItem>
  );
};

const SelectToolCard = () => {
  const [session] = useSession();

  return ((session?.selected?.length ?? 0) > 0 ?
    <Card elevation={0}>
      <CardHeader avatar={<IconId mimeId="app/select" />} title="Markerede" />
      <List>
        {session?.selected?.map((id) => (
          <SelectItem key={id} id={id} />
        ))}
      </List>
    </Card> : null
  );
};

export default SelectToolCard;