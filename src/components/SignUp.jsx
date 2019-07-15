import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserProfileDocument } from "../firebase/user";

export default function SignUp() {
  const defaultSignUpFormFields = {
    displayName: "",
    email: "",
    password: ""
  };

  const [signUpFormFields, setSignUpFormFields] = useState(
    defaultSignUpFormFields
  );

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { email, password, displayName } = signUpFormFields;
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      createUserProfileDocument({ ...user, displayName });
    } catch (error) {
      console.error(error);
    }

    setSignUpFormFields(defaultSignUpFormFields);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setSignUpFormFields({ ...signUpFormFields, [name]: value });
  }

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={signUpFormFields.displayName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signUpFormFields.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signUpFormFields.password}
        onChange={handleChange}
        required
      />
      <input type="submit" value="Sign Up" />
    </form>
  );
}
