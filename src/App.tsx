import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import PMButton from "./components/PMButton/PMButton";
import PMModal from "./components/PMModal/PMModal";
import PMTextField from "./components/PMTextField/PMTextField";

const App: React.FC = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className="vw-100  vh-100 d-flex flex-column">
      <Row className="my-4">
        <Col>
          <h1 className="text-center">Project Management</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3} className="mb-4">
          <div className="p-3 bg-primary text-white">Sütun 1</div>
        </Col>
        <Col xs={12} md={9} className="mb-4">
          <div className="p-3 bg-secondary text-white">Sütun 2</div>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <PMButton
            variant="primary"
            text={"Modal Göster"}
            onClick={handleShow}
          />
        </Col>
      </Row>
      <PMModal
        show={show}
        handleClose={handleClose}
        handleClick={handleClose}
        modalTitle={"Başlık"}
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
      </PMModal>
    </Container>
  );
};

export default App;
