import React from "react";
import { Link } from "react-router-dom";
import { paths } from "./Router";

export default function NavigationBar({ isSignedIn }) {
  return (
    <nav>
      <h1>Think Piece</h1>
      <ul>
        <li>
          <Link to={paths.Posts}>Posts</Link>
        </li>
        <li>
          <Link to={paths.SignUp}>Sign In</Link>
        </li>
        <li>
          <Link to={paths.SignIn}>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}
