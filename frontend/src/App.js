import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// CSs
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import "./styles/App.css";
import "./styles/Responsive.css";
import "react-toastify/dist/ReactToastify.css";

// Routes
import Home from "./components/Home";
import Registers from "./components/Registers";
import Searchs from "./components/Searchs";
import NavBar from "./components/NavBar";
import Error404 from "./components/Error404";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div id="app">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Registers} />
          <Route exact path="/search" component={Searchs} />
          <Route component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
