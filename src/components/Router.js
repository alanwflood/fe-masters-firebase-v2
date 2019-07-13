import React from "react";
import NavigationBar from "./Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Posts from "./Posts";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export const paths = {
  Posts: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  SignOut: "/sign-out"
};

export default function ThinkPieceRouter() {
  return (
    <Router>
      <NavigationBar />
      <main className="Application">
        <Route path="/" exact component={Posts} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
      </main>
    </Router>
  );
}
