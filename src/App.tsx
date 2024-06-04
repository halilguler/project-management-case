import React from "react";

import PMHeader from "./components/PMHeader/PMHeader";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
  return (
    <>
      <PMHeader />
      <Home />
    </>
  );
};

export default App;
