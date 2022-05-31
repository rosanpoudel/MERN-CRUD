import Header from "./components/header";
import { useEffect } from "react";
import Spinner from "./components/Spinner";
import PostsContent from "./components/PostsContent";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "./redux/actions/authActions";
import LocalDB from "./helpers/localStorage";
import CustomizedSnackbars from "./components/Snackbar";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const { isFetchingPosts } = useSelector((state) => state.allPosts);
  const snackbarData = useSelector((state) => state?.snackbar?.data);

  useEffect(() => {
    if (LocalDB.getToken()?.length > 0) {
      dispatch(setLoginStatus(true));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Header isLoggedIn={isLoggedIn} />}

        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </>
          ) : (
            <Route
              path="/posts"
              element={<PostsContent isLoggedIn={isLoggedIn} />}
            />
          )}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/posts" : "/login"} />}
          />
        </Routes>
      </Router>

      {isFetchingPosts && <Spinner />}
      {Object.keys(snackbarData).length > 0 && (
        <CustomizedSnackbars snackbarData={snackbarData} />
      )}
    </div>
  );
}

export default App;
