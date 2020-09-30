
import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../FirebaseConfig/FirebaseConfig';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);

    }
    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;
            console.log(result.user);
            const signedInUser = {name: displayName, email: email}
            setLoggedInUser(signedInUser);
            storeAuthToken();
            
          }).catch(function(error) {
            
          });
    }
    const handleFacebookSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            console.log(user);
            // ...
          }).catch(function(error) {

          });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(true)
        .then(function(idToken) {
          sessionStorage.setItem('token', idToken);
          history.replace(from);
          }).catch(function(error) {
            // Handle error
          });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <br/>
            <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
        </div>
    );
};

export default Login;

