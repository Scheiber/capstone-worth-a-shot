import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import axios from "axios";
import "./UserSignIn.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
const API = process.env.REACT_APP_API_URL;

export default function UserSignIn({ resetPassword }) {
  const [profile, setProfile] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleTextChange = (event) => {
    setProfile({ ...profile, [event.target.id]: event.target.value });
  };

  const handlePress = (e) => {
    if (e.key === "Enter") {
      signIn();
    }
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, profile.email, profile.password)
      .then((userCredential) => {
        // Action when user is signed in
        const user = userCredential.user;
        if (user) {
          //get firebase id
          alert("Welcome back! You're now logged in!");
          // Navigates to a USER Splash Page (this should be personal to each user)
          navigate("/myhome");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        if (error.code === "auth/user-not-found") {
          alert(
            "User not found! Please enter a valid email address and password or sign up if you don't have an account."
          );
        } else {
          alert(
            `${errorCode} - Please enter a valid email address and password.`
          );
        }
      });
  };
  return (
    <div className="sign-in-section">
      <HelmetProvider>
        <Helmet>
          <title>Worth a Shot | Log In</title>
        </Helmet>
      </HelmetProvider>
      <div className="sign-in-section-container">
        <h1 className="login-header">Let's get you logged in.</h1>
        <div className="input-label-wrap">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            placeholder="user@example.com"
            onChange={handleTextChange}
            autoComplete="off"
            required
            onKeyDown={handlePress}
          />
        </div>
        <br></br>
        <div className="input-label-wrap">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleTextChange}
            autoComplete="off"
            required
            onKeyDown={handlePress}
          />
        </div>
        <br></br>
        <button id="login" onClick={signIn}>
          Log in
        </button>
        <h4 id="forgot-password" onClick={resetPassword}>
          Forgot Password?
        </h4>
      </div>
    </div>
  );
}
