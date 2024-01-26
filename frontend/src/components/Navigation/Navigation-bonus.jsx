import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
// import { FaStar } from 'react-icons/fa';
import MapleStoryLogo from '../../../public/maplestoryicon.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/"><img className='FrontPageLogo' src={MapleStoryLogo}/></NavLink>
      </li>
      {sessionUser && (
        <li>
          <NavLink to="/spots/new" className="nav-bar-create-a-spot">Create a New Spot</NavLink>
        </li>
      )}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
