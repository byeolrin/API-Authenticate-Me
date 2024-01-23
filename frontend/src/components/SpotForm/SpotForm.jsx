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

    if ((!price || price < 0)) {
      errors.price = "Price is required and needs to be greater than 0";
    }

    if (!mainImage.match(/\.(jpg|jpeg|png)$/)) {
      errors.mainImage = "Image URL must end in .png, .jpg, or .jpeg"
    }

    if (img1 && !img1.match(/\.(jpg|jpeg|png)$/)) {
      errors.img1 = "Image URL must end in .png, .jpg, or .jpeg"
    }

    if (img2 && !img2.match(/\.(jpg|jpeg|png)$/)) {
      errors.img2 = "Image URL must end in .png, .jpg, or .jpeg"
    }

    if (img3 && !img3.match(/\.(jpg|jpeg|png)$/)) {
      errors.img3 = "Image URL must end in .png, .jpg, or .jpeg"
    }

    if (img4 && !img4.match(/\.(jpg|jpeg|png)$/)) {
      errors.img4 = "Image URL must end in .png, .jpg, or .jpeg"
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
    img4
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
      const imgArr = [mainImage, img1, img2, img3, img4]
      await dispatch(thunkCreateSpotImage(newSpot.id, imgArr));
      navigate(`/spots/${newSpot.id}`);
    }
  };

  return (
    <form className="spot-form" onSubmit={onSubmit}>
      <h2>Create a new Spot</h2>
      <label>
        Country
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "country" in validationErrors && <p>{validationErrors.country}</p>}
        </div>
      </label>
      <br />
      <label>
        Street Address
        <input
          type="text"
          placeholder="Street Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "address" in validationErrors && <p>{validationErrors.address}</p>}
        </div>
      </label>
      <br />
      <label>
        City
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "city" in validationErrors && <p>{validationErrors.city}</p>}
        </div>
        , State
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "state" in validationErrors && <p>{validationErrors.state}</p>}
        </div>
      </label>
      <br />
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
        , Longitude
        <input
          type="text"
          name="lng"
          value={lng}
          min={-180}
          max={180}
          onChange={(e) => setLng(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "description" in validationErrors && (
            <p>{validationErrors.description}</p>
          )}
        </div>
      </label>
      <br />
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "name" in validationErrors && <p>{validationErrors.name}</p>}
        </div>
      </label>
      <br />
      <label>
        Price
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "price" in validationErrors && <p>{validationErrors.price}</p>}
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
        <div className="validation-errors">
          {submitted && "mainImage" in validationErrors && `${validationErrors.mainImage}`}
        </div>
      </label>
      <label>
        <input
          type="text"
          placeholder="Image URL"
          value={img1}
          onChange={(e) => setImg1(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "img1" in validationErrors && `${validationErrors.img1}`}
        </div>
      </label>
      <label>
        <input
          type="text"
          placeholder="Image URL"
          value={img2}
          onChange={(e) => setImg2(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "img2" in validationErrors && `${validationErrors.img2}`}
        </div>
      </label>
      <label>
        <input
          type="text"
          placeholder="Image URL"
          value={img3}
          onChange={(e) => setImg3(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "img3" in validationErrors && `${validationErrors.img3}`}
        </div>
      </label>
      <label>
        <input
          type="text"
          placeholder="Image URL"
          value={img4}
          onChange={(e) => setImg4(e.target.value)}
        />
        <div className="validation-errors">
          {submitted && "img4" in validationErrors && `${validationErrors.img4}`}
        </div>
      </label>
      <br />
      <button type="submit">Create Spot</button>
    </form>
  );
};

export default SpotForm;
