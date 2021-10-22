import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link as NextLink, FolderSortFab } from "comps";
import { useSession } from "hooks";
import {
  Avatar,
  Tooltip,
  Breadcrumbs,
  Card,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Fade,
  Typography,
} from "@mui/material";
import { Group, Subject } from "@mui/icons-material";
import { useQuery } from "gql";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouter } from "next/router";

export default function Sort() {
  const [session] = useSession();
  const router = useRouter();
  const [list, setList] = useState([]);
  const { id } = router.query;
  const query = useQuery();
  const folder = query.folders_by_pk({ id });

  const contents =
    folder
      ?.contents({ where: { parentId: { _is_null: true } } })
      .map(({ id = 0, name, priority, published }) => ({
        id,
        name,
        priority,
        subtitle: undefined as any,
        published,
        type: "content",
      })) || [];
  const folders =
    folder?.folders().map(({ id = 1, name, priority, subtitle }) => ({
      id,
      name,
      priority,
      subtitle,
      published: undefined as boolean | undefined,
      type: "folder",
    })) || [];

  const handleDragEnd = ({ source, destination }: any) => {
    if (destination === undefined || destination === null) return;
    const start = list[source.index];
    const end = list[destination.index];
    const newList = list.filter((_, idx) => idx !== source.index);
    newList.splice(destination.index, 0, list[source.index]);
    setList(newList);
  };

  return (
    <>
      <Card elevation={3} sx={{ m: 1 }}>
        <Breadcrumbs sx={{ p: [2, 0, 2, 2] }}>
          <Link
            component={NextLink}
            sx={{ alignItems: "center", display: "flex" }}
            color="primary"
            href="/folder"
          >
            <Tooltip title="Indhold">
              <Subject />
            </Tooltip>
          </Link>
          {folder?.parentId && (
            <Link
              component={NextLink}
              color="primary"
              href={`/folder/${folder?.id}`}
            >
              <Typography sx={{ alignItems: "center", display: "flex" }}>
                {folder?.name}
              </Typography>
            </Link>
          )}
          <Link
            component={NextLink}
            color="primary"
            href={`/folder/${folder?.id}/sort`}
          >
            <Typography sx={{ alignItems: "center", display: "flex" }}>
              Sorter
            </Typography>
          </Link>
        </Breadcrumbs>
      </Card>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Card elevation={3} sx={{ m: 1 }}>
          <Droppable droppableId="drop1">
            {(provided, snapshot) => (
              <>
                <List sx={{ m: 0 }}>
                  {list.map(
                    (
                      folder: { name: any; id: any; mode: any },
                      index: number
                    ) => (
                      <Draggable
                        key={folder.id}
                        draggableId={folder.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Fragment>
                            {!snapshot.isDragging && <Divider />}
                            <ListItem
                              component="li"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  sx={{
                                    bgcolor: (theme) =>
                                      theme.palette.primary.main,
                                  }}
                                >
                                  {folder.mode == "changes" ? (
                                    <Subject />
                                  ) : (
                                    <Group />
                                  )}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={folder.name} />
                            </ListItem>
                          </Fragment>
                        )}
                      </Draggable>
                    )
                  )}
                  {snapshot.isDraggingOver && <Divider />}
                  {provided.placeholder}
                  <Divider />
                </List>
              </>
            )}
          </Droppable>
        </Card>
      </DragDropContext>
      <FolderSortFab folder={folder} elements={list} />
    </>
  );
}
