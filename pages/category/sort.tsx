import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link as NextLink, CategorySortFab } from "comps";
import { useSession, useStyles } from "hooks";
import { CATEGORIES_GET } from "gql";
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

export default function Sort() {
  const classes = useStyles();
  const [session] = useSession();
  const { loading, data, error } = useQuery(CATEGORIES_GET, {
    variables: { eventId: session?.event?.id },
  });
  const categories = data?.categories;
  const [cats, setCats] = useState([]);

  useEffect(() => {
    if (categories) {
      setCats(categories);
    }
  }, [categories]);

  const handleDragEnd = ({ source, destination }: any) => {
    if (destination === undefined || destination === null) return;
    const start = cats[source.index];
    const end = cats[destination.index];
    const newList = cats.filter((_, idx) => idx !== source.index);
    newList.splice(destination.index, 0, cats[source.index]);
    setCats(newList);
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
              href="/category"
            >
              <Tooltip title="Indhold">
                <Subject />
              </Tooltip>
            </Link>
            <Link component={NextLink} color="primary" href="/category/sort">
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
                  {cats.map(
                    (
                      cat: { name: any; id: any; childMode: any },
                      index: number
                    ) => (
                      <Draggable
                        key={cat.id}
                        draggableId={cat.id}
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
                                  {cat.childMode == "changes" ? (
                                    <Subject />
                                  ) : (
                                    <Group />
                                  )}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={cat.name} />
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
      <CategorySortFab categories={cats} />
    </>
  );
}
