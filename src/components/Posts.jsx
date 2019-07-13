import React, { useState, useEffect } from "react";

import { firestore } from "../firebase";
import Post from "./Post";
import AddPost from "./AddPost";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(posts);
    });
    return () => unsubscribe;
  }, []);

  return (
    <section className="Posts">
      <AddPost />
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
}
