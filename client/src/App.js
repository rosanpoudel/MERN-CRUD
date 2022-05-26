import Header from "./components/header";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import PostsContent from "./components/PostsContent";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const doesTokenExists = localStorage.getItem("user");
    if (doesTokenExists?.length > 0) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/signup"
              element={<SignupForm setIsLoggedIn={setIsLoggedIn} />}
            />
          </>
        ) : (
          <Route
            path="/posts"
            element={
              <PostsContent isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
        )}

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/posts" : "/login"} />}
        />
      </Routes>

      {isLoading && <Spinner />}
    </div>
  );
}

export default App;
