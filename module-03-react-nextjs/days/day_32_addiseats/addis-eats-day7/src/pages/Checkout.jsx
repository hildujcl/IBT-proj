import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div>
      <h2>Checkout</h2>

      <p>You are ready to complete your order.</p>
    </div>
  );
}
