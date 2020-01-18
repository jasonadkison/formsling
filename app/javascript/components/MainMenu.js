import React from 'react';
import { Link } from "react-router-dom";

const MainMenu = () => (
  <nav className="navbar is-light main-menu" role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <Link className="navbar-item" to="/">Forms</Link>
        <Link className="navbar-item" to="/usage">Usage</Link>
        <Link className="navbar-item" to="/subscription">Subscription</Link>
        <Link className="navbar-item" to="/account">Account</Link>
      </div>
    </div>
  </nav>
);

export default MainMenu;
