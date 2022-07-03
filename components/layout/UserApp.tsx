import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { HeaderCard, Link } from "comps";
import { useQuery } from "gql";
import { Event, Group, Subject } from "@mui/icons-material";
import { getIcon } from "mime";
import { useNode } from "hooks";

export default function UserApp() {
  const query = useQuery();
  const { query: node } = useNode();
  const nodes = query.nodes({
    where: {
      _or: [{ ownerId: { _eq: node?.id } }],
    },
  });
  return (
    <>
      <HeaderCard title="Medlemskaber" avatar={<Group />}>
        <List>
          {query
            ?.members({
              where: {
                _and: [
                  { nodeId: { _eq: node?.id } },
                  { parent: { mimeId: { _eq: "wiki/group" } } },
                ],
              },
            })
            .map(({ parent, node }) => (
              <ListItem
                key={node?.id ?? 0}
                button
                component={Link}
                href={parent?.id ?? ""}
              >
                <ListItemText primary={parent?.name} />
              </ListItem>
            )) ?? (
            <ListItem>
              <ListItemText primary="Ingen medlemskaber" />
            </ListItem>
          )}
        </List>
      </HeaderCard>
      <HeaderCard title="Begivenheder" avatar={<Event />}>
        <List>
          {query
            ?.members({
              where: {
                _and: [
                  { nodeId: { _eq: node?.id } },
                  { parent: { mimeId: { _eq: "wiki/event" } } },
                ],
              },
            })
            .map(({ parent, node }) => (
              <ListItem
                key={node?.id ?? 0}
                button
                component={Link}
                href={parent?.id ?? ""}
              >
                <ListItemText primary={parent?.name} />
              </ListItem>
            )) ?? (
            <ListItem>
              <ListItemText primary="Ingen medlemskaber" />
            </ListItem>
          )}
        </List>
      </HeaderCard>
      <HeaderCard title="Indhold" avatar={<Subject />}>
        <List>
          {nodes?.map(({ id, name, mimeId, parent }) => (
            <ListItem key={id} button component={Link} href={id ?? ""}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: (t) => t.palette.secondary.main,
                  }}
                >
                  {getIcon(mimeId!)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={parent?.name} />
            </ListItem>
          )) ?? (
            <ListItem>
              <ListItemText primary="Intet indhold" />
            </ListItem>
          )}
        </List>
      </HeaderCard>
    </>
  );
}
