import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


function App() {
  const [user, setUser] = useState({});

  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();

  // google
  const googleSignInHandler = () => {
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log('google log in : ', user)
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage);
      });
  }


  // facebook
  const fbSignInHandler = () => {
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
      console.log('facebook user ',user);
      setUser(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode, errorMessage);
    });
  }


  // github
  const gitSignInHandler = () => {
    firebase
    .auth()
    .signInWithPopup(ghProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;
      console.log('github user ',user);
      setUser(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode, errorMessage);
    });
  }

  return (
    <div className='App'>

      <h4 className='mt-3'>Welcome, it is a firebase authentication application</h4>
      
      <button onClick={googleSignInHandler} className='btn btn-primary mt-5 mb-3'>google</button>
      
      <button onClick={fbSignInHandler} className='btn btn-primary mt-5 mb-3 ml-3 mr-3'>Facebook</button>
     
      <button onClick={gitSignInHandler} className='btn btn-primary mt-5 mb-3'>Github</button>

      <h3>Display Name : {user.displayName}</h3>
      <img src={user.photoURL} alt=""/>
  
    </div>
  );
}

export default App;
