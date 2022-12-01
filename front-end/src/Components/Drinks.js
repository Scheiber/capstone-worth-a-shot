import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

//import from backend

const Drinks = () => {
  const [booze, setBooze] = useState([]);
  let {type} = useParams()
  console.log(type)

  useEffect(() => {
    axios
      .get(`${API}/alcohols/category/${type}`)
      .then((response) => {
        setBooze(response.data.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type]);

  console.log("This is a list of the booze:", booze);

  return (
    <div className="alcohol-list">
      <h1>Boozer's Index</h1>
      {booze.map((booze, index) => {
        return (
          <div key={index}>
            <h1>{booze.name}</h1>
            <h3>{booze.proof}</h3>
            <h5>{booze.description}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default Drinks;
