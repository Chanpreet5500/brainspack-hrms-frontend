"use client";

import { Provider } from "react-redux";
import { makeStore } from "./store";
import { ReactNode } from "react";
interface MyComponentProps {
  children: ReactNode;
}
const ReduxProvider: React.FC<MyComponentProps> = ({ children }) => {
  return <Provider store={makeStore}>{children}</Provider>;
};
export default ReduxProvider;
