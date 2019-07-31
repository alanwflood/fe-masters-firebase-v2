import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../../providers/Authentication";
import { firestore } from "../../firebase";

export default function AddPost() {
  const User = useContext(UserContext);
  const [postFormFields, setPostFormFields] = useState({
    title: "",
    content: ""
  });
  const [postCreated, setPostCreated] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setPostFormFields({ ...postFormFields, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { title, content } = postFormFields;
    const { uid, displayName, email, photoURL } = User;

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
      commentCount: 0,
      createdAt: new Date()
    };

    try {
      await firestore.collection("posts").add(post);
      setPostCreated(true);
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="AddPost">
      {postCreated ? <Redirect to="/" /> : null}
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
