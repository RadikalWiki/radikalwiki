import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link as NextLink, FolderSortFab, FolderBreadcrumbs } from "comps";
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
import { Subject, Folder } from "@mui/icons-material";
import { useQuery } from "gql";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouter } from "next/router";

export default function Sort() {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const { id } = router.query;
  const query = useQuery();
  const folder = query.folders_by_pk({ id });

  useEffect(() => {
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

    setList(
      contents.concat(folders).sort((f: any, s: any) => f.priority - s.priority)
    );
  }, [folder]);

  const handleDragEnd = ({ source, destination }: any) => {
    if (destination === undefined || destination === null) return;
    const newList = list.filter((_, idx) => idx !== source.index);
    newList.splice(destination.index, 0, list[source.index]);
    setList(newList);
  };

  return (
    <>
      <FolderBreadcrumbs />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Card elevation={3} sx={{ m: 1 }}>
          <Droppable droppableId="drop1">
            {(provided, snapshot) => (
              <List ref={provided.innerRef} sx={{ m: 0 }}>
                {list.map(
                  (
                    e: { name: any; id: any; mode: any; type: any, subtitle: any },
                    index: number
                  ) => (
                    <Draggable key={e.id} draggableId={e.id} index={index}>
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
                                {e.type == "folder" ? <Folder /> : <Subject />}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={e.name} secondary={e.subtitle} />
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
            )}
          </Droppable>
        </Card>
      </DragDropContext>
      <FolderSortFab folder={folder} elements={list} />
    </>
  );
}
