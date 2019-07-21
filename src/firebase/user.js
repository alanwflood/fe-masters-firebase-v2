import { firestore } from "./index";

async function setUserData(userRef, user) {
  const { displayName, email, photoURL } = user;
  try {
    const userData = {
      displayName,
      email,
      photoURL,
      createdAt: new Date()
    };
    await userRef.set(userData);
    // Return the set data
    return { uid: user.uid, ...userData };
  } catch (error) {
    console.error("Error setting up user: ", error.message);
  }
}

export async function createUserProfileDocument(user) {
  if (!user) return;

  const userRef = await getUserProfileDocument(user.uid);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const userData = await setUserData(userRef, user);
    return userData;
  }

  // Return UID and snapshot if one exists
  return { uid: user.uid, ...snapshot.data() };
}

export async function getUserProfileDocument(uid) {
  if (!uid) return null;
  try {
    return await firestore.doc(`users/${uid}`);
  } catch (error) {
    console.log("Error fetching user: ", error.message);
  }
}
