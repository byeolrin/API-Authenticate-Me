import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import MapleStoryLogo from "../../../public/maplestoryicon.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar-container">
      <div className="left-side-of-nav-bar">
        <NavLink to="/">
          <img className="FrontPageLogo" src={MapleStoryLogo} />
        </NavLink>
        <NavLink to="/">
          <p className="logo-title">MapleBnB</p>
        </NavLink>
      </div>
      <div className="right-side-of-nav-bar">
        {sessionUser && (
          <NavLink to="/spots/new" className="nav-bar-create-a-spot">
            Create a New Spot
          </NavLink>
        )}
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
