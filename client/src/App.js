import Header from "./components/header";
import BodyContent from "./components/bodyContent";
import { useState, useEffect } from "react";
import axios from "axios";
import SitePaths from "./helpers/path";
import Spinner from "./components/Spinner";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch task
  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get(`${SitePaths.BASE_PATH}/posts`)
      .then((resp) => {
        setPosts(resp.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("error:", err);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="App">
      <Header />
      <BodyContent
        posts={posts}
        fetchPosts={fetchPosts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {isLoading && <Spinner />}
    </div>
  );
}

export default App;
