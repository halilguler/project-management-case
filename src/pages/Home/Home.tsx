import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PMCard from "../../components/common/PMCard/PMCard";
import PMButton from "../../components/common/PMButton/PMButton";

const Home = () => {
  //   const [show, setShow] = React.useState(false);

  const [columns, setColumns] = React.useState([
    {
      id: 1,
      title: "TO DO",
    },
    {
      id: 2,
      title: "IN PROGRESS",
    },
    {
      id: 3,
      title: "DONE",
    },
  ]);

  const titleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newColumns = columns.map((column) => {
      if (column.id === id) {
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
      id: columns.length + 1,
      title: "New Column",
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (id: number) => {
    const newColumns = columns.filter((column) => column.id !== id);
    setColumns(newColumns);
  };

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  return (
    <Container
      fluid
      className="vw-100 vh-100 flex-column overflow-auto"
      style={{
        marginTop: "75px",
      }}
    >
      <Row className="gx-2 bg-white" style={{
        width: "max-content",
      }}>
        {columns.map((column) => (
          <Col key={column.id}>
            <PMCard
              title={column.title}
              key={column.id}
              id={column.id}
              titleOnChange={titleOnChange}
              deleteColumn={deleteColumn}
            />
          </Col>
        ))}
        <Col>
          <PMButton variant="primary" onClick={addColumn}>
            Add Column
          </PMButton>
        </Col>
      </Row>
      {/* <PMModal
    show={show}
    handleClose={handleClose}
    handleClick={addColumn}
    modalTitle={"Add Column"}
  >
    <Form>
      <Row>
        <PMTextField
          as={Col}
          controlId={"formGridEmail"}
          label={"Email"}
          placeholder={"Email"}
          type={"email"}
          value={""}
          onChange={(e) => console.log(e.target.value)}
          required
        />
        <PMTextField
          as={Col}
          controlId={"formGridPassword"}
          label={"Password"}
          placeholder={"Password"}
          type={"password"}
          value={""}
          onChange={(e) => console.log(e.target.value)}
          required
        />
      </Row>
    </Form>
  </PMModal> */}
    </Container>
  );
};

export default Home;
