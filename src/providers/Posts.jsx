import React, { useEffect, useState, createContext } from "react";
import { firestore } from "../firebase";

export const PostsContext = createContext([]);

export default function Authentication({ children }) {
  const [postData, setPostData] = useState({
    loading: true,
    posts: []
  });

  useEffect(() => {
    const unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPostData({ loading: false, posts });
    });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <PostsContext.Provider value={postData.posts}>
      {postData.loading ? null : children}
    </PostsContext.Provider>
  );
}
