import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { store } from "./features/store/store.js";
import { Provider } from "react-redux";

import Layout from "./Components/Layout.jsx";
import * as Components from "./Components/import-components.js";
import * as Pages from "./pages/import-pages.jsx";
import Protected from "./Components/Protected.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Protected authentication={false}><Pages.Home /></Protected>} />
      <Route path="signup" element={<Protected authentication={false}><Components.Signup /></Protected>} />
      <Route path="login" element={<Protected authentication={false}><Components.Login /></Protected>} />
      <Route path="list-property" element={<Protected authentication={true}><Pages.ListProperty /></Protected>} />
      <Route path="/properties" element={<Protected authentication={true}><Components.Properties /></Protected>} />
      <Route path="/properties/:slug" element={<Protected authentication={true}><Components.Property /></Protected>} />
      <Route path="/edit-property/:slug" element={<Protected authentication={true}><Pages.EditProperty /></Protected>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
