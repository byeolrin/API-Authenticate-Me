import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import MapleStoryLogo from '../../../public/maplestoryicon.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  // return (
  //   <ul>
  //     <li>
  //       <NavLink to="/"><img className='FrontPageLogo' src={MapleStoryLogo}/></NavLink>
  //     </li>
  //     {sessionUser && (
  //       <li>
  //         <NavLink to="/spots/new" className="nav-bar-create-a-spot">Create a New Spot</NavLink>
  //       </li>
  //     )}
  //     {isLoaded && (
  //       <li>
  //         <ProfileButton user={sessionUser} />
  //       </li>
  //     )}
  //   </ul>
  // );
  return (
    <div className='nav-bar-container'>
      <NavLink to="/"><img className='FrontPageLogo' src={MapleStoryLogo}/></NavLink>
      <div className='right-side-of-nav-bar'>
      {sessionUser && (
            <NavLink to="/spots/new" className="nav-bar-create-a-spot">Create a New Spot</NavLink>
        )}
      {isLoaded && (
            <ProfileButton user={sessionUser} />
        )}
    </div>
      </div>
  )
}


export default Navigation;
