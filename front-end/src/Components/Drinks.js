import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Drink from "./Drink";
import axios from "axios";
import "./Drinks.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ScrollUpButton from "react-scroll-up-button";
const API = process.env.REACT_APP_API_URL;

//import from backend

const Drinks = () => {
  const [booze, setBooze] = useState([]);
  let { category } = useParams();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    axios
      .get(`${API}/alcohols/category/${category}`)
      .then((response) => {
        setBooze(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  return (
    <div data-aos="fade-up">
      <HelmetProvider>
        <Helmet>
          <title>Worth a Shot | Drinks</title>
        </Helmet>
      </HelmetProvider>
      <Link id="alcohol-back-button" to="/alcohols/categories">
        <button>Back</button>
      </Link>
      <h1 className="drink-header">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      <section className="alcohol-list">
        {booze.map((booze, index) => {
          return <Drink booze={booze} index={index} />;
        })}
      </section>
      <ScrollUpButton style={{ backgroundColor: "rgb(253, 197, 0, 0.9)" }} />
    </div>
  );
};

export default Drinks;
