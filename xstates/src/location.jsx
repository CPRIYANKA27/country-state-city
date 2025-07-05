import React, { useEffect, useState } from "react";
import "./location.css";

const Location = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries([...new Set(data)]))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
    )
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
        setCities([]);
        setSelectedState("");
        setSelectedCity("");
      })
      .catch((err) => console.error("Error fetching states:", err));
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) return;

    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
    )
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setSelectedCity("");
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, [selectedState]);

  return (
    <div className="location-selector">
      <h2>Select Location</h2>

      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity && (
        <p className="result">
          You selected <strong>{selectedCity}</strong>,{" "}
          <strong>{selectedState}</strong>, <strong>{selectedCountry}</strong>
        </p>
      )}
    </div>
  );
};

export default Location;
