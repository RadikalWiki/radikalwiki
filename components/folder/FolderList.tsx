import React from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Collapse,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  ContentCopy,
  DoNotDisturb,
} from "@mui/icons-material";
import { nodes, order_by } from "gql";
import { TransitionGroup } from "react-transition-group";
import { MimeAvatar } from "comps";
import { Node, useSession } from "hooks";
import { useUserId } from "@nhost/nextjs";
import { getIconFromId } from "mime";

export default function FolderList({ node }: { node: Node }) {
  const [session, setSession] = useSession();
  const isOwner = node.useQuery()?.isContextOwner;
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
    const numberIndex = number.findIndex((elem) => elem.id === id);
    if (numberIndex !== -1) return numberIndex;
    const letterIndex = letter.findIndex((elem) => elem.id === id);
    if (letterIndex !== -1) return letterIndex;
    return undefined;
  };

  const handleSelect = (id: string) => (e: any) => {
    e.stopPropagation();
    if (session?.selected?.includes(id)) {
      setSession({ selected: session?.selected.filter((cid) => cid !== id) });
    } else {
      setSession({ selected: (session?.selected ?? []).concat([id]) });
    }
  };

  return (
    <TransitionGroup>
      {children.map((child) => {
        const { id, mimeId, name, namespace } = child;
        const avatar = (
          <MimeAvatar
            mimeId={child.data({ path: "type" }) ?? mimeId}
            index={findIndex(id)}
          />
        );
        return !id ? null : (
          <Collapse key={id ?? 0}>
            <ListItemButton
              selected={session?.selected?.includes(child.id)}
              onClick={handleOnClick(namespace)}
            >
              <ListItemAvatar>{avatar}</ListItemAvatar>
              <ListItemText primary={<Typography>{name}</Typography>} />
              {isOwner ? (
                <Tooltip title="Kopier" onClick={handleSelect(id)}>
                  {session?.selected?.includes(child.id) ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlankOutlined />
                  )}
                </Tooltip>
              ) : null}
            </ListItemButton>
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
                  bgcolor: "secondary.main",
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
