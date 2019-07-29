import React, { useState, useContext, useRef } from "react";

import { Redirect } from "react-router-dom";
import { firestore, storage } from "../../firebase";
import { UserContext } from "../../providers/Authentication";

export default function EditUser() {
  const imageInputRef = useRef(null);

  const User = useContext(UserContext);
  const userRef = firestore.doc(`users/${User.uid}`);

  const defaultUserFormFields = { displayName: "", photoURL: "" };
  const [userFormFields, setUserFormFields] = useState(defaultUserFormFields);
  const [userUpdated, setUserUpdated] = useState(false);

  async function updatePhotoURL() {
    debugger;
    const input = imageInputRef.current;
    if (input) {
      const imageFile = input.files[0];
      storage
        .ref()
        .child("user-profiles")
        .child(User.uid)
        .child(imageFile.name)
        .put(imageFile)
        .then(response => response.ref.getDownloadURL())
        .then(newPhotoURL => userRef.update({ photoURL: newPhotoURL }))
        .catch(error => console.error(error));
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUserFormFields({ ...userFormFields, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { displayName, photoURL } = userFormFields;

    const isDisplayNameValid =
      displayName !== "" && displayName !== User.displayName;
    if (isDisplayNameValid) {
      await userRef.update({ displayName });
    }

    const isPhotoURLValid = photoURL !== "";
    if (isPhotoURLValid) {
      await updatePhotoURL();
    }

    setUserFormFields(defaultUserFormFields);
    setUserUpdated(true);
  }

  return (
    <form className="SignIn" onSubmit={handleSubmit}>
      {userUpdated ? <Redirect to="/profile" /> : null}
      <h2>
        Update {User.displayName}
        's profile
      </h2>
      <input
        type="file"
        name="photoURL"
        ref={imageInputRef}
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
      <input type="submit" value="Update" />
    </form>
  );
}
