import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { SortFab, MimeAvatarId } from 'comps';
import {
  Avatar,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { nodes, order_by, resolved } from 'gql';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Node } from 'hooks';

const SortApp = ({ node }: { node: Node }) => {
  const [list, setList] = useState<Partial<nodes>[]>([]);
  const query = node.useQuery();

  useEffect(() => {
    if (query) {
      const fetch = async () => {
        const children = await resolved(
          () => {
            return (
              query
                ?.children({
                  order_by: [{ index: order_by.asc }],
                  where: { mime: { hidden: { _eq: false } } },
                })
                .map(({ id, name, index, mutable, mimeId, data }) => ({
                  id,
                  name,
                  index,
                  mutable,
                  mimeId,
                  data,
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
        <Card sx={{ m: 0 }}>
          <Droppable droppableId="drop1">
            {(provided, snapshot) => (
              <List ref={provided.innerRef} sx={{ m: 0 }}>
                {list?.[0]?.id &&
                  list.map((node, index: number) => {
                    return (
                      <Draggable
                        key={node.id}
                        draggableId={node.id}
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
                                <MimeAvatarId id={node.id} />
                              </ListItemAvatar>
                              <ListItemText primary={node.name} />
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

export default SortApp;