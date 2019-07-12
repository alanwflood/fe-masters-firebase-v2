import React, { useState, Component } from "react";
import { firestore } from "../firebase";

export default function AddPost() {
  const [postFormFields, setPostFormFields] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPostFormFields({ ...postForm, [name]: value });
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
      favorites: 0,
      comments: 0,
      createdAt: new Date()
    };
    firestore.collection("posts").add(post);
    this.setState({ title: "", content: "" });
  }

  return (
    <form onSubmit={this.handleSubmit} className="AddPost">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={this.handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Body"
        value={content}
        onChange={this.handleChange}
      />
      <input className="create" type="submit" value="Create Post" />
    </form>
  );
}
