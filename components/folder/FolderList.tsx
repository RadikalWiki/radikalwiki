import React from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Collapse,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { DoNotDisturb } from "@mui/icons-material";
import { nodes, order_by } from "gql";
import { TransitionGroup } from "react-transition-group";
import { MimeAvatar } from "comps";
import { Node } from "hooks";
import { useUserId } from "@nhost/react";
import { getIconFromId } from "mime";

export default function FolderList({ node }: { node: Node }) {
  const userId = useUserId();
  const router = useRouter();
  const query = node.useQuery();


  const children =
    query?.children({
      order_by: [{ index: order_by.asc }, { createdAt: order_by.asc }],
      where: {
        _and: [
          {
            _or: [
              { mutable: { _eq: false } },
              { ownerId: { _eq: userId } },
              { members: { nodeId: { _eq: userId } } },
            ],
          },
          {
            mime: {
              hidden: { _eq: false },
            },
          },
        ],
      },
    }) ?? [];

  const handleOnClick = (namespace?: string) => async () => {
    router.push(`${router.asPath}/${namespace}`);
  };

  const number = children.filter((child) => child.mime?.icon == "number");
  const letter = children.filter((child) => child.mime?.icon == "letter");
  const findIndex = (id: string) => {
    const numberIndex = number.findIndex(elem => elem.id === id)
    if (numberIndex !== -1)
      return numberIndex;
    const letterIndex = letter.findIndex(elem => elem.id === id)
    if (letterIndex !== -1)
      return letterIndex
    return undefined;
  }

  return (
    <TransitionGroup>
      {children.map(({ id, mimeId, name, namespace }) => {
        const avatar = <MimeAvatar
          mimeId={mimeId}
          index={findIndex(id)}
        />
        return !id ? null : (
          <Collapse key={id ?? 0}>
            <ListItem button onClick={handleOnClick(namespace)}>
              <ListItemAvatar>{avatar}</ListItemAvatar>
              <ListItemText primary={<Typography>{name}</Typography>} />
            </ListItem>
            <Divider />
          </Collapse>
        );
      })}
      {children.length == 0 && (
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
            <ListItemText primary="Intet indhold" />
          </ListItem>
          <Divider />
        </Collapse>
      )}
    </TransitionGroup>
  );
}
