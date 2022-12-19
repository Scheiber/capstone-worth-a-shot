import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
const API = process.env.REACT_APP_API_URL;

export default function Favorites({ user, Favorite }) {
  const [likedEstablishments, setLikedEstablishments] = useState([]);
  console.log(user);

  useEffect(() => {
    axios
      .get(`${API}/userestablishments/${user.id}`)
      .then((response) => {
        console.log(response.data.payload);
        setLikedEstablishments([...response.data.payload]);
      })
      .catch();
    console.log("LIKED PLACES:", likedEstablishments);
  }, [user]);

  return (
    <div className="favorite-page">
      <HelmetProvider>
        <Helmet>
          <title>Worth a Shot | Favorites</title>
        </Helmet>
      </HelmetProvider>
      <h1>Your Favorite Places</h1>
      <div className="favorites-container">
        {likedEstablishments.map((establishment, index) => {
          return (
            <div className="favorites-cell" key={index}>
              <Link to={`/establishment/${establishment.yelp_id}`}>
                <h1 className="favorite-name">{establishment.name}</h1>
                <img src={establishment.image} alt={establishment.name} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
