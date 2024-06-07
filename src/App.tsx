import React from "react";

import PMHeader from "./components/common/PMHeader";
import Home from "./pages/Home";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PMHeader />
        <Home />
      </PersistGate>
    </Provider>
  );
};

export default App;
