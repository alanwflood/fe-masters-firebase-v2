const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

exports.commentCountChange = functions.firestore
  .document("posts/{postId}/comments/{commentId}")
  .onWrite(async (change, context) => {
    const { postId } = context.params;
    const postRef = firestore.doc(`posts/${postId}`);
    const post = await postRef.get();
    const commentCount = await post.get("commentCount");

    let increment;
    if (change.after.exists && !change.before.exists) {
      increment = 1;
    } else if (!change.after.exists && change.before.exists) {
      increment = -1;
    } else {
      return null;
    }

    return postRef.update({ commentCount: commentCount + increment });
  });
