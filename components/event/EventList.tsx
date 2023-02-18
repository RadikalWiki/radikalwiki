import React, { Fragment } from 'react';
import { Link as NextLink } from 'comps';
import { Card, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import { useQuery } from 'gql';

const EventList = () => {
  const query = useQuery();
  const events = query.nodes({
    where: { mimeId: { _eq: 'wiki/event' } },
  });

  return (
    <Card sx={{ m: 0 }}>
      <List sx={{ m: 0 }}>
        {events?.map(({ id = "", name }) => (
          <Fragment key={id}>
            <Divider />
            <ListItemButton component={NextLink} href={id}>
              <ListItemText primary={name} />
            </ListItemButton>
          </Fragment>
        ))}
        <Divider />
      </List>
    </Card>
  );
}

export default EventList;