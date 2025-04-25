import { NavLink } from 'react-router-dom';
import clsx from "clsx";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={css.header}>
      <NavLink className={({ isActive }) => clsx(css.navLinks, isActive && css.active)} to="/">Home</NavLink>
      <NavLink className={({ isActive }) => clsx(css.navLinks, isActive && css.active)} to="/movies">Movie</NavLink>
    </header>
  )
}

export default Navigation
