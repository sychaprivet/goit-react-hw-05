import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

import clsx from "clsx";
const buildCssClasses = ({ isActive }) =>
  clsx(style.link, isActive && style.active);

const Navigation = () => {
  return (
    <div>
      <NavLink className={buildCssClasses} to="/">
        Home
      </NavLink>
      <NavLink className={buildCssClasses} to="/movies">
        Movies
      </NavLink>
    </div>
  );
};
export default Navigation;
