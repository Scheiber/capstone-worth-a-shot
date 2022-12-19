import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OneEstablishment from "./OneEstablishment";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Establishments.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ScrollUpButton from "react-scroll-up-button";
const API = process.env.REACT_APP_API_URL;

const Establishments = ({ user }) => {
  const [preferenceList, setPreferenceList] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    console.log(user);
    Aos.init({ duration: 3000 });
    axios
      .get(`${API}/users/${user.id}/preferences`)
      .then((response) => {
        setPreferenceList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const handleLikes = () => {
    const likedSpot = setLikes([`${preferenceList.name}`]);
    return setLikes(likedSpot);
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Worth a Shot | Bars and Clubs</title>
        </Helmet>
      </HelmetProvider>
      {user.age >= 21 ? (
        <Link to="/alcohols/categories">
          <button id="index-button">Find Alcohol</button>
        </Link>
      ) : null}
      <h1 className="establishment-header">
        Here are some great places to try.
      </h1>
      <section className="establishment-grid" data-aos="fade-up">
        {preferenceList.map((preference) => {
          return (
            <OneEstablishment
              preference={preference}
              handleLikes={handleLikes}
            />
          );
        })}
      </section>
      <ScrollUpButton style={{ backgroundColor: "rgb(253, 197, 0, 0.75)" }} />
    </div>
  );
};

export default Establishments;
