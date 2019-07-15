import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { firestore, auth } from "../firebase";

export default function AddPost() {
  const [postFormFields, setPostFormFields] = useState({
    title: "",
    content: ""
  });
  const [postCreated, setPostCreated] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setPostFormFields({ ...postFormFields, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { title, content } = postFormFields;
    const { uid, displayName, email, photoURL } = auth.currentUser;

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL
      },
      stars: 0,
      comments: 0,
      createdAt: new Date()
    };

    firestore.collection("posts").add(post);
    setPostFormFields({ title: "", content: "" });
    setPostCreated(true);
  }

  return postCreated ? (
    <Redirect to="/" />
  ) : (
    <form onSubmit={handleSubmit} className="AddPost">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={postFormFields.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Body"
        value={setPostFormFields.content}
        onChange={handleChange}
      />
      <input className="create" type="submit" value="Create Post" />
    </form>
  );
}
