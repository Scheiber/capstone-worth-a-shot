import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Drink from "./Drink";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { HelmetProvider, Helmet } from "react-helmet-async";
const API = process.env.REACT_APP_API_URL;

export default function DrinksByPrefs({ user }) {
  const [userDrinks, setUserDrinks] = useState([]);
  useEffect(() => {
    Aos.init({ duration: 2000 });
    let userFlavors = user.flavors?.split(", ");
    userFlavors?.map((flavor) => {
      axios
        .get(`${API}/alcohols/flavors/${flavor}`)
        .then((response) => {
          setUserDrinks([...userDrinks, ...response.data.payload]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [user]);

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
      <h1 className="drink-header">Try these!</h1>
      <div className="alcohol-list">
        {userDrinks?.map((drink, index) => {
          return <Drink booze={drink} index={index} />;
        })}
      </div>
    </div>
  );
}
