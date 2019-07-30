import React, { useState, useEffect } from "react";

import Post from "./Post";
import Comments from "../Comments";

import { firestore } from "../../firebase";

function firebaseErrorReturn(error) {
  return { loading: false, error: error.message };
}

async function getPost(postRef) {
  try {
    const postData = await postRef.get();
    return { uid: postRef.id, ...postData.data(), loading: false, error: null };
  } catch (error) {
    return firebaseErrorReturn(error);
  }
}

export default function PostPage({ match }) {
  const [post, setPost] = useState({ loading: true, error: null });
  const [comments, setComments] = useState({ loading: true, error: null });

  useEffect(
    () => {
      const postId = match.params.postId;
      const postRef = firestore.doc(`posts/${postId}`);

      async function getPostData() {
        const postData = await getPost(postRef);
        setPost({ ...postData, id: postData.uid });
      }

      const unsubscribePosts = postRef.onSnapshot(snapshot => {
        getPostData(snapshot);
      });

      const unsubscribeComments = postRef
        .collection("comments")
        .onSnapshot(snapshot => {
          const commentsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log(commentsData);
          setComments({ loading: false, error: null, data: commentsData });
        });

      return function cleanup() {
        unsubscribePosts();
        unsubscribeComments();
      };
    },
    [match]
  );

  return (
    <div>
      {post.loading ? "Loading" : <Post {...post} />}
      <div>
        {post.loading || comments.loading ? (
          "Loading"
        ) : (
          <Comments comments={comments.data} postId={post.uid} />
        )}
      </div>
    </div>
  );
}
