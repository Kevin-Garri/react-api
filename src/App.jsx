import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const initialFormData = {
    id: "",
    titolo: "",
    didascalia: "",
    immagini: "",
    tags: []
  };
  //variabile a cui assegni come valore import env (leggo il dato da .env)
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialFormData)

  //fetch
  const fetchPosts = () => {
    console.log(baseApiUrl);

    axios
      .get(`${baseApiUrl}/posts`)
      .then((res) => {
        console.log(res);

        setPosts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(",").map((tag) => tag.trim());
    const newPost = { ...formData, tags: tags };
    axios
      .post(`${baseApiUrl}/posts`, newPost)
      .then((res) => {
        fetchPosts();
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const deleteHandler = (id) => {
    axios
      .delete(`${baseApiUrl}/posts/${id}`)
      .then(() => {
        fetchPosts();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const imgErrHand = (e) => {
    e.target.src = "https://picsum.photos/id/237/50/50";
  };

  //use effect di fetch post
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <div className="container">
        <h1>Elenco Post</h1>
        <div className="row">
          <div className="container mt-4">
            <h3>Inserisci Post</h3>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="title" className="form-control">
                  Titolo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={inputHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-control">
                  Didascalia...
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={inputHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-control">
                  Link Foto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={inputHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-control">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={inputHandler}
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Vai!
              </button>
            </form>
          </div>
          <div className="container my-4">
            {posts.map((post) => (
              <div className="card" key={post.id}>
                <img
                  src={post.image}
                  className="card-img-top"
                  alt={post.title}
                  onError={imgErrHand}
                ></img>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                  <p className="card-text">Tags:{post.tags.join(",")}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(post.id)}
                  >
                    Elimina Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;