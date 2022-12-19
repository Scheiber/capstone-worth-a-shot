import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DrinksCategories.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
const API = process.env.REACT_APP_API_URL;

const DrinksCategories = ({ user }) => {
  const [allDrinks, setAllDrinks] = useState([]);
  const [clickedType, setClickedType] = useState("");
  const [type, setType] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState({});
  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    setClickedType("fermented");
    axios
      .get(`${API}/alcohols`)
      .then((response) => {
        setAllDrinks(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loggedInUser]);

  const handleClickedType = () => {
    console.log(clickedType);
    if (clickedType === "fermented") {
      setClickedType("distilled");
    } else {
      setClickedType("fermented");
    }
  };

  const handleButtonShow =
    clickedType === "fermented" ? (
      <div id="type-button-wrapper">
        <Link to="/alcohols/category/beer">
          <button className="drink-category-button" value="beer">
            Beer
          </button>
        </Link>
        <Link to="/alcohols/category/cider">
          <button className="drink-category-button" value="cider">
            Cider
          </button>
        </Link>
        <Link to="/alcohols/category/wine">
          <button className="drink-category-button" value="wine">
            Wine
          </button>
        </Link>
        <Link to="/alcohols/category/mead">
          <button className="drink-category-button" value="mead">
            Mead
          </button>
        </Link>
        <Link to="/alcohols/category/sake">
          <button className="drink-category-button" value="sake">
            Sake
          </button>
        </Link>
      </div>
    ) : (
      <div id="type-button-wrapper">
        <Link to="/alcohols/category/whiskey">
          <button className="drink-category-button" value="whiskey">
            Whiskey
          </button>
        </Link>
        <Link to="/alcohols/category/gin">
          <button className="drink-category-button" value="gin">
            Gin
          </button>
        </Link>
        <Link to="/alcohols/category/brandy">
          <button className="drink-category-button" value="brandy">
            Brandy
          </button>
        </Link>
        <Link to="/alcohols/category/rum">
          <button className="drink-category-button" value="rum">
            Rum
          </button>
        </Link>
        <Link to="/alcohols/category/tequila">
          <button className="drink-category-button" value="tequila">
            Tequila
          </button>
        </Link>
        <Link to="/alcohols/category/vodka">
          <button className="drink-category-button" value="vodka">
            Vodka
          </button>
        </Link>
        <Link to="/alcohols/category/absinthe">
          <button className="drink-category-button" value="absinthe">
            Absinthe
          </button>
        </Link>
      </div>
    );

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Worth a Shot | Drinks</title>
        </Helmet>
      </HelmetProvider>
      <Link to="/establishments">
        <button id="index-button">Find Bars</button>
      </Link>
      <div className="alcohols-heading-wrapper">
        <h1 className="drink-header">
          What kind of drink are you looking for?
        </h1>
        <h3>
          Peruse our database of alcoholic beverages by "fermented" or
          "distilled", or click "Drinks for Me" to see which drinks we recommend
          just for you!
        </h3>
      </div>
      <div id="alcohol-display-wrapper">
        <section className="top-section">
          <section id="type-info">
            {clickedType === "fermented" ? (
              <div>
                <h3>Fermented</h3>
                <p>
                  Fermented drinks are one of the two main categories of
                  alcohol.
                </p>
                <p>
                  Fermentation is the process by which bacteria or yeast
                  chemically convert sugar into ethanol. Wine and beer are the
                  prime examples of this kind of alcohol; grapes are fermented
                  to make wine, and grains such as wheat or barley are fermented
                  to make beer.
                </p>
                <p>This type of alcohol tends to be fizzy and tangy.</p>
              </div>
            ) : (
              <div>
                <h3>Distilled</h3>
                <p>
                  Distilled drinks are one of the two main categories of
                  alcohol.
                </p>
                <p>
                  Distillation is the process by which a fermented substance is
                  separated from water through evaporation and condensation, and
                  thus has a higher concentration of alcohol. Liquors and
                  Spirits fall under this category of alcohol.
                </p>
                <p>
                  This type of alcohol tends to have a higher alcohol proof, and
                  is generally smoother to drink.
                </p>
              </div>
            )}
            <button onClick={handleClickedType}>Next Type</button>
          </section>
          <Link id="user-flavors-button" to="/alcohols/drinksforyou">
            <button>Drinks for Me!</button>
          </Link>
        </section>

        <section className="drink-category-grid">{handleButtonShow}</section>
      </div>
      <h5 id="source-info">
        For basic categorization of alcohol, we took inspiration from this{" "}
        <a
          href="https://www.alcoholrehabguide.org/alcohol/types/"
          target="_blank"
          rel="noreferrer"
        >
          Source
        </a>
      </h5>
    </div>
  );
};
export default DrinksCategories;
