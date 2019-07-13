import React from "react";
import NavigationBar from "./Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Posts from "./Posts";
import AddPost from "./AddPost";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CurrentUser from "./CurrentUser";

export const paths = {
  Posts: "/",
  AddPost: "/posts/add",
  Profile: "/profile",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  SignOut: "/sign-out"
};

export default function ThinkPieceRouter() {
  return (
    <Router>
      <NavigationBar />
      <main className="Application">
        <Route path={paths.Posts} exact component={Posts} />
        <Route path={paths.AddPost} component={AddPost} />
        <Route path={paths.SignIn} component={SignIn} />
        <Route path={paths.SignUp} component={SignUp} />
        <Route path={paths.Profile} component={CurrentUser} />
      </main>
    </Router>
  );
}
