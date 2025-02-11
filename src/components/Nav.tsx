import '../index.css';
import { NavLink } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <nav className= "nav">
        <ul className= "nav-list">
          <li className= "nav-item">
             <NavLink to="/candidatesearch" className="nav-link">Candidate Search</NavLink>
          </li>
          <li className= "nav-item">
             <NavLink to="/savedcandidates" className="nav-link">Saved Candidate</NavLink>
          </li>
        </ul>
        </nav> 
    </div>
  )
};

export default Nav;
