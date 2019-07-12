import React, { useEffect, useState } from "react";

import Posts from "./Posts";
import { firestore } from "../firebase";

export default function Application() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(posts);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Posts posts={posts} />
    </main>
  );
}
