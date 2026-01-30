import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import AppRouter from "./router/AppRouter";
import ReduxProvider from "./store/ReduxProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider router={AppRouter} />
    </ReduxProvider>
  </React.StrictMode>
);
