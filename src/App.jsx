import React from "react";
import { Navbar } from "./components/Navbar";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { routes } from "./routes";

export const App = () => {
  const element = useRoutes(routes);
  return (
    <div>
      <Navbar />
      {element}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}