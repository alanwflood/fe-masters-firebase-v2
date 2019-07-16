import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { paths } from "./Router";
import { firestore } from "../firebase";
import Post from "./Post";
import { UserContext } from "../providers/Authentication";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const User = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(posts);
    });
    return () => unsubscribe;
  }, []);

  return (
    <section className="Posts">
      <div className="AddPostLink">
        {User.isSignedIn ? (
          <Link to={paths.AddPost}>Add New Post</Link>
        ) : (
          <Link to={paths.SignIn}>Sign In to Create a New Post!</Link>
        )}
      </div>
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
}
