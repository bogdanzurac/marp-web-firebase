import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.saveUser = functions.auth.user().onCreate(async (user) => {

    const firestoreUser = {
        email: user.email,
        isAdmin: false
    };

  await admin.firestore()
        .collection("users")
        .doc(user.uid)
        .create(firestoreUser)

  console.log(`Added user ${user.uid}`);
});

exports.deleteUser = functions.auth.user().onDelete(async user => {

   await admin.firestore()
        .collection("users")
        .doc(user.uid)
        .delete()

   console.log(`Removed user ${user.uid}`);
});


