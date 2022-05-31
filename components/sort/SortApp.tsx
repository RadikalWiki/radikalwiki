import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { SortFab } from "comps";
import {
  Avatar,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { order_by, useQuery } from "gql";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getIcon } from "mime";
import { useNode } from "hooks";

export default function SortApp() {
  const [list, setList] = useState<any[]>([]);
  const { query: node } = useNode();
  const children =
    node
      ?.children({
        order_by: [{ priority: order_by.asc }],
      })
      .map(({ id, name, priority, mutable, mime }) => ({
        id,
        name,
        priority,
        mutable,
        mime: { name: mime?.name },
      })) ?? [];

  useEffect(() => {
    setList(children);
  }, [node]);

  const handleDragEnd = ({ source, destination }: any) => {
    if (destination === undefined || destination === null) return;
    const newList = list.filter((_, index) => index !== source.index);
    const res = [
      ...newList.slice(0, destination.index),
      list[source.index],
      ...newList.slice(destination.index),
    ];
    setList(res);
  };

  if (!list?.[0]?.id) return null;

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Card elevation={3} sx={{ m: 1 }}>
          <Droppable droppableId="drop1">
            {(provided, snapshot) => (
              <List ref={provided.innerRef} sx={{ m: 0 }}>
                {list.map((e, index: number) => {
                  return (
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
                                    theme.palette.secondary.main,
                                }}
                              >
                                {getIcon(e.mime)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={e.name}
                              secondary={e.subtitle}
                            />
                          </ListItem>
                        </Fragment>
                      )}
                    </Draggable>
                  );
                })}
                {snapshot.isDraggingOver && <Divider />}
                {provided.placeholder}
                <Divider />
              </List>
            )}
          </Droppable>
        </Card>
      </DragDropContext>
      <SortFab folder={node} elements={list} />
    </>
  );
}
