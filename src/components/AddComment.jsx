import React, { useState, useContext } from "react";
import { firestore } from "../firebase";
import { UserContext } from "../providers/Authentication";

function AddComment({ postId }) {
  const User = useContext(UserContext);
  const [commentFields, setCommentFields] = useState({ content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setCommentFields({ [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const comment = {
      content: commentFields.content,
      createdAt: new Date(),
      user: User
    };

    try {
      const postRef = firestore.doc(`posts/${postId}`);
      await postRef.collection("comments").add(comment);
    } catch (error) {
      console.error("Error creating comment:", error.message);
    }

    setCommentFields({ content: "" });
  }

  const placeholder = User.isSignedIn ? "Comment" : "Sign In To Comment";

  return (
    <form onSubmit={handleSubmit} className="AddComment">
      <input
        type="text"
        name="content"
        placeholder={placeholder}
        value={commentFields.content}
        onChange={handleChange}
      />
      <input
        className="create"
        type="submit"
        value="Create Comment"
        disabled={!User.isSignedIn}
      />
    </form>
  );
}

export default AddComment;
