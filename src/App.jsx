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

  return
};

export default App;