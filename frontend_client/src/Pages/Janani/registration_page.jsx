import React, { useState } from "react";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import "../../Css/Janani/registration.css";
import axios from "axios";
import LoginImage from "../../Assets/reg.png";
import { useNavigate } from "react-router";
import validator from "validator";
import DOMPurify from "dompurify";
import JSON5 from "json5";

function submitHandler() {
  const name = "John"; // Replace with your form input values
  const email = "john@example.com";
  const country = "US";
  const password = "SecurePassword123!"; // Replace with your form input values

  // Validate and sanitize user inputs
  const nameRegex = /^[a-zA-Z0-9\s]+$/;
  if (!nameRegex.test(name)) {
    alert("Please enter a valid name.");
    return;
  }

  // Password validation (customize as needed)
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  // Email validation using validator library
  if (!validator.isEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  // Whitelist validation for country: allow specific country codes
  const allowedCountryCodes = ["IN", "US", "SL", "NZ", "UK", "Ausi", "Can", "France", "Japan", "Rus", "Italy"];
  if (!allowedCountryCodes.includes(country.toUpperCase())) {
    alert("Please select a valid country.");
    return;
  }

  // Create a data object with sanitized values
  const sanitizedData = {
    name: name,
    email: email,
    country: country,
    password: password,
  };

  // Convert sanitized data to a JSON string
  const jsonData = JSON5.stringify(sanitizedData);

  // Send the JSON data to the server
  axios
    .post("http://localhost:8000/user/data/save", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      navigation("/");
      alert(res.data.message);
    })
    .catch((err) => {
      console.error("Error submitting data:", err);
      alert("An error occurred while submitting the data.");
    });
}

  return (
    <div className="site-main-container">
      <div>
        <NavBar />
      </div>
      <div className="site-body-container">
        <div>
          <HomeHeader />
        </div>

        <div className="site-details-wrapper clearfix">
          {/* body start */}
          <div className="reg-container">
            <div className="reg-container-left-wrapper">
              <img src={LoginImage} width="390px" alt="Login" />
            </div>
            <div className="reg-container-right-wrapper">
              <h3>Create Your Account!!!</h3>
              <br />

              <input
                type="text"
                placeholder="Please Enter Your Name..."
                className="input-fields"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />
              <input
                type="email"
                placeholder="Please Enter Your Email..."
                className="input-fields"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <select
                className="input-fields"
                onChange={(e) => {
                  setContry(e.target.value);
                }}
              >
                <option value="none">Select Your Country...</option>
                <option value="IN">India</option>
                <option value="US">America</option>
                <option value="SL">Sri-Lanka</option>
                <option value="NZ">New Zealand</option>
                <option value="UK">UK</option>
                <option value="Ausi">Australia</option>
                <option value="Can">Canada</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="Rus">Russia</option>
                <option value="Italy">Italy</option>
              </select>
              <br />
              <input
                type="password"
                placeholder="Please Enter Your Password..."
                className="input-fields"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <br />
              <button className="reg-btn" onClick={submitHandler}>
                SIGN-UP
              </button>
            </div>
          </div>

          {/* body end */}
        </div>
        <Footter />
      </div>
    </div>
  );
}

export default Regitstration;
