import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import PrivateRoute from "./components/private/PrivateRoute";
import Account from "./pages/Account";
import LandingPage from "./pages/LandingPage";
import Articles from "./pages/Articles";
import "./App.css";
import SingleArticle from "./components/SingleArticle";
import SettingsPrivacy from "./pages/SettingsPrivacy";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/single-article" element={<SingleArticle />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route
              path="/settings-privacy"
              element={<SettingsPrivacy />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
