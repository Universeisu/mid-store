import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { FinancialRecordProvider } from "../contexts/financial.context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <FinancialRecordProvider>
        <MainLayout />
      </FinancialRecordProvider>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
