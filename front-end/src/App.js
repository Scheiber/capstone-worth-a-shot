import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import Home from "./Pages/Home";
import About from "./Pages/About";
import "./App.css";
import Onboarding from "./Components/Onboarding";
import NavBar from "./Components/NavBar";
import Drinks from "./Components/Drinks";
import DrinksByPrefs from "./Components/DrinksByPrefs";
import LandingPageSignedIn from "./Pages/LandingSignedIn";
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from "./Components/UserSignUp";
import IndividualDrink from "./Components/IndividualDrink";
import DrinksCategories from "./Components/DrinksCategories";
import Establishments from "./Components/Establishments";
import Favorites from "./Components/Favorites";
import EditProfile from "./Components/EditProfile";
import ShowEstablishment from "./Components/ShowEstablishment";
import FourOFour from "./Pages/FourOFour";
import axios from "axios";
import Trending from "./Components/Trending";
import ScrollToTop from "./Components/scrollToTop";
const API = process.env.REACT_APP_API_URL;

const App = () => {
  const [loggedIn, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [userVerified, setUserVerified] = useState(false);
  const [firebaseId, setFirebaseId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      setLogin(true);
      setFirebaseId(user.uid); //firebase
      setUserEmail("");
    } else {
      // No user is signed in.
      setLogin(false);
    }
  });

  const deleteFirebaseAccount = () => {
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        // User deleted.
        alert("Closing time! Your account has been deleted.");
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };
  const checkUserVerification = () => {
    const loggedInUser = auth.currentUser;
    if (loggedInUser !== null) {
      // The user object has basic properties such as display name, email, etc.
      setUserVerified(loggedInUser.emailVerified);
      setUserEmail(loggedInUser.email);
    }
  };
  const sendVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("A verification email has been sent to you!");
    });
  };

  const resetPassword = () => {
    if (userEmail === "") {
      alert("Please enter your email.");
    } else {
      if (window.confirm("Are you sure you want to reset your passqord?")) {
        sendPasswordResetEmail(auth, userEmail)
          .then(() => {
            alert("An email has been sent for your password reset.");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }
    }
  };
  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`${API}/users/firebase/${firebaseId}`)
        .then((response) => {
          setUser(response.data.payload);
        })
        .catch((error) => {
          console.log(error);
        });
      checkUserVerification();
    } else {
      setUser({});
    }
  }, [loggedIn, firebaseId]);

  const signOutOfAccount = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("You have signed out");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  console.log("THIS IS USER: ", user);
  return (
    <div className="worth-a-shot">
      <Router>
        <ScrollToTop />
        <NavBar
          signOutOfAccount={signOutOfAccount}
          loggedIn={loggedIn}
          userVerified={userVerified}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myhome" element={<LandingPageSignedIn user={user} />} />
          <Route
            path="/establishments"
            element={<Establishments user={user} />}
          />
          <Route
            path="/establishment/:id"
            element={<ShowEstablishment user={user} />}
          />
          <Route
            path="/onboarding"
            element={
              <Onboarding userFirebaseId={firebaseId} callback={setUser} />
            }
          />
          <Route
            path="/sign-in"
            element={<UserSignIn resetPassword={resetPassword} />}
          />
          <Route
            path="/sign-up"
            element={<UserSignUp userFirebaseId={firebaseId} />}
          />
          <Route path="/myfavorites" element={<Favorites user={user} />} />
          <Route
            path="/editprofile"
            element={
              <EditProfile
                user={user}
                setUser={setUser}
                signOutOfAccount={signOutOfAccount}
                sendEmailVerification={sendVerification}
                userVerified={userVerified}
                deleteFirebaseAccount={deleteFirebaseAccount}
              />
            }
          />
          <Route path="/alcohols/:id" element={<IndividualDrink />} />
          <Route
            path="/alcohols/categories"
            element={<DrinksCategories user={user} />}
          />
          <Route path="/alcohols/category/:category" element={<Drinks />} />
          <Route
            path="alcohols/drinksforyou"
            element={<DrinksByPrefs user={user} />}
          />
          <Route path="/trending" element={<Trending />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<FourOFour loggedIn={loggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
