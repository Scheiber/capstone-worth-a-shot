import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
const quotes = require("../Pages/Quotes").default;
const i = Math.floor(Math.random() * quotes.length);

const Home = () => {
  return (
    <div className="home-container">
      <HelmetProvider>
        <Helmet>
          <title>Worth a Shot | Home</title>
        </Helmet>
      </HelmetProvider>
      <div className="home-subcontainer">
        <h1 className="home-header">This is Worth a Shot!</h1>
        <section className="home-text-container">
          <p className="home-text">
            Welcome to Worth a Shot, an app designed to help adults explore one
            of the world's favorite pastimes.
          </p>
          <p className="home-text">
            New to the nightlife scene and don't know where to begin? Or are you
            a nightlife veteran looking for a way to explore new places? Well
            with our app, you can create an account, choose a preferred vibe or
            scene, and we'll provide you with new and exciting nightlife venues
            curated to your tastes. Decide the direction of your night out on
            the town with our app! <span>It's worth a shot.</span>
          </p>
        </section>
        <h1 className="home-tagline">Your ultimate nightlife guide!</h1>
        <Link to={`/sign-up`}>
          <button className="large-button">Let's get started!</button>
        </Link>
        <p className="quote">
          {quotes[i]}
        </p>
      </div>
      <img
        className="splash"
        src="./images/splash.jpg"
        alt="Group of people partying"
      />
    </div>
  );
};

export default Home;
