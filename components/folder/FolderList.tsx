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
import { LockOpen } from "@mui/icons-material";
import { order_by, resolved, useQuery } from "gql";
import { TransitionGroup } from "react-transition-group";
import { getIcon } from "mime";
import { toWhere } from "core/path";

export default function FolderList({ id }: { id: string }) {
  const router = useRouter();
  const query = useQuery();

  const folder = query.node({ id });

  const children =
    folder?.children({
      order_by: [{ index: order_by.asc }],
      where: {
        name: {
          _regex:
            "(wiki/(folder|document|group|event)|vote/(policy|position|candidate))",
        },
      },
    }) ?? [];

  const policies = children.filter(
    (child) => child.name == "vote/policy"
  );

  const handleOnClick = (namespace?: string) => async () => {
    const path = `${router.asPath}/${namespace}`.substring(1).split("/");
    await resolved(() => {
      const node = query.nodes(toWhere(path))?.[0];
      node.id;
      node.name;
      node.mimeId;
    });

    router.push(`${router.asPath}/${namespace}`);
  };

  return (
    <TransitionGroup>
      {children.map(({ id, name, namespace, mimeId, mutable }) => {
        const avatar = (
          <Avatar
            sx={{
              bgcolor: (theme) => theme.palette.secondary.main,
            }}
          >
            {getIcon(
              mimeId!,
              policies.findIndex((e) => e.id === id)
            )}
          </Avatar>
        );
        return !id ? null : (
          <Collapse key={id ?? 0}>
            <ListItem button onClick={handleOnClick(namespace)}>
              <ListItemAvatar>
                {mutable ? (
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
                    {avatar}
                  </Badge>
                ) : (
                  avatar
                )}
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItem>
            <Divider />
          </Collapse>
        );
      })}
      {children.length == 0 && (
        <Collapse key={id}>
          <ListItem button>
            <ListItemText primary="Intet indhold" />
          </ListItem>
          <Divider />
        </Collapse>
      )}
    </TransitionGroup>
  );
}
