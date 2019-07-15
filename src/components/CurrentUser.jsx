import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { paths } from "./Router";

import UserContext from "../context/UserContext";
import { auth } from "../firebase";
import { distanceInWordsToNow } from "date-fns";

const CurrentUser = () => {
  const User = useContext(UserContext);

  if (!User) {
    return <Redirect to={paths.SignIn} />;
  }

  const { displayName, photoURL, email, createdAt, children } = User;

  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="CurrentUser--information">
          <h2>{displayName}</h2>
          <p className="email">{email}</p>
          <p className="created-at">
            Joined: {distanceInWordsToNow(createdAt)} ago
          </p>
        </div>
      </div>
      <div>
        <div>{children}</div>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    </section>
  );
};

CurrentUser.defaultProps = {
  displayName: "Bill Murray",
  email: "billmurray@mailinator.com",
  photoURL: "https://www.fillmurray.com/300/300",
  createdAt: new Date()
};

export default CurrentUser;
