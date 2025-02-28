import { Route, Routes } from "react-router";
import { ROUTES } from "./routes";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import Dashboard from "@/pages/dashboard/dashboard";
import { NotFound } from "@/pages/not-found/not-found";
import ProtectedRoutes from "./ProtectedRouter";

const AppRouter = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path={ROUTES.signUp} element={<Signup />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Route */}
      <Route element={<ProtectedRoutes />}>
        {/* Dashboard */}
        <Route path={ROUTES.dashboard} element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
