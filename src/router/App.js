import React from "react";
import { Root } from "native-base";
import Router from "./Router";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import Reducers from "./Reducers";

const App = () => {
  const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Root>
      <Provider store={store}>
        <Router />
      </Provider>
    </Root>
  );
};

export default App;
