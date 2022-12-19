import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Onboarding.css";
const API = process.env.REACT_APP_API_URL;

//TODO: LET FLAVORS HAVE MULTIPLE INPUTS

export default function Onboarding({ userFirebaseId, callback }) {
  let [displayNextForm, setDisplayNextForm] = useState(false);
  let [user, setUser] = useState({
    name: "",
    age: 0,
    gender: "",
    zip_code: "",
    personality: "",
    flavors: "",
    atmosphere: "",
    firebase_id: "",
  });
  let [atmospheres, setAtmospheres] = useState([]);
  let [flavorPrefs, setFlavorPrefs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("FIREBASE UID: ", userFirebaseId);
    setUser({ firebase_id: userFirebaseId });
  }, []);

  const addUser = async (user) => {
    // let finalFlavors = flavorPrefs.join(", ");
    // user.flavors = finalFlavors;
    await axios
      .post(`${API}/users`, user)
      .then((response) => {
        callback(response.data.payload);
        navigate("/myhome");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTextChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleAgeChange = (event) => {
    setUser({ ...user, [event.target.id]: Number(event.target.value) });
  };

  const handleAtmosphere = (event) => {
    event.preventDefault();
    event.target.className === "clicked"
      ? (event.target.className = "not-clicked")
      : (event.target.className = "clicked");
    if (atmospheres.indexOf(event.target.value) > 0) {
      atmospheres.splice(atmospheres.indexOf(event.target.value), 1);
      setAtmospheres(atmospheres);
    } else {
      setAtmospheres((atmospheres) => [...atmospheres, event.target.value]);
    }
  };

  const handleFlavorsAdding = (event) => {
    let flavorsString = user.flavors;
    if (user.flavors !== undefined) {
      let newArray = user.flavors.split(", ");
      console.log(newArray);
      if (newArray.indexOf(event.target.value) >= 0) {
        newArray.splice(newArray.indexOf(event.target.value), 1);
        console.log("REMOVED: ", user.flavors);
        setUser({ ...user, flavors: newArray.join(", ") });
      } else {
        setUser({
          ...user,
          flavors: flavorsString + ", " + event.target.value,
        });
        console.log("ADD: ", user.flavors);
      }
    } else {
      setUser({
        ...user,
        flavors: event.target.value,
      });
    }
  };

  //Check validity of Zip Code
  const zipCodeCheck = (zipCode) => {
    if (zipCode.length !== 5) {
      return false;
    }
    for (const num of zipCode) {
      if (typeof Number(num) !== "number") {
        return false;
      }
    }
    return true;
  };

  //Check User Age
  const handleAgeCheck = (age) => {
    return age < 18 ? false : true;
  };

  const goToNextForm = (event) => {
    event.preventDefault();
    setDisplayNextForm(true);
  };
  const goToPreviousForm = (event) => {
    event.preventDefault();
    setDisplayNextForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    user.atmosphere = atmospheres.join(", ");

    if (user.name === undefined) {
      alert("Please enter your name");
    } else if (user.age === undefined) {
      alert(
        "Sorry, you need to be over 18 to create an account with our site!"
      );
    } else if (!handleAgeCheck(user.age)) {
      alert(
        "Sorry, you need to be over 18 to create an account with our site!"
      );
    } else if (user.gender === undefined) {
      alert("Please select your gender!");
    } else if (user.zip_code === undefined) {
      alert("Please enter a valid Zip Code!");
    } else if (!zipCodeCheck(user.zip_code)) {
      alert("Please enter a valid Zip Code!");
    } else if (user.personality === undefined) {
      alert("Please describe yourself");
    } else if (user.flavors === undefined) {
      alert("Please choose at least one flavor preference");
    } else if (user.atmosphere === undefined) {
      alert("Please choose at least one atmospheric vibe!");
    } else {
      addUser(user);
    }
  };

  //TODO: Add age validity check
  return (
    <div className="onboarding">
      <form onSubmit={handleSubmit}>
        <div id={!displayNextForm ? "show" : "hidden"}>
          <h1 className="onboarding-header">Let's get to know you better.</h1>
          <section className="info-wrap-onboarding">
            <div className="input-label-wrap-onboarding">
              <label htmlFor="name">What's your name? </label>
              <input
                id="name"
                type="text"
                onChange={handleTextChange}
                autoComplete="off"
                novalidate
              />
            </div>
            <br />
            <div className="input-label-wrap-onboarding">
              <label htmlFor="age">Age? </label>
              <input
                id="age"
                name="age"
                type="number" //TODO: Change to calendar and calculate age later
                onChange={handleAgeChange}
                autoComplete="off"
                novalidate
              />
            </div>
            <br />
            <br />
            <label className="onboarding-label">
              What is your gender identity?
            </label>
            <br />
            <label htmlFor="male">Male</label>
            <input
              id="gender"
              type="radio"
              name="gender"
              onChange={handleTextChange}
              value="Male"
            />
            <br />
            <label htmlFor="female">Female</label>
            <input
              id="gender"
              type="radio"
              name="gender"
              onChange={handleTextChange}
              value="Female"
            />
            <br />
            <label htmlFor="other">Other</label>
            <input
              id="gender"
              type="radio"
              name="gender"
              onChange={handleTextChange}
              value="Other"
            />
            <br />
            <br />
            <label className="onboarding-label" htmlFor="zip_code">
              Zip Code:{" "}
            </label>
            <input
              id="zip_code"
              type="text"
              size="5"
              maxLength="5"
              onChange={handleTextChange}
              autoComplete="off"
              novalidate
            />
          </section>
          <button type="button" onClick={goToNextForm}>
            Next
          </button>
        </div>
        <div id={displayNextForm ? "show" : "hidden"}>
          <h1 className="onboarding-header">Great! Let's keep going.</h1>
          <section className="info-wrap-onboarding">
            <label className="onboarding-label" htmlFor="personality">
              How would you describe yourself?
            </label>
            <select id="personality" onChange={handleTextChange}>
              <option hidden disabled selected value>
                -- select an option --
              </option>
              <option value="Extrovert">Extrovert</option>
              <option value="Introvert">Introvert</option>
              <option value="Ambivert">Ambivert</option>
            </select>
            <br></br>
            <br />
            <label className="onboarding-label">
              Choose your favorite beverage flavors:{" "}
            </label>
            <br />
            <label className="checkmark">
              Sweet
              <input
                id="flavors"
                type="checkbox"
                onChange={handleFlavorsAdding}
                name="flavor-1"
                value="Sweet"
              />
            </label>
            <br></br>
            <label className="checkmark">
              Bitter
              <input
                id="flavors"
                type="checkbox"
                onChange={handleFlavorsAdding}
                name="flavor-2"
                value="Bitter"
              />
            </label>
            <br></br>
            <label className="checkmark">
              Sour
              <input
                id="flavors"
                type="checkbox"
                onChange={handleFlavorsAdding}
                name="flavor-3"
                value="Sour"
              />
            </label>
            <br />
            <label className="checkmark">
              Tangy
              <input
                id="flavors"
                type="checkbox"
                onChange={handleFlavorsAdding}
                name="flavor-4"
                value="Tangy"
              />
            </label>
            <br />
            <label className="checkmark">
              Dry
              <input
                id="flavors"
                type="checkbox"
                onChange={handleFlavorsAdding}
                name="flavor-5"
                value="Dry"
              />
            </label>
            <br />
          </section>
          <label className="onboarding-label">Pick your venue vibes</label>
          <br />
          <br />
          <button
            id="atmosphere"
            onClick={handleAtmosphere}
            value="adultentertainment"
          >
            Adult Entertainment
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="stripclubs">
            Strip Club
          </button>
          <button
            id="atmosphere"
            onClick={handleAtmosphere}
            value="cocktailbars"
          >
            Cocktails
          </button>
          <button
            id="atmosphere"
            onClick={handleAtmosphere}
            value="champagne_bars"
          >
            Fancy
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="divebars">
            Casual and Social
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="gaybars">
            LGBTQ+
          </button>
          <button
            id="atmosphere"
            onClick={handleAtmosphere}
            value="hookah_bars"
          >
            Hookah
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="lounges">
            Lounge
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="pubs">
            Pubs
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="sakebars">
            Sake
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="sportsbars">
            Sports
          </button>
          <button
            id="atmosphere"
            onClick={handleAtmosphere}
            value="coffeeshops"
          >
            Coffee
          </button>
          <button
            id="atmosphere"
            onClick={handleAtmosphere}
            value="comedyclubs"
          >
            Comedy
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="danceclubs">
            Dancing
          </button>
          <button
            id="atmosphere"
            onClick={handleAtmosphere}
            value="jazzandblues"
          >
            Jazz and Blues
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="karaoke">
            Karaoke
          </button>
          <button
            id="atmosphere"
            onClick={handleAtmosphere}
            value="musicvenues"
          >
            Music
          </button>
          <button id="atmosphere" onClick={handleAtmosphere} value="poolhalls">
            Pool Hall
          </button>

          <br></br>
          <br></br>
          <button onClick={goToPreviousForm}>Back</button>
          <input id="submit-new-user" type="submit" value="Create Profile" />
        </div>
      </form>
    </div>
  );
}
