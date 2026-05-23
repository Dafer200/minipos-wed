import { useState } from "react";
import "./App.css";
import CustomersPage from "./pages/CustomersPage";
import DepartmentPage from "./pages/DepartmentPage";
import StudentsPage from "./pages/StudentsPage";
import MainLayout from "./layouts/MainLayout";
import SidebarMenu from "./components/SidebarMenu";
import AboutPage from "./pages/About";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState("customers");

  function renderContent() {
    switch (page) {
      case "customers":
        return <CustomersPage />;
      case "departments":
        return <DepartmentPage />;
      case "students":
        return <StudentsPage />;
      case "dashboard":
        return <DashboardPage />;
      case "about":
        return <AboutPage />;
      default:
        return <CustomersPage />;
    }
  }
  // El return es obligatorio para que main.tsx no marque error
  const sidebar = (
    <div>
      <SidebarMenu
        current={page}
        onChange={setPage}
      />
      <div className="mt-6 border-t pt-4">
        <p className="text-xs text-gray-500 mb-2">
          Hola, {user?.username}
        </p>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
  return (
    <PrivateRoute
      fallback={<LoginPage onSuccess={() => {}} />}
    >
      <MainLayout
        sidebar={sidebar}
        content={renderContent()}
      />
    </PrivateRoute>
  );
}

export default App;
