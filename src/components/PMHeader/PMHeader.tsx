import Navbar from "react-bootstrap/Navbar";

const PMHeader = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#home">Project Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
    </Navbar>
  );
};

export default PMHeader;
