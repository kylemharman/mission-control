/* eslint-disable comma-dangle */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUserRecord = functions
  .region('australia-southeast1')
  .auth.user()
  .onCreate((user) => {
    const userRef = db.doc(`users/${user.uid}`);

    const data = {
      ref: userRef,
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      profileImage: user.photoURL,
      colourTheme: '',
      darkMode: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    return userRef.set(data, { merge: true });
  });
