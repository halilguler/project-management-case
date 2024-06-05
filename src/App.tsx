import React from "react";

import PMHeader from "./components/common/PMHeader/PMHeader";
import Home from "./pages/Home/Home";
import { store } from "./store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PMHeader />
      <Home />
    </Provider>
  );
};

export default App;
