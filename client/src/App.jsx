import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import "./App.css";

function App() {
  const [user, setUser] = useState(0);

  const getUser = async () => {
    try {
      const url = `http://localhost:8080/api/count`;
      const { data } = await axios.get(url, {
        withCredentials: true
      });
      setUser(data.count);
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  let componentToRender;

  if (user === 0) {
    componentToRender = <Login />;
  } else if (user === 1) {
    componentToRender = <Welcome />;
  } else {
    componentToRender = <Home />;
  }

  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={componentToRender} />
      </Routes>
    </div>
  );
}

export default App;
