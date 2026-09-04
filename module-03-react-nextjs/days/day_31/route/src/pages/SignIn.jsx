import { useLocation, useNavigate } from "react-router-dom";

function SignIn({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleSignIn() {
    setIsLoggedIn(true);

    ```
navigate(from, { replace: true });
```;
  }

  return (
    <section>
      {" "}
      <h2>Sign In</h2>
      <p>Please sign in to continue to checkout.</p>
      <button onClick={handleSignIn}>Sign In</button>
    </section>
  );
}

export default SignIn;
