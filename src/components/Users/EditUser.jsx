import React, { useState, useContext } from "react";

import { firestore } from "../../firebase";
import { UserContext } from "../../providers/Authentication";

export default function EditUser() {
  const User = useContext(UserContext);
  const userRef = firestore.doc(`users/${User.uid}`);

  const defaultUserFormFields = { displayName: "", photoURL: "" };
  const [userFormFields, setUserFormFields] = useState(defaultUserFormFields);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserFormFields({ ...userFormFields, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { displayName, photoURL } = userFormFields;

    const isDisplayNameValid =
      displayName !== "" && displayName !== User.displayName;

    if (isDisplayNameValid) {
      userRef.update({ displayName });
    }

    setUserFormFields(defaultUserFormFields);
  }

  return (
    <form className="SignIn" onSubmit={handleSubmit}>
      <h2>Update User</h2>
      <input
        type="file"
        name="photoURL"
        value={userFormFields.photoURL}
        onChange={handleChange}
      />
      <input
        type="text"
        name="displayName"
        placeholder="Name"
        value={userFormFields.displayName}
        onChange={handleChange}
      />
      <input type="submit" value="Sign In" />
    </form>
  );
}
