import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import AddApplication from "./pages/AddApplication";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="applications" element={<Applications />} />

        <Route path="applications/:id" element={<ApplicationDetails />} />

        <Route path="add-application" element={<AddApplication />} />

        <Route path="signin" element={<SignIn />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
