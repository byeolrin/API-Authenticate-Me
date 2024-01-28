import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateSpot, thunkCreateSpotImage } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import "./SpotForm.css";

const SpotForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(1);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (!name.length) {
      errors.name = "Name is required";
    }

    if (!address) {
      errors.address = "Address is required";
    }

    if (!city) {
      errors.city = "City is required";
    }

    if (!state) {
      errors.state = "State is required";
    }

    if (!country) {
      errors.country = "Country is required";
    }

    if (!price || price < 0) {
      errors.price = "Price is required and needs to be greater than 0";
    }

    if (!mainImage.match(/\.(jpg|jpeg|png)$/)) {
      errors.mainImage = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (img1 && !img1.match(/\.(jpg|jpeg|png)$/)) {
      errors.img1 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (img2 && !img2.match(/\.(jpg|jpeg|png)$/)) {
      errors.img2 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (img3 && !img3.match(/\.(jpg|jpeg|png)$/)) {
      errors.img3 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (img4 && !img4.match(/\.(jpg|jpeg|png)$/)) {
      errors.img4 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }

    setValidationErrors(errors);
  }, [
    name,
    address,
    city,
    state,
    country,
    price,
    mainImage,
    description,
    img1,
    img2,
    img3,
    img4,
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(Object.keys(validationErrors));
    if (!Object.keys(validationErrors).length) {
      const newSpot = await dispatch(
        thunkCreateSpot({
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data.errors) {
          setValidationErrors(data.errors);
        }
      });
      const imgArr = [mainImage, img1, img2, img3, img4];
      await dispatch(thunkCreateSpotImage(newSpot.id, imgArr));
      navigate(`/spots/${newSpot.id}`);
    }
  };

  return (
    <div className="spot-form-container">
      <form className="spot-form" onSubmit={onSubmit}>
        <div className="form-title-before-label">
        <h2>Create a new Spot</h2>
        <h3>Where&apos;s your place located?</h3>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>
        </div>
        <label>
          <p>Country</p>
          <input
            type="text"
            className="country-input"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div className="form-errors">
            {submitted && "country" in validationErrors && (
              <p>{validationErrors.country}</p>
            )}
          </div>
        </label>
        <label>
          <p>Street Address</p>
          <input
            type="text"
            className="address-input"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="form-errors">
            {submitted && "address" in validationErrors && (
              <p>{validationErrors.address}</p>
            )}
          </div>
        </label>
        <label className="city-state-container">
          <p>City, </p>
          <input
            type="text"
            className="city-input"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <p>State</p>
          <input
            type="text"
            className="state-input"
            placeholder="STATE"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <div className="form-errors">
            {submitted && "state" in validationErrors && (
              <p>{validationErrors.state}</p>
            )}
          </div>
        </label>
        <label>
          <p>Latitude, </p>
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            min={-90}
            max={90}
            onChange={(e) => setLat(e.target.value)}
          />
          <p>Longitude</p>
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            min={-180}
            max={180}
            onChange={(e) => setLng(e.target.value)}
          />
        </label>
        <h3>Describe your place to guests</h3>
        <p>
          Mention the best features of your space, any special amenities like
          fast wif or parking, and what you love about the neighborhood.
        </p>
        <label>
          <p>Description</p>
          <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-errors">
            {submitted && "description" in validationErrors && (
              <p>{validationErrors.description}</p>
            )}
          </div>
        </label>
        <h3>Create a title for your spot</h3>
        <p>
          Catch guests&apos; attention with a spot title that highlights what
          makes your place special.
        </p>
        <label>
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="form-errors">
            {submitted && "name" in validationErrors && (
              <p>{validationErrors.name}</p>
            )}
          </div>
        </label>
        <h3>Set a base price for your spot</h3>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <label>
          {`$ `}
          <input
            type="text"
            placeholder="Price per night (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="form-errors">
            {submitted && "price" in validationErrors && (
              <p>{validationErrors.price}</p>
            )}
          </div>
        </label>
        <br />
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot</p>
        <label>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={mainImage}
            onChange={(e) => setMainImage(e.target.value)}
          />
          <div className="form-errors">
            {submitted &&
              "mainImage" in validationErrors &&
              `${validationErrors.mainImage}`}
          </div>
        </label>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={img1}
            onChange={(e) => setImg1(e.target.value)}
          />
          <div className="form-errors">
            {submitted &&
              "img1" in validationErrors &&
              `${validationErrors.img1}`}
          </div>
        </label>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={img2}
            onChange={(e) => setImg2(e.target.value)}
          />
          <div className="form-errors">
            {submitted &&
              "img2" in validationErrors &&
              `${validationErrors.img2}`}
          </div>
        </label>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={img3}
            onChange={(e) => setImg3(e.target.value)}
          />
          <div className="form-errors">
            {submitted &&
              "img3" in validationErrors &&
              `${validationErrors.img3}`}
          </div>
        </label>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={img4}
            onChange={(e) => setImg4(e.target.value)}
          />
          <div className="form-errors">
            {submitted &&
              "img4" in validationErrors &&
              `${validationErrors.img4}`}
          </div>
        </label>
        <br />
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default SpotForm;
