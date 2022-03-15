import React, { useState } from "react";
import { Col } from 'antd';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "./index.less"

const DragDrop: React.FC = () => {

  // 组件列表
  const componentList = [
    {
      id: 'c1',
      content: 'c1',
      sort: 1,
      type: 'carousel',
    },
    {
      id: 'c2',
      content: 'c2',
      sort: 2,
      type: 'classification',
    },
    {
      id: 'c3',
      content: 'c3',
      sort: 4,
      type: 'picture',
    },
  ];
  // 展示列表
  const displayList = [
    {
      id: 'd1',
      content: 'd1',
      sort: 1,
      type: 'carousel',
    },
    {
      id: 'd2',
      content: 'd2',
      sort: 2,
      type: 'classification',
    },
    {
      id: 'd3',
      content: 'd3',
      sort: 3,
      type: 'carousel',
    },
  ];

  const [componentLibrary, setComponentLibrary] = useState<any>(componentList);
  const [displayComponent, setDisplayComponent] = useState<any>(displayList);

  /**
   * 拖拽结束回调
   */
  const onDragEnd = (result: any) => {
    console.log('result', result);
    const libraryList = JSON.parse(JSON.stringify(componentLibrary));
    const display = JSON.parse(JSON.stringify(displayComponent));
    const initialItem = result.source;
    const finalItem = result.destination;
    if (finalItem) {
      if (initialItem.droppableId === 'droppable1' && finalItem.droppableId === 'droppable1') {
        const moveItem = libraryList.splice(initialItem.index, 1);
        libraryList.splice(finalItem.index, 0, moveItem[0]);
        setComponentLibrary(libraryList);
      } else if (
        initialItem.droppableId === 'droppable2' &&
        finalItem.droppableId === 'droppable2'
      ) {
        const moveItem = display.splice(initialItem.index, 1);
        display.splice(finalItem.index, 0, moveItem[0]);
        setDisplayComponent(display);
      } else if (
        initialItem.droppableId === 'droppable1' &&
        finalItem.droppableId === 'droppable2'
      ) {
        const moveItem = libraryList.splice(initialItem.index, 1);
        display.splice(finalItem.index, 0, moveItem[0]);
        setComponentLibrary(libraryList);
        setDisplayComponent(display);
      } else {
        const moveItem = display.splice(initialItem.index, 1);
        libraryList.splice(finalItem.index, 0, moveItem[0]);
        setComponentLibrary(libraryList);
        setDisplayComponent(display);
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Col>
        {
          <Droppable droppableId="componentList">
            {(provided, snapshot) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    componentLibrary.map((item, index) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={styles.componentContent}
                              >
                                123
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })
                  }
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        }
      </Col>

      <Col>
        {
          <div>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => {
                return (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {displayComponent.map((item, index) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={styles.componentContent}
                              >
                                789
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        }
      </Col>

      <Col>
        789
      </Col>
    </DragDropContext>
  );
}

export default DragDrop;
