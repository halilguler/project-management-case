import Card from "react-bootstrap/Card";
import React from "react";
import { Row } from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { DraggableProvided, Droppable } from "react-beautiful-dnd";
import PMTextField from "../../PMTextField";
import PMButton from "../../PMButton";
import { ColumnType, DroppableEnum, TasksType } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../utils/reduxHooks";
import {
  deleteColumn,
  onTitleChange,
  setColumnId,
  setEditId,
} from "../../../../features/homeSlice";
import "./style.css";
import { setModal } from "../../../../features/modalSlice";
import Task from "../../../Task";

type PMCardProps = {
  id: string;
  column: ColumnType;
  tasks: TasksType[];
  name: string;
  children?: React.ReactNode;
  provider?: DraggableProvided;
};

const PMCardColumn = (props: PMCardProps) => {
  const { id, column, name, tasks, provider } = props;
  const dispatch = useAppDispatch();
  const { editId } = useAppSelector((state) => state.homeSlice);

  const removeEditId = () => {
    dispatch(
      setEditId({
        id: "",
      })
    );
  };

  return (
    <Card className="card_main">
      <Card.Header className={`p-2 bg-warning bg-gradient card_column_header`}>
        <Card.Title
          className={`d-flex align-items-center justify-content-between h6 `}
          {...provider?.dragHandleProps}
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
                <MdDelete className="text-danger" />
              </PMButton>
            )}
          </Row>
        </Card.Title>
      </Card.Header>
      <Droppable droppableId={column.id} type={DroppableEnum.TASK}>
        {(provider) => (
          <Card.Body ref={provider.innerRef} {...provider.droppableProps}>
            <div>
              {tasks.map((task: TasksType, index: number) => (
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
      <Card.Footer
        className="d-flex justify-content-center bg-warning card_column_footer"
        onClick={() => {
          dispatch(setColumnId({ id }));
          dispatch(setModal(true));
        }}
      >
        <MdAddCircleOutline className="text-success" />
      </Card.Footer>
    </Card>
  );
};

export default PMCardColumn;
