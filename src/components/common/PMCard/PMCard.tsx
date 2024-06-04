import Card from "react-bootstrap/Card";
import PMButton from "../PMButton/PMButton";
import React, { useState } from "react";
import PMTextField from "../PMTextField/PMTextField";
import { Row } from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

type PMCardProps = {
  id: number;
  onClick?: () => void;
  deleteColumn: (id: number) => void;
  title: string;
  children?: React.ReactNode;
  titleOnChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
};

const PMCard = (props: PMCardProps) => {
  const { id, title, onClick, children, titleOnChange, deleteColumn } = props;
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Header
        className={`p-2 bg-white ${isEdit && "px-0"}`}
        style={{
          maxHeight: "50px",
        }}
      >
        <Card.Title
          className={`d-flex align-items-center justify-content-between h6 ${
            isEdit ? "p-0 m-0" : "px-2"
          }`}
        >
          <Row>
            {!isEdit ? (
              <span onClick={() => setIsEdit((prev) => !prev)}>{title}</span>
            ) : (
              <PMTextField
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  titleOnChange(e, id);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    setIsEdit(!isEdit);
                  }
                }}
                placeholder="Title"
                type="text"
                controlId="ColumnTitle"
                as={Card.Title}
              />
            )}
          </Row>
          <Row>
            {!isEdit && (
              <PMButton variant="link" onClick={() => deleteColumn(id)}>
                <MdDelete />
              </PMButton>
            )}
          </Row>
        </Card.Title>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
      <Card.Footer className="d-flex justify-content-center bg-white">
        <PMButton variant="light" onClick={() => onClick}>
          <MdAddCircleOutline />
        </PMButton>
      </Card.Footer>
    </Card>
  );
};

export default PMCard;