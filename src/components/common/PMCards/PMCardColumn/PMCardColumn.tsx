/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "react-bootstrap/Card";
import React from "react";
import { Row } from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Droppable } from "react-beautiful-dnd";
import PMTextField from "../../PMTextField/PMTextField";
import PMButton from "../../PMButton/PMButton";
import { ColumnType, DroppableEnum, TasksType } from "../../../../types/types";
import Task from "../../../Task/Task";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import {
  deleteColumn,
  onTitleChange,
  setEditId,
} from "../../../../features/ColumnSlice";
import TaskForm from "../../../Task/TaskForm/TaskForm";
import { setModal } from "../../../../features/ModalSlice";

type PMCardProps = {
  id: string;
  column: ColumnType;
  tasks: TasksType[];
  name: string;
  children?: React.ReactNode;
  provider?: any;
};

const PMCardColumn = (props: PMCardProps) => {
  const { id, column, name, tasks, provider } = props;
  const dispatch = useAppDispatch();
  const { editId } = useAppSelector((state) => state.columnSlice);

  const removeEditId = () => {
    dispatch(
      setEditId({
        id: "",
      })
    );
  };

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Header
        className={`p-2 bg-white`}
        style={{
          maxHeight: "50px",
        }}
      >
        <Card.Title
          className={`d-flex align-items-center justify-content-between h6 `}
          {...provider.dragHandleProps}
        >
          <Row className="w-100">
            {editId === "" || editId !== id.toString() ? (
              <span
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    setEditId({
                      id,
                    })
                  )
                }
              >
                {name}
              </span>
            ) : (
              <PMTextField
                name="ColumnTitle"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(onTitleChange({ id, value: e.target.value }));
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    removeEditId();
                  }
                }}
                onBlur={() => removeEditId()}
                type="text"
                controlId="ColumnTitle"
                as={Card.Title}
              />
            )}
          </Row>
          <Row>
            {(editId === "" || editId !== id.toString()) && (
              <PMButton
                variant="link"
                onClick={() => dispatch(deleteColumn(id))}
              >
                <MdDelete />
              </PMButton>
            )}
          </Row>
        </Card.Title>
      </Card.Header>
      <Droppable droppableId={column.id} type={DroppableEnum.TASK}>
        {(provider) => (
          <Card.Body ref={provider.innerRef} {...provider.droppableProps}>
            <div>
              {tasks.map((task: any, index: any) => (
                <Task
                  columnId={column.id}
                  key={task.id}
                  task={task}
                  index={index}
                />
              ))}
              {provider.placeholder}
            </div>
          </Card.Body>
        )}
      </Droppable>
      <Card.Footer className="d-flex justify-content-center bg-white">
        <PMButton
          variant="light"
          onClick={() => {
            dispatch(setModal());
          }}
        >
          <MdAddCircleOutline />
        </PMButton>
      </Card.Footer>
      <TaskForm columnId={id} />
    </Card>
  );
};

export default PMCardColumn;
