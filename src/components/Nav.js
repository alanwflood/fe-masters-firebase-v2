import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";

import { paths } from "./Router";
import UserContext from "../context/UserContext";

export default function NavigationBar() {
  const User = useContext(UserContext);

  return (
    <nav>
      <h1>Think Piece</h1>
      <ul>
        <li>
          <NavLink exact activeClassName="active" to={paths.Posts}>
            Posts
          </NavLink>
        </li>
        {User.isSignedIn ? (
          <li>
            <NavLink activeClassName="active" to={paths.Profile}>
              Profile
            </NavLink>
          </li>
        ) : (
          <Fragment>
            <li>
              <NavLink activeClassName="active" to={paths.SignIn}>
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to={paths.SignUp}>
                Sign Up
              </NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}
