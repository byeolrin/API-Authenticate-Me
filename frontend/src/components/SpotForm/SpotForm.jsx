import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SpotForm = ({ spot }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(1);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [validations, setValidations] = useState({});

  useEffect(() => {
    const validationsObj = {};

    if (!name) {
      validationsObj.name = "Name is required";
    }

    if (!address) {
      validationsObj.address = "Address is required";
    }

    if (!city) {
      validationsObj.city = "City is required";
    }

    if (!state) {
      validationsObj.state = "State is required";
    }

    if (!country) {
      validationsObj.country = "Country is required";
    }

    if (!price || price < 0) {
      validationsObj.price = "Price is required and needs to be greater than 0";
    }

    if (!image) {
      validationsObj.image = "At least one image is required";
    }

    if (!description || description.length < 30) {
        validationsObj.description = "Description needs a minimum of 30 characters"
    }

    setValidations(validationsObj);
  }, [name, address, city, state, country, price, image]);

  return (
  <form className="spot-form">
    <h2>Create a new Spot</h2>
    <label>
        Country
        <input
        type="text"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        />
    </label>
    {"country" in validations && <p>{validations.country}</p>}
    <label>
        Street Address
        <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        />
    </label>
    {"address" in validations && <p>{validations.address}</p>}
    <label>
        City
        <input
        type="text"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        />
        ,
        State 
        <input
        type="text"
        name="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        />
    </label>
    {"city" in validations && <p>{validations.city}</p>}
    {"state" in validations && <p>{validations.state}</p>}
    <label>
        Latitude
        <input
        type="text"
        name="lat"
        value={lat}
        min={-90}
        max={90}
        onChange={(e) => setLat(e.target.value)}
        />
        ,
        Longitude
        <input
        type="text"
        name="lng"
        value={lng}
        min={-180}
        max={180}
        onChange={(e) => setLng(e.target.value)}
        />
    </label>
    <label>
        Description
        <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
    </label>
    {"description" in validations && <p>{validations.setDescription}</p>}
    <label>
        Name
        <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
    </label>
    {"name" in validations && <p>{validations.name}</p>}
    <label>
        Main Image
        <input
        type="text"
        name="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        />
    </label>
    {"image" in validations && <p>{validations.image}</p>}
    <button
        type="submit"
        disabled={Object.values(validations).length > 0}
      >
        Create Spot
      </button>
  </form>
  )
};

export default SpotForm;