import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { isLoggedIn, login, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/checkout";

  const handleLogin = () => {
    login();
    navigate(from, { replace: true });
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>

        {isLoggedIn ? (
          <>
            <p>You are signed in.</p>

            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <p>Sign in to continue to checkout.</p>

            <button onClick={handleLogin}>Sign In</button>
          </>
        )}
      </div>
    </div>
  );
}
