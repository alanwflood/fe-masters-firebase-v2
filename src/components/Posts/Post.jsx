import React from "react";
import { Link } from "react-router-dom";
import { distanceInWordsToNow } from "date-fns";

import { firestore, auth } from "../../firebase";

function userCanDelete(currentUser, user) {
  if (!currentUser) return false;
  return currentUser.uid === user.uid;
}

function getPost(postId) {
  return firestore.doc(`posts/${postId}`);
}

function removePost(postRef) {
  return postRef.delete();
}

async function updateStars(postRef) {
  const post = await postRef.get();
  const postData = post.data();
  const stars = postData.stars || 0;
  const update = await postRef.update({ stars: stars + 1 });
  return update;
}

function Post({ id, title, content, user, createdAt, stars, commentCount }) {
  const postRef = getPost(id);
  const canDeletePost = userCanDelete(auth.currentUser, user);
  const canStarPost = !!auth.currentUser;
  const postPath = `/posts/${id}`;

  return (
    <article className="Post">
      <div className="Post--content">
        <h3>
          <Link to={postPath}>{title}</Link>
        </h3>
        <div>{content}</div>
      </div>
      <div className="Post--meta">
        <div>
          <p>
            <span role="img" aria-label="star">
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🙊
            </span>
            {commentCount}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{distanceInWordsToNow(createdAt.toDate())} ago</p>
        </div>
        <div>
          {canStarPost ? (
            <button className="star" onClick={() => updateStars(postRef)}>
              Star
            </button>
          ) : null}
          {canDeletePost ? (
            <button className="delete" onClick={() => removePost(postRef)}>
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

Post.defaultProps = {
  title: "An Incredibly Hot Take",
  content:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.",
  user: {
    id: "123",
    displayName: "Bill Murray",
    email: "billmurray@mailinator.com",
    photoURL: "https://www.fillmurray.com/300/300"
  },
  createdAt: new Date(),
  stars: 0,
  comments: 0
};

export default Post;
