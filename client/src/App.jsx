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
import SingleArticle from "./components/SingleArticle";
import SettingsPrivacy from "./pages/SettingsPrivacy";
import UpdateUser from "./pages/features/UpdateUser";
import { useSelector } from "react-redux";
import UserArticles from "./components/UserArticles";

const App = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={userData && userData._id ? <HomePage /> : <LandingPage />}
          />
          <Route path="/" element={<LandingPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/single-article/:articleId"
            element={<SingleArticle />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/account/:userId" element={<Account />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/settings-privacy/:userId"
              element={<SettingsPrivacy />}
            />
            <Route path="/update-user/" element={<UpdateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
