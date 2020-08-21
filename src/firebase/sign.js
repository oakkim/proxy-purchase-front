import firebase from './firebase';

function SignUp(useremail, userpassword, username) {
    //FireBase에 Auth를 이용하는 방식
    firebase.auth().createUserWithEmailAndPassword(useremail, userpassword).then(function () {
        firebase.auth().signInWithEmailAndPassword(useremail,userpassword).then(function () {
            const Useruid = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/' + Useruid).set({
                name: username,
                email: useremail,
                password: userpassword
            });
        })
        alert("sign up!");
    }).catch(function (error) {
        console.log("errorCode = " + error.code,
            "errorMessage = " + error.message);
    })
}

export { SignUp } 