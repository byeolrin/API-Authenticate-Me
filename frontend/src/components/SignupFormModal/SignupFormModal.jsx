import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  const inputInvalid = () =>
    username.length < 4 ||
    password.length < 6 ||
    !firstName ||
    !lastName ||
    !email ||
    !confirmPassword;

  return (
    <>
      <h1 className="signup-header">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="signup-field">
          Email
          <input
            type="text"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="validation-errors">
          {errors.email && <p>{errors.email}</p>}
        </div>
        <label className="signup-field">
          Username
          <input
            type="text"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="validation-errors">
          {errors.username && <p>{errors.username}</p>}
        </div>
        <label className="signup-field">
          First Name
          <input
            type="text"
            className="signup-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <div className="validation-errors">
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <label className="signup-field">
          Last Name
          <input
            type="text"
            className="signup-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <div className="validation-errors">
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <label className="signup-field">
          Password
          <input
            type="password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="validation-errors">
          {errors.password && <p>{errors.password}</p>}
        </div>
        <label className="signup-field">
          Confirm Password
          <input
            type="password"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="validation-errors">
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button
          className="signup-button"
          type="submit"
          disabled={inputInvalid()}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
