import React from "react";
import { Provider } from "react-redux";
import { storeApp } from "./store";
import MainRouter from "../common/mainRouter";

const ProviderApp = () => {
  return (
    <Provider store={storeApp}>
      <MainRouter />
    </Provider>
  );
};

export default ProviderApp;
