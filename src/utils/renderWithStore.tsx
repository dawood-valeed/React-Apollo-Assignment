import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Store, AnyAction } from "@reduxjs/toolkit";

interface WrapperProps {
  children?: React.ReactNode;
}

export const renderWithStore = (
  ui: React.ReactElement,
  store: Store<any, AnyAction>
) => {
  const Wrapper = ({ children }: WrapperProps) => (
    <Provider store={store}>{children}</Provider>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
  };
};
