import React, { useState } from "react";
import { firestore } from "../firebase";

export default function AddPost() {
  const [postFormFields, setPostFormFields] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPostFormFields({ ...postFormFields, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { title, content } = postFormFields;
    const post = {
      title,
      content,
      user: {
        uid: "1111",
        displayName: "Steve Kinney",
        email: "steve@mailinator.com",
        photoURL: "http://placekitten.com/g/200/200"
      },
      stars: 0,
      comments: 0,
      createdAt: new Date()
    };
    firestore.collection("posts").add(post);
    setPostFormFields({ title: "", content: "" });
  }

  return (
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
