import { useState, useEffect } from "react";
import axios from ('axios');

function App() {

  const initialFormData = {
    id: "",
    titolo: "",
    didascalia: "",
    immagini: "",
    tags: []
  };
  //variabile a cui assegni come valore import env (leggo il dato da .env)
  const baseApiUrl = import.meta.VITE_BASE_API_URL;

  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState(initialFormData)

  const fetchPosts = () =>
    axios.get(`${baseApiUrl}/posts`).then((res) => setPosts(res.data));

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const submitHandler = (e) => {
    e.preventDefault;
    const tags = formData.tags.split(",").map((tag) => tag.trim());
    const newPost = { ...formData, tags: tags };
    axios.post(`${baseApiUrl}/posts`, newPost)
      .then(res => {
        fetchPosts()
        setFormData(initialFormData)
      })
  }

  //use effect di fetch post
  useEffect(() => {
    fetchPosts()
  }, [])

  return
}

export default App;