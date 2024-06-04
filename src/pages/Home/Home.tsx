/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PMCard from "../../components/common/PMCard/PMCard";
import PMButton from "../../components/common/PMButton/PMButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Home = () => {
  const [columns, setColumns] = React.useState<any>([
    {
      id: "1",
      title: "TO DO",
      tasks: [
        {
          id: "1",
          content: "Task 1",
        },
        {
          id: "2",
          content: "Task 2",
        },
      ],
    },
    {
      id: "2",
      title: "IN PROGRESS",
      tasks: [
        {
          id: "3",
          content: "Task 3",
        },
      ],
    },
    {
      id: "3",
      title: "DONE",
      tasks: [
        {
          id: "4",
          content: "Task 4",
        },
      ],
    },
  ]);

  const onTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newColumns = columns.map((column: any) => {
      if (column.id === id.toString()) {
        return {
          ...column,
          title: e.target.value,
        };
      }
      return column;
    });
    setColumns(newColumns);
  };

  const addColumn = () => {
    const newColumn = {
      id: (columns.length + 1).toString(),
      title: "New Column",
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (id: number) => {
    const newColumns = columns.filter(
      (column: any) => column.id !== id.toString()
    );
    setColumns(newColumns);
  };

  const reorderDragAndDrop = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newColumns = reorder(
      columns,
      result.source.index,
      result.destination.index
    );
    setColumns(newColumns);
  };

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <Container
      fluid
      className="vw-100 vh-100 flex-column overflow-auto"
      style={{
        marginTop: "75px",
      }}
    >
      <DragDropContext onDragEnd={reorderDragAndDrop}>
        <Row
          className="d-flex gx-2 bg-white"
          style={{
            width: "max-content",
          }}
        >
          <Droppable droppableId={"all-columns"} direction="horizontal">
            {(provider) => (
              <Row {...provider.droppableProps} ref={provider.innerRef}>
                {columns.map((column: any, index: number) => (
                  <Col key={column.id}>
                    <PMCard
                      name={column.title}
                      tasks={column.tasks}
                      id={+column.id}
                      index={index}
                      onClick={() => {}}
                      onTitleChange={onTitleChange}
                      deleteColumn={deleteColumn}
                    />
                  </Col>
                ))}
                {provider.placeholder}
              </Row>
            )}
          </Droppable>
          <Col>
            <PMButton variant="primary" onClick={addColumn}>
              Add Column
            </PMButton>
          </Col>
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default Home;
