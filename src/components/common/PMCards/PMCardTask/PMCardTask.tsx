/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "react-bootstrap/Card";
import React from "react";
import { Row } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import PMButton from "../../PMButton/PMButton";
import "./style.css";
import { useAppDispatch } from "../../../../utils/reduxHooks";
import { deleteTask } from "../../../../features/ColumnSlice";

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
        className={`d-flex align-items-center justify-content-between p-2 bg-white card_task_header `}
      >
        <Card.Title
          className={`d-flex align-items-center justify-content-between card_task_title`}
          {...provider.dragHandleProps}
        >
          <Row>
            <span>{name}</span>
          </Row>
          <Row>
            {
              <PMButton
                variant="link"
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
              </PMButton>
            }
          </Row>
        </Card.Title>
      </Card.Header>
      <Card.Body className="card_task_body">{children}</Card.Body>
    </Card>
  );
};

export default PMCardTask;
