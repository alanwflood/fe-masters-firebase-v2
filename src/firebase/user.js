import { firestore } from "./index";

export async function createUserProfileDocument(user) {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt
      });
    } catch (error) {
      console.error("Error creating user: ", error.message);
    }
    console.log(user.uid);
    return getUserProfileDocument(user.uid);
  }
}

export async function getUserProfileDocument(uid) {
  if (!uid) return null;
  try {
    const userDocument = firestore.doc(`users/${uid}`);

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.log("Error fetching user: ", error.message);
  }
}
