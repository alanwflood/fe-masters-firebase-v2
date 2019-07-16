import React, { useContext } from "react";
import NavigationBar from "./Nav";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Posts from "./Posts";
import AddPost from "./AddPost";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CurrentUser from "./CurrentUser";
import { UserContext } from "../providers/Authentication";

export const paths = {
  Posts: "/",
  AddPost: "/posts/add",
  Profile: "/profile",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  SignOut: "/sign-out"
};

function AuthorizedRoute({
  condition,
  redirectPath,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        condition ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default function ThinkPieceRouter() {
  const { isSignedIn } = useContext(UserContext);
  return (
    <Router>
      <NavigationBar />
      <main className="Application">
        <Route path={paths.Posts} exact component={Posts} />
        <AuthorizedRoute
          component={SignIn}
          condition={!isSignedIn}
          path={paths.SignIn}
          redirectPath={paths.Profile}
        />
        <AuthorizedRoute
          component={SignUp}
          condition={!isSignedIn}
          path={paths.SignUp}
          redirectPath={paths.Proile}
        />
        <AuthorizedRoute
          component={AddPost}
          condition={isSignedIn}
          path={paths.AddPost}
          redirectPath={paths.SignIn}
        />
        <AuthorizedRoute
          component={CurrentUser}
          condition={isSignedIn}
          path={paths.Profile}
          redirectPath={paths.SignIn}
        />
      </main>
    </Router>
  );
}
