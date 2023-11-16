import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FoodPage, { Loader as foodLoader } from "./pages/Food";
import RootLayout from "./pages/Root";
import FoodItemPage from "./pages/FoodItem";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/food", element: <FoodPage /> },
      { path: "/foodItems", element: <FoodItemPage /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
