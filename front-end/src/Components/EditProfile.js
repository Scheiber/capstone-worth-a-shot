import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProfile.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
const API = process.env.REACT_APP_API_URL;

function EditProfile({
  user,
  setUser,
  sendEmailVerification,
  userVerified,
  deleteFirebaseAccount,
}) {
  const navigate = useNavigate();
  const [userEdit, setUserEdit] = useState({
    name: "",
    age: 0,
    gender: "",
    zip_code: "",
    personality: "",
    flavors: "",
    atmosphere: "",
    firebase_id: "",
  });

  useEffect(() => {
    setUserEdit(user);
  }, [user, userVerified]);
  console.log(userEdit);

  const checkAtmosphereExists = (string) => {
    return userEdit.atmosphere.includes(string) ? true : false;
  };
  const handleTextChange = (event) => {
    setUserEdit({ ...userEdit, [event.target.id]: event.target.value });
  };

  const handleAgeChange = (event) => {
    setUserEdit({ ...userEdit, [event.target.id]: Number(event.target.value) });
  };

  const updateUserInfo = (editedUser) => {
    axios
      .put(`${API}/users/${user.id}`, editedUser)
      .then(() => {
        setUser(editedUser); //trying to rerender page
        navigate(`/myhome`);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleAtmosphere = (event) => {
    event.preventDefault();
    event.target.className === "clicked"
      ? (event.target.className = "not-clicked")
      : (event.target.className = "clicked");
    let atmosphereString = userEdit.atmosphere;
    let newArray = userEdit.atmosphere.split(", ");
    if (newArray.indexOf(event.target.value) >= 0) {
      newArray.splice(newArray.indexOf(event.target.value), 1);
      setUserEdit({ ...user, atmosphere: newArray.join(", ") });
    } else {
      setUserEdit({
        ...user,
        atmosphere: atmosphereString + ", " + event.target.value,
      });
    }
  };

  const handleFlavorsAdding = (event) => {
    let flavorsString = userEdit.flavors;
    let newArray = userEdit.flavors.split(", ");
    if (newArray.indexOf(event.target.value) >= 0) {
      newArray.splice(newArray.indexOf(event.target.value), 1);
      setUserEdit({ ...user, flavors: newArray.join(", ") });
    } else {
      setUserEdit({
        ...user,
        flavors: flavorsString + ", " + event.target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userEdit.flavors === "") {
      alert("Please choose at least one flavor preference!");
    } else if (userEdit.atmosphere === "") {
      alert("Please choose at least one atmospheric vibe!");
    } else {
      updateUserInfo(userEdit);
    }
  };
  console.log("Flavors: ", userEdit.flavors);

  const deleteUser = () => {
    axios.delete(`${API}/users/${user.id}`).catch((error) => {
      console.warn(error);
    });
    deleteFirebaseAccount();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete your profile?")) {
      deleteUser();
      navigate("/");
    }
  };
  return (
    <div className="edit-profile">
      <HelmetProvider>
        <Helmet>
          <title>Worth a Shot | Edit Profile</title>
        </Helmet>
      </HelmetProvider>
      <h1>Let's make sure we've got everything right.</h1>
      {!userVerified ? (
        <h4 id="not-verified" onClick={sendEmailVerification}>
          Verify your email address!
        </h4>
      ) : (
        <h4 id="verified">Your email address is verified ✅</h4>
      )}
      <form className="user-edit-form" onSubmit={handleSubmit}>
        <section className="info-wrap">
          <div className="input-label-wrap">
            <label className="bold" htmlFor="name">
              Name:{" "}
            </label>
            <input
              id="name"
              type="text"
              onChange={handleTextChange}
              autoComplete="off"
              value={userEdit.name}
              required
            />
            <br />
            <br />
            <label className="bold" htmlFor="age">
              Age:{" "}
            </label>
            <input
              id="age"
              name="age"
              type="number" //TODO: Change to calendar and calculate age later
              onChange={handleAgeChange}
              value={userEdit.age}
              autoComplete="off"
              required
            />
          </div>
          <br />
          <br />
          <label className="bold">What is your gender identity?</label>
          <br />
          <label htmlFor="male">Male</label>
          <input
            id="gender"
            type="radio"
            name="gender"
            onChange={handleTextChange}
            value="Male"
            checked={userEdit.gender === "Male" && "checked"}
          />
          <br />
          <label htmlFor="female">Female</label>
          <input
            id="gender"
            type="radio"
            name="gender"
            onChange={handleTextChange}
            value="Female"
            checked={userEdit.gender === "Female" && "checked"}
          />
          <br />
          <label htmlFor="other">Other</label>
          <input
            id="gender"
            type="radio"
            name="gender"
            onChange={handleTextChange}
            value="Other"
            checked={userEdit.gender === "Other" && "checked"}
          />
          <br />
          <br />
          <label className="bold" htmlFor="zip_code">
            Zip Code:{" "}
          </label>
          <input
            id="zip_code"
            type="text"
            size="5"
            maxLength="5"
            onChange={handleTextChange}
            value={userEdit.zip_code}
            autoComplete="off"
            required
          />
          <br />
          <br />
          <label className="bold">Social Personality</label>
          <select id="personality" onChange={handleTextChange}>
            <option
              value="Extrovert"
              selected={userEdit.personality === "Extrovert" && "selected"}
            >
              Extrovert
            </option>
            <option
              value="Introvert"
              selected={userEdit.personality === "Introvert" && "selected"}
            >
              Introvert
            </option>
            <option
              value="Ambivert"
              selected={userEdit.personality === "Ambivert" && "selected"}
            >
              Ambivert
            </option>
          </select>
          <br />
          <br />
          <label id="bev-flavors">Bev Flavors</label>
          <br />
          <label>Sweet</label>
          <input
            id="flavors"
            type="checkbox"
            onChange={handleFlavorsAdding}
            name="flavors-6"
            value="Sweet"
            checked={userEdit.flavors.includes("Sweet") && "checked"}
          />
          <br />
          <label>Bitter</label>
          <input
            id="flavors"
            type="checkbox"
            onChange={handleFlavorsAdding}
            name="flavors-7"
            value="Bitter"
            checked={userEdit.flavors.includes("Bitter") && "checked"}
          />
          <br />
          <label>Sour</label>
          <input
            id="flavors"
            type="checkbox"
            onChange={handleFlavorsAdding}
            name="flavors-8"
            value="Sour"
            checked={userEdit.flavors.includes("Sour") && "checked"}
          />
          <br />
          <label>Tangy</label>
          <input
            id="flavors"
            type="checkbox"
            onChange={handleFlavorsAdding}
            name="flavors-9"
            value="Tangy"
            checked={userEdit.flavors.includes("Tangy") && "checked"}
          />
          <br />
          <label>Dry</label>
          <input
            id="flavors"
            type="checkbox"
            onChange={handleFlavorsAdding}
            name="flavors-10"
            value="Dry"
            checked={userEdit.flavors.includes("Dry") && "checked"}
          />
          <br />
        </section>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("adultentertainment")
              ? "clicked"
              : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="adultentertainment"
        >
          Adult Entertainment
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("stripclubs") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="stripclubs"
        >
          Strip Club
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("cocktailbars") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="cocktailbars"
        >
          Cocktails
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("champagne_bars") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="champagne_bars"
        >
          Fancy
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("divebars") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="divebars"
        >
          Casual and Social
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("gaybars") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="gaybars"
        >
          LGBTQ+
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("hookah_bars") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="hookah_bars"
        >
          Hookah
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("lounges") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="lounges"
        >
          Lounge
        </button>
        <button
          id="atmosphere"
          className={checkAtmosphereExists("pubs") ? "clicked" : "not-clicked"}
          onClick={handleAtmosphere}
          value="pubs"
        >
          Pubs
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("sakebars") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="sakebars"
        >
          Sake
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("sportsbars") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="sportsbars"
        >
          Sports
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("coffeeshops") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="coffeeshops"
        >
          Coffee
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("comedyclubs") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="comedyclubs"
        >
          Comedy
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("danceclubs") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="danceclubs"
        >
          Dancing
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("jazzandblues") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="jazzandblues"
        >
          Jazz and Blues
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("karaoke") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="karaoke"
        >
          Karaoke
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("musicvenues") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="musicvenues"
        >
          Music
        </button>
        <button
          id="atmosphere"
          className={
            checkAtmosphereExists("poolhalls") ? "clicked" : "not-clicked"
          }
          onClick={handleAtmosphere}
          value="poolhalls"
        >
          Pool Hall
        </button>

        <br />
        <br />
        <input id="edit-user" type="submit" value="Update Profile" />
      </form>
      <button className="delete-button" onClick={handleDelete}>
        Delete Profile
      </button>
    </div>
  );
}

export default EditProfile;
