import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { paths } from "../Router";
import Post from "./Post";
import { UserContext } from "../../providers/Authentication";
import { PostsContext } from "../../providers/Posts";

export default function Posts() {
  const Posts = useContext(PostsContext);
  const User = useContext(UserContext);

  return (
    <section className="Posts">
      <div className="AddPostLink">
        {User.isSignedIn ? (
          <Link to={paths.AddPost}>Add New Post</Link>
        ) : (
          <Link to={paths.SignIn}>Sign In to Create a New Post!</Link>
        )}
      </div>
      {Posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
}
