import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/checkout");
  };

  return (
    <div>
      <h2>Sign In</h2>

      {isLoggedIn ? (
        <>
          <p>You are signed in.</p>

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
    </div>
  );
}
