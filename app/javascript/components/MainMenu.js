import React from 'react';
import { Link } from "react-router-dom";

const MainMenu = () => (
  <aside className="menu">
    <p className="menu-label">
      Menu
    </p>
    <ul className="menu-list">
      <li>
        <Link to="/app">Forms</Link>
      </li>
      <li>
        <Link to="/usage">Usage</Link>
      </li>
      <li>
        <Link to="/subscription">Subscription</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
      <li>
        <a href="/users/sign_out" data-method="delete">
          Logout
        </a>
      </li>
    </ul>
  </aside>
);

export default MainMenu;
