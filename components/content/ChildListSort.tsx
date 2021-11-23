import React, { Fragment, Suspense, useEffect, useState } from "react";
import {
  Link as NextLink,
  AddChildButton,
  Content,
  ContentToolbar,
  PollList,
  FolderSortFab,
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
import { order_by, useQuery } from "gql";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function ChildListRaw({ id }: { id: string }) {
  const [list, setList] = useState<any[]>([]);
  const query = useQuery();
  const content = query.contents_by_pk({ id });
  const children = content?.children({ order_by: [{ priority: order_by.asc }] });
  const folder = content?.folder;

  useEffect(() => {
    setList(
      children?.map(({ id, name, authors, published }) => ({
        id,
        name,
        authors,
        published,
        type: "content"
      })) ?? []
    );
  }, [children]);

  const handleDragEnd = ({ source, destination }: any) => {
    if (destination === undefined || destination === null) return;
    const newList = list.filter((_, idx) => idx !== source.index);
    newList.splice(destination.index, 0, list[source.index]);
    setList(newList);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="drop1">
          {(provided, snapshot) => (
            <List ref={provided.innerRef} sx={{ m: 0 }}>
              {list.map(({ id = 0, name, authors, published }, index: number) =>
                id != 0 ? (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <Fragment key={id}>
                        <ListItem
                          button
                          component={NextLink}
                          href={`/content/${id}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItemAvatar>
                            {published ? (
                              <Avatar
                                sx={{
                                  bgcolor: (theme) =>
                                    theme.palette.primary.main,
                                }}
                              >
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
                              content?.folder?.mode == "changes"
                                ? authors()
                                    ?.map(
                                      ({ identity, name }: any) =>
                                        identity?.displayName ?? name
                                    )
                                    .join(", ")
                                : null
                            }
                          />
                        </ListItem>
                      </Fragment>
                    )}
                  </Draggable>
                ) : null
              )}
              {provided.placeholder}
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
          )}
        </Droppable>
      </DragDropContext>
      <FolderSortFab folder={folder} contentId={id} elements={list} />
    </>
  );
}

function ChildListCard({ id }: { id: string }) {
  const query = useQuery();
  const content = query.contents_by_pk({ id });

  return (
    <Card elevation={3} sx={{ m: 1 }}>
      <CardHeader
        title={
          content?.folder?.mode == "changes"
            ? "Ændringsforslag"
            : "Kandidaturer"
        }
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
      <ChildListCard id={id} />
    </Suspense>
  );
}
