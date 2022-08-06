import React, { Fragment } from "react";
import { Link as NextLink } from "comps";
import { Card, Divider, List, ListItem, ListItemText } from "@mui/material";
import { useQuery } from "gql";

export default function EventList() {
  const query = useQuery();
  const events = query.nodes({
    where: { mimeId: { _eq: "wiki/event" } },
  });

  return (
    <Card sx={{ m: 0 }}>
      <List sx={{ m: 0 }}>
        {events?.map(({ id = 0, name }) => (
          <Fragment key={id}>
            <Divider />
            <ListItem button component={NextLink} href={id}>
              <ListItemText primary={name} />
            </ListItem>
          </Fragment>
        ))}
        <Divider />
      </List>
    </Card>
  );
}
