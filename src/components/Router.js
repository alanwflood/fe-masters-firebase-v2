import React, { useContext } from "react";
import NavigationBar from "./Nav";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Posts from "./Posts/Posts";
import Post from "./Posts/PostPage";
import AddPost from "./Posts/AddPost";
import SignIn from "./Users/SignIn";
import SignUp from "./Users/SignUp";
import CurrentUser from "./Users/CurrentUser";
import EditUser from "./Users/EditUser";

import PostsProvider from "../providers/Posts";

import { UserContext } from "../providers/Authentication";

export const paths = {
  Posts: "/",
  AddPost: "/posts/add",
  Post: "/posts/:postId",
  Profile: "/profile",
  ProfileEdit: "/profile/edit",
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
          exact
          component={CurrentUser}
          condition={isSignedIn}
          path={paths.Profile}
          redirectPath={paths.SignIn}
        />
        <AuthorizedRoute
          component={EditUser}
          condition={isSignedIn}
          path={paths.ProfileEdit}
          redirectPath={paths.SignIn}
        />

        <Switch>
          <AuthorizedRoute
            component={AddPost}
            condition={isSignedIn}
            path={paths.AddPost}
            redirectPath={paths.SignIn}
          />
          <PostsProvider>
            <Route path={paths.Posts} exact component={Posts} />
            <Route path={paths.Post} component={Post} />
          </PostsProvider>
        </Switch>
      </main>
    </Router>
  );
}
