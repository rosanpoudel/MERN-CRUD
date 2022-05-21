import Header from "./components/header";
import BodyContent from "./components/bodyContent";
import { useState, useEffect } from "react";
import axios from "axios";
import SitePaths from "./helpers/path";

function App() {
  const [posts, setPosts] = useState([]);
  // fetch task
  const fetchPosts = () => {
    axios
      .get(`${SitePaths.BASE_PATH}/posts`)
      .then((resp) => {
        setPosts(resp.data);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="App">
      <Header />
      <BodyContent posts={posts} fetchPosts={fetchPosts} />
    </div>
  );
}

export default App;
