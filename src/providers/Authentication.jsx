import React, { useEffect, useState, createContext } from "react";
import isEmpty from "lodash/isEmpty";
import { auth } from "../firebase";
import {
  createUserProfileDocument,
  getUserProfileDocument
} from "../firebase/user";

export const UserContext = createContext({});

export default function Authentication({ children }) {
  const [user, setUser] = useState({
    loading: true,
    isSignedIn: false
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      const userLoggedIn = !isEmpty(user);

      if (userLoggedIn) {
        const userRef = await getUserProfileDocument(user.uid);
        userRef.onSnapshot(snapshot => {
          setUser({
            loading: false,
            isSignedIn: userLoggedIn,
            uid: user.uid,
            ...snapshot.data()
          });
        });
      } else {
        setUser({ loading: false, ...user });
      }
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      {user.loading ? null : children}
    </UserContext.Provider>
  );
}
