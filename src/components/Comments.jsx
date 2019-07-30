import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Comments = ({ comments, postId }) => {
  return (
    <section className="Comments">
      <AddComment postId={postId} />
      {comments.map(comment => (
        <Comment {...comment} key={comment.id} />
      ))}
    </section>
  );
};

export default Comments;
