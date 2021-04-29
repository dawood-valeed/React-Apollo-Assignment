import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import thunk from "redux-thunk";
import { ApolloProvider } from "@apollo/client";
import { configureStore } from "@reduxjs/toolkit";
import { gqlClient } from "./utils/graphqlClient";
import { rootReducer } from "./slices";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import "./index.css";

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={gqlClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
