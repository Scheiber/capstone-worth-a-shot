import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ShowEstablishment.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Aos from "aos";
import "aos/dist/aos.css";
const API = process.env.REACT_APP_API_URL;
const YELP_API = process.env.REACT_APP_YELP_API_URL;

//TODO: SHOW PAGE WORKS, FIX ADDRES1 ERROR (BEING UNDEFINED)
//SOMETIMES ADDRESS1 IS UNDEFINED AND CRASHES APP DESPITE CONDITIONAL
export default function ShowEstablishment({ user }) {
  const [establishment, setEstablishment] = useState({});
  const [venueReviews, setVenueReviews] = useState([]);
  const [setLike] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    axios
      .get(`${YELP_API}/${id}`)
      .then((res) => {
        setEstablishment(res.data);
      })
      .catch(() => {
        navigate("/not found");
      });

    axios
      .get(`${YELP_API}/reviews/${id}`)
      .then((res) => {
        setVenueReviews(res.data.reviews);
      })
      .catch(() => {
        navigate("/not found");
      });
  }, [id, navigate]);

  const militaryToUSD = (time) => {
    let hrs = String(time).substring(0, 2);
    let postScript = Number(hrs) > 12 ? "PM" : "AM";
    let mins = String(time).substring(2);
    return `${postScript === "PM" ? hrs - 12 : hrs}:${mins} ${postScript}`;
  };

  const handleLike = (event) => {
    event.preventDefault();
    setLike(true);
    axios
      .post(`${API}/userestablishments/addfavorite`, {
        user_uid: user.id,
        yelp_id: establishment.id,
        name: establishment.name,
        image: establishment.image_url,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="establishment-show">
      <Link id="establishment-back-button" to="/establishments">
        <button>Go back to Establishments</button>
      </Link>
      <h1>Check this place out!</h1>
      <br />
      <section className="establishment-info-grid" data-aos="fade-up">
        <div className="establishment-first-cell">
          <h1 className="establishment-show-name">{establishment.name}</h1>
          <h3>
            Address: {establishment?.location?.display_address[0]},{" "}
            {establishment?.location?.display_address[1]}
          </h3>
          <h4>Contact: {establishment.display_phone}</h4>
          <h4>Rating: {establishment.rating} / 5</h4>
          <button id="like-button" onClick={handleLike}>
            Like this place? Save it! ⭐️
          </button>
        </div>
        <div className="establishment-second-cell">
          <img
            alt="Establishment"
            className="establishment-info-image"
            src={
              establishment.image_url !== ""
                ? establishment.image_url
                : "./images/no-image.png"
            }
          />
          <h3>
            Hours of Operation:{" "}
            {militaryToUSD(establishment?.hours?.[0].open?.[0].start)} -{" "}
            {militaryToUSD(establishment?.hours?.[0].open?.[0].end)}
          </h3>
        </div>
      </section>
      <div className="second-grid" data-aos="fade-up">
        <section id="review-section">
          <h2>
            Reviews on <span>{establishment.name}</span>
          </h2>
          {venueReviews?.map((review) => {
            return (
              <div className="review-info">
                <span>
                  <h4>{review.user?.name}</h4>
                  <p>'{review.text}'</p>
                  <p>Rating: {review.rating} / 5 ⭐️</p>
                </span>
              </div>
            );
          })}
        </section>
        <section className="venue-photo-wrap">
          <h2>Photo Gallery</h2>
          <Carousel>
            {establishment?.photos?.map((photo) => {
              return (
                <img className="venue-photo" src={photo} alt="Establishment" />
              );
            })}
          </Carousel>
        </section>
      </div>
    </div>
  );
}

//javascript optional chaining
//? before array
