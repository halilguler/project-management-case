/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "react-bootstrap/Card";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdBugReport, MdDelete, MdEdit, MdTask } from "react-icons/md";
import "./style.css";
import { useAppDispatch } from "../../../../utils/reduxHooks";
import { deleteTask, getTask } from "../../../../features/ColumnSlice";
import { setModal } from "../../../../features/ModalSlice";
import { TaskTypeEnum, TasksType } from "../../../../types/types";

type PMCardTaskProps = {
  task: TasksType;
  columnId: string;
  children?: React.ReactNode;
  provider?: any;
};

const PMCardTask = (props: PMCardTaskProps) => {
  const { columnId, task, provider, children } = props;
  const dispatch = useAppDispatch();
  return (
    <Card className="d-flex card_task">
      <Card.Header
        className={`d-flex align-items-center justify-content-between p-2 card_task_header ${
          task.taskType === TaskTypeEnum.TASK ? "bg-primary" : "bg-danger"
        }`}
      >
        <Card.Title
          className={
            "d-flex align-items-center justify-content-between card_task_title mb-0"
          }
          {...provider.dragHandleProps}
        >
          <Row>
            <span className="text-white">{task.content}</span>
          </Row>
          <Row className="m-0 gap-2">
            <Col
              className="p-0"
              onClick={() => {
                dispatch(getTask({ taskId: task.id }));
                dispatch(setModal(true));
              }}
            >
              <MdEdit className="text-white" />
            </Col>
            <Col
              className="p-0"
              onClick={() =>
                dispatch(
                  deleteTask({
                    columnId,
                    taskId: task.id,
                  })
                )
              }
            >
              <MdDelete className="text-white" />
            </Col>
          </Row>
        </Card.Title>
      </Card.Header>
      <Card.Body className="card_task_body">{children}</Card.Body>
      <Card.Footer className="card_task_footer">
        <Row className="w-100 d-flex justify-content-start align-items-center m-0">
          <Col>
            {task?.taskType === TaskTypeEnum.TASK ? (
              <MdTask className="text-primary" />
            ) : (
              <MdBugReport className="text-danger" />
            )}
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default PMCardTask;
