import React from "react";
import { Footer, Header } from "./components";
import "./MainLayout.scss";

export const MainLayout = ({ children }) => {
  return (
    <div id="MainLayout">
      <Header />
      <main>{children}</main>
    </div>
  );
};
