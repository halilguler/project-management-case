import Navbar from "react-bootstrap/Navbar";

const PMHeader = () => {
  return (
    <Navbar
      className="d-flex justify-content-center"
      bg="light"
      expand="lg"
      fixed="top"
    >
      <Navbar.Brand href="#home">Project Management</Navbar.Brand>
    </Navbar>
  );
};

export default PMHeader;
