import firebase from './firebase.js';
import { User } from '../model/user.js';

let firebaseUser: firebase.User | null;
let user: User | null;

function logIn(
  useremail: string,
  userpassword: string,
  callback: (u: User) => any,
  failedCallback: () => any
) {
  firebase
    .auth()
    .signInWithEmailAndPassword(useremail, userpassword)
    .then(function () {
      firebaseUser = firebase.auth().currentUser;
      firebase
        .database()
        .ref('/users/' + firebaseUser?.uid)
        .on('value', function (snapshot) {
          user = new User();
          user.id = snapshot.key ?? '';
          user.email = snapshot.val().email;
          user.name = snapshot.val().name;

          sessionStorage.setItem('User', JSON.stringify(firebaseUser));
          sessionStorage.setItem('name', snapshot.val().name);

          if (callback) {
            callback(user);
          }
        });
    })
    .catch(function (error) {
      console.log(
        'errorCode = ' + error.code,
        'errorMessage = ' + error.message
      );
      if (failedCallback) {
        failedCallback();
      }
    });
}

function logOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      alert('Log out!');
      sessionStorage.clear();
    })
    .catch(function (error) {
      console.log(
        'errorCode = ' + error.code,
        'errorMessage = ' + error.message
      );
    });
}

//현재 로그인한 유저 정보
// function getnowUserData() {
//     const user = JSON.parse(sessionStorage.getItem("User"));
//     const username = sessionStorage.getItem("name")
//     const data = [user,username];
//     if (user && username) {
//         return data;
//     } else {
//         alert("not Log in");
//     }
// }

export {
  logIn,
  logOut,
  // getnowUserData
};
