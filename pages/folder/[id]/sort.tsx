import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link as NextLink, FolderSortFab } from "comps";
import { useSession, useStyles } from "hooks";
import { EVENT_GET_FOLDERS, FOLDER_GET } from "gql";
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
  RootRef,
  Typography,
} from "@material-ui/core";
import { Group, Subject } from "@material-ui/icons";
import { useQuery } from "@apollo/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouter } from "next/router";

export default function Sort() {
  const classes = useStyles();
  const [session] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useQuery(FOLDER_GET, {
    variables: { id },
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    const contents =
      data?.folder.contents.map(({ id, name, priority }: any) => ({
        id,
        name,
        priority,
        type: "content",
      })) || [];
    const folders =
      data?.folder.folders.map(({ id, name, priority }: any) => ({
        id,
        name,
        priority,
        type: "folder",
      })) || [];
    setList(
      contents.concat(folders).sort((f: any, s: any) => f.priority - s.priority)
    );
  }, [data]);

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
      <Fade in={!loading}>
        <Card className={classes.card}>
          <Breadcrumbs className={classes.bread}>
            <Link
              component={NextLink}
              className={classes.breadText}
              color="primary"
              href="/folder"
            >
              <Tooltip title="Indhold">
                <Subject />
              </Tooltip>
            </Link>
            {data?.folder.parentId && (
              <Link
                component={NextLink}
                color="primary"
                href={`/folder/${data?.folder.id}`}
              >
                <Typography className={classes.breadText}>
                  {data?.folder.name}
                </Typography>
              </Link>
            )}
            <Link
              component={NextLink}
              color="primary"
              href={`/folder/${data?.folder.id}/sort`}
            >
              <Typography className={classes.breadText}>Sorter</Typography>
            </Link>
          </Breadcrumbs>
        </Card>
      </Fade>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Card className={classes.card}>
          <Droppable droppableId="drop1">
            {(provided, snapshot) => (
              <RootRef rootRef={provided.innerRef}>
                <List className={classes.list}>
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
                                <Avatar className={classes.avatar}>
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
              </RootRef>
            )}
          </Droppable>
        </Card>
      </DragDropContext>
      <FolderSortFab folder={data?.folder} elements={list} />
    </>
  );
}
