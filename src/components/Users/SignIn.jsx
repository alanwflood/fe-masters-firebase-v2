import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase";

export default function SignIn() {
  const defaultSignInFormFields = { email: "", password: "" };
  const [signInFormFields, setSignInFormFields] = useState(
    defaultSignInFormFields
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setSignInFormFields({ ...signInFormFields, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = signInFormFields;
    try {
      auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }

    setSignInFormFields(defaultSignInFormFields);
  }

  async function googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="SignIn" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signInFormFields.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signInFormFields.password}
        onChange={handleChange}
      />
      <input type="submit" value="Sign In" />
      <button onClick={() => googleSignIn()}>Sign In With Google</button>
    </form>
  );
}
