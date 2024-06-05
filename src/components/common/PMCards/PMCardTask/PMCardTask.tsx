/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "react-bootstrap/Card";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import "./style.css";
import { useAppDispatch } from "../../../../utils/reduxHooks";
import { deleteTask, getTask } from "../../../../features/ColumnSlice";
import { setModal } from "../../../../features/ModalSlice";

type PMCardTaskProps = {
  id: string;
  name: string;
  columnId: string;
  children?: React.ReactNode;
  provider?: any;
};

const PMCardTask = (props: PMCardTaskProps) => {
  const { id, columnId, name, provider, children } = props;
  const dispatch = useAppDispatch();
  return (
    <Card className="d-flex card_task">
      <Card.Header
        className={
          "d-flex align-items-center justify-content-between p-2 bg-white card_task_header "
        }
      >
        <Card.Title
          className={
            "d-flex align-items-center justify-content-between card_task_title mb-0"
          }
          {...provider.dragHandleProps}
        >
          <Row>
            <span>{name}</span>
          </Row>
          <Row style={{ margin: 0, gap: "0.5rem" }}>
            <Col
              style={{ padding: "0" }}
              onClick={() => {
                dispatch(getTask({ taskId: id }));
                dispatch(setModal());
              }}
            >
              <MdEdit />
            </Col>
            <Col
              style={{ padding: "0" }}
              onClick={() =>
                dispatch(
                  deleteTask({
                    columnId,
                    taskId: id,
                  })
                )
              }
            >
              <MdDelete />
            </Col>
          </Row>
        </Card.Title>
      </Card.Header>
      <Card.Body className="card_task_body">{children}</Card.Body>
    </Card>
  );
};

export default PMCardTask;
