import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { auth } from "../firebase";
import { createUserProfileDocument } from "../firebase/user";
import UserContext from "../context/UserContext";

export default function Authentication({ children }) {
  const [user, setUser] = useState({ loading: true, isSignedIn: false });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      const userLoggedIn = !isEmpty(user);
      setUser({ loading: false, isSignedIn: userLoggedIn, ...user });
    });
    return () => unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={user}>
      {user.loading ? null : children}
    </UserContext.Provider>
  );
}
