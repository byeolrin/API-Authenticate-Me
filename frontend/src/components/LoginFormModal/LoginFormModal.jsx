import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const inputInvalid = () => credential.length < 4 || password.length < 6;

  return (
    <>
      <h1 className="login-header">Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="validation-errors">
          {errors.message && <p>{errors.message}</p>}
        </div>
        <label className="login-field">
          <p>Username or Email</p>
          <input
            type="text"
            className="login-input"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="login-field">
          <p>Password</p>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button className='login-button' type="submit" disabled={inputInvalid()}>
          Log In
        </button>
        <br />
        <button id="demo-user-button" type="submit" onClick={handleDemo}>
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
