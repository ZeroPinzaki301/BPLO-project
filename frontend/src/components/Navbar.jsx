import { NavLink } from "react-router-dom";

import BploLogo from "../assets/logo/BploLogo.png";

function Navbar() {
  return (
    <nav className="bg-linear-65 from-indigo-950 via-sky-700 to-sky-950 px-6 py-4">
      <ul className="flex space-x-6 text-white">
        <li 
            className="w-[4em] h-[4em] bg-cover"
            style={{
                backgroundImage: `url(${BploLogo})`
            }}
        >    
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-blue-300"
            }
            
          >
            
          </NavLink>
        </li>
        <li className="text-[2.5em]">    
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-blue-300"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="text-[2.5em]">
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-blue-300"
            }
          >
            Create
          </NavLink>
        </li>
        <li className="text-[2.5em]">
          <NavLink
            to="/find"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-blue-300"
            }
          >
            Find
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;