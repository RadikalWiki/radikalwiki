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
import { order_by, resolved } from "gql";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getIcon } from "mime";
import { Node } from "hooks";

export default function SortApp({ node }: { node: Node }) {
  const [list, setList] = useState<any[]>([]);
  const query = node.query;

  useEffect(() => {
    if (query) {
      const fetch = async () => {
        const children = await resolved(
          () => {
            return (
              query
                ?.children({
                  order_by: [{ index: order_by.asc }],
                })
                .map(({ id, name, index, mutable, mimeId }) => ({
                  id,
                  name,
                  index,
                  mutable,
                  mimeId,
                })) ?? []
            );
          },
          { noCache: true }
        );
        setList(children);
      };
      fetch();
    }
  }, [query]);

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

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Card elevation={3} sx={{ m: 1 }}>
          <Droppable droppableId="drop1">
            {(provided, snapshot) => (
              <List ref={provided.innerRef} sx={{ m: 0 }}>
                {list?.[0]?.id && list.map((e, index: number) => {
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
                                  bgcolor: (t) =>
                                    t.palette.secondary.main,
                                }}
                              >
                                {getIcon(e.mimeId)}
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
      <SortFab node={node} elements={list} />
    </>
  );
}
