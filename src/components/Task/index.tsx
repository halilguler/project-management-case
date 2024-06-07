import { Draggable } from "react-beautiful-dnd";
import { Container } from "react-bootstrap";
import PMCardTask from "../common/PMCards/PMCardTask";
import { TasksType } from "../../types/types";

const Task = ({
  columnId,
  task,
  index,
}: {
  columnId: string;
  task: TasksType;
  index: number;
}) => {
  return (
    <Draggable draggableId={task?.id || ""} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <PMCardTask columnId={columnId} task={task} provider={provided}>
            {task?.description}
          </PMCardTask>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
