import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../Task";
import { ColumnsType, DroppableEnum, TasksType } from "../../types/types";
import PMCardColumn from "../common/PMCards/PMCardColumn";

const Column = ({ tasks, column, index }: ColumnsType) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provider) => (
        <div
          ref={provider.innerRef}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          <PMCardColumn
            id={column.id}
            column={column}
            name={column.title}
            tasks={tasks}
            provider={provider}
          >
            <Droppable droppableId={column.id} type={DroppableEnum.TASK}>
              {(provider) => (
                <div ref={provider.innerRef} {...provider.droppableProps}>
                  {tasks.map((task: TasksType, index: number) => (
                    <Task
                      key={task.id}
                      columnId={column.id}
                      task={task}
                      index={index}
                    />
                  ))}
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </PMCardColumn>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
