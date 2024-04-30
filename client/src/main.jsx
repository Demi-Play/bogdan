import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import './App.css'
import Provider from "./components/provider/Provider";
import ProductComponent from "./components/data/ProductComponent";
import ProductForm from "./components/data/ProductForm";
import CategoryForm from "./components/data/CategoryForm";
import ProductEdit from "./components/data/ProductEdit";
import Navigation from "./components/UI/Nav";
import MyBuys from "./components/data/MyBuys";
import Dashboard from "./components/UI/Dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider />,
  },
  {
    path: "/:user/products",
    element:
      <>
        <Navigation />
        <ProductComponent />
      </>,
  },
  {
    path: "/:user/product/post",
    element:
      <>
        <Navigation />
        <ProductForm />
      </>,
  },
  {
    path: "/:user/category/post",
    element:
      <>
        <Navigation />
        <CategoryForm />
      </>,
  },
  {
    path: "/:user/product/edit/:id",
    element:
      <>
        <Navigation />
        <ProductEdit />
      </>,
  },
  {
    path: '/:user/dashboard',
    element: <Dashboard />
  },
  {
    path: '/:user/mybuys',
    element: <MyBuys />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);