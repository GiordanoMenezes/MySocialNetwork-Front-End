import React, { useState } from "react";

//My components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeGuest from "./components/HomeGuest";
import About from "./components/About";
import Terms from "./components/Terms";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeUser from "./components/HomeUser";
import CreatePost from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import FlashMessage from "./components/FlashMessages";

function App() {

  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexapp-token")));
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages(prev => prev.concat(message));
  }

  return (
    <BrowserRouter>
      <FlashMessage messages={messages} />
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact component={loggedIn ? HomeUser : HomeGuest} />
        <Route path="/about-us" exact component={About} />
        <Route path="/terms" exact component={Terms} />
        <Route path="/post/:id" component={SinglePost} />
        <Route path="/create-post" exact>
          <CreatePost addMessage={addMessage} />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
