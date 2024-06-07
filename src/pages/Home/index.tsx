import { Container } from "react-bootstrap";
import {
  DragDropContext,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import PMButton from "../../components/common/PMButton";
import { DroppableEnum } from "../../types/types";
import Column from "../../components/Column";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import {
  addColumnAndOrder,
  moveColumn,
  moveTaskInSameColumn,
  moveTaskToDifferentColumn,
} from "../../features/homeSlice";
import TaskForm from "../../components/Task/TaskForm";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.homeSlice);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (type === DroppableEnum.COLUMN) {
      dispatch(moveColumn({ source, destination, draggableId }));
    } else {
      const start = data.columns[source.droppableId];
      const end = data.columns[destination.droppableId];

      if (start === end) {
        dispatch(moveTaskInSameColumn({ source, destination, draggableId }));
      } else {
        dispatch(
          moveTaskToDifferentColumn({ source, destination, draggableId })
        );
      }
    }
  };

  const addColumnOrder = () => {
    dispatch(addColumnAndOrder({ title: "New Column" }));
  };

  return (
    <Container
      fluid
      className="d-flex vw-100 flex-column overflow-auto"
      style={{
        marginTop: "75px",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-column"
          type={DroppableEnum.COLUMN}
          direction="horizontal"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="d-flex gx-2 bg-white w-100 gap-2 overflow-auto"
              style={{
                width: "max-content",
              }}
            >
              {data.columnOrder.map(
                (columnId: string | number, index: number) => {
                  const column = data.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId: string | number) => data.tasks[taskId]
                  );

                  return (
                    <div className="d-flex flex-column" key={column.id}>
                      <Column index={index} column={column} tasks={tasks} />
                    </div>
                  );
                }
              )}
              {provided.placeholder}
              <div className="d-flex align-items-start">
                <PMButton variant="primary" onClick={addColumnOrder}>
                  Add Column
                </PMButton>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TaskForm />
    </Container>
  );
};

export default Home;
