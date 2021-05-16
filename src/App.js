import React from "react";

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
import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";
import { useImmerReducer } from "use-immer";

function App() {

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexapp-token")),
    flashMessages: [],
  };

  const myReducer = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        break;
      case "logout":
        draft.loggedIn = false;
        break;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        break;
      default:
        return draft;
    }
  };

  const [state, dispatch] = useImmerReducer(myReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessage />
          <Header />
          <Switch>
            <Route path="/" exact component={state.loggedIn ? HomeUser : HomeGuest} />
            <Route path="/about-us" exact component={About} />
            <Route path="/terms" exact component={Terms} />
            <Route path="/post/:id" component={SinglePost} />
            <Route path="/create-post" exact>
              <CreatePost />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter >
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
