import React, { Fragment, Suspense, useState } from "react";
import {
  Link as NextLink,
  AddChildButton,
  Content,
  ContentToolbar,
  PollList,
} from "comps";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSession } from "hooks";
import { Lock, ExpandMore, Subject, ExpandLess } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Collapse,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Fade,
} from "@mui/material";
import { useQuery } from "gql";

function ChildListElement({ id, name, authors, published, index, mode }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment key={id}>
      <ListItem button component={NextLink} href={`/content/${id}`}>
        <ListItemAvatar>
          {published ? (
            <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
              {index + 1}
            </Avatar>
          ) : (
            <Tooltip title="Ikke indsendt">
              <Avatar>
                <Lock color="primary" />
              </Avatar>
            </Tooltip>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            mode == "changes"
              ? authors()
                  ?.map(
                    ({ identity, name }: any) => identity?.displayName ?? name
                  )
                  .join(", ")
              : null
          }
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
      <Collapse mountOnEnter unmountOnExit in={open}>
        <Suspense fallback={null}>
          <ContentToolbar id={id} child />
          <Content id={id} fontSize="100%" />
        </Suspense>
        <Divider />
      </Collapse>
    </Fragment>
  );
}

function ChildListRaw({ id }: { id: string }) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const children = content?.children();

  if (content?.parentId) return null;

  return (
    <List>
      {children?.map(({ id = 0, name, authors, published }, index: number) =>
        id != 0 ? (
          <ChildListElement
            key={id}
            id={id}
            name={name}
            authors={authors}
            published={published}
            index={index}
            mode={content?.folder?.mode}
          />
        ) : null
      )}
      {content?.children().map((id) => id).length == 0 && (
        <ListItem button>
          <ListItemText
            primary={`Ingen ${
              content?.folder?.mode == "changes"
                ? "ændringsforslag"
                : "kandidaturer"
            }`}
          />
        </ListItem>
      )}
    </List>
  );
}

function ChildListCard({ id }: { id: string }) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const children = content?.children();

  if (content?.parentId) return null;

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={
          content?.folder?.mode == "changes"
            ? "Ændringsforslag"
            : "Kandidaturer"
        }
        action={<AddChildButton contentId={id} />}
      />
      <Divider />
      <Suspense fallback={null}>
        <ChildListRaw id={id} />
      </Suspense>
    </Card>
  );
}

export default function ChildList({ id }: { id: string }) {
  return (
    <Suspense fallback={null}>
      <ChildListCard id={id} />;
    </Suspense>
  );
}
