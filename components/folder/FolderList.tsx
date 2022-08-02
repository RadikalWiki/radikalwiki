import React from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Badge,
  Collapse,
  Divider,
  ListItem,
  Tooltip,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { DoNotDisturb, LockOpen } from "@mui/icons-material";
import { order_by, query, resolved } from "gql";
import { TransitionGroup } from "react-transition-group";
import { MimeAvatar, MimeIcon } from "mime";
import { toWhere } from "core/path";
import { Node, useNode } from "hooks";
import { useUserId } from "@nhost/react";

export default function FolderList({ node }: { node: Node }) {
  const userId = useUserId();
  const router = useRouter();

  const children =
    node.query?.children({
      order_by: [{ index: order_by.asc }],
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

  const policies = children.filter((child) => child.mimeId == "vote/policy");

  const handleOnClick = (namespace?: string) => async () => {
    const path = `${router.asPath}/${namespace}`.substring(1).split("/");
    await resolved(() => {
      const node = query?.nodes(toWhere(path))?.[0];
      node?.id;
      node?.name;
      node?.mimeId;
    });

    router.push(`${router.asPath}/${namespace}`);
  };

  return (
    <TransitionGroup>
      {children.map((node) => {
        const { id, name, namespace } = node;
        const avatar = (
          <MimeAvatar
            node={node}
            index={policies.findIndex((policy) => policy.id === id)}
          />
        );
        return !id ? null : (
          <Collapse key={id ?? 0}>
            <ListItem button onClick={handleOnClick(namespace)}>
              <ListItemAvatar>
                {avatar}
              </ListItemAvatar>
              <ListItemText primary={name} />
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
