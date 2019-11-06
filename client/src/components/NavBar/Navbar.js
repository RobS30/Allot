import React from "react";

function Nav() {
  return (
    <nav>
      <ul className="navbar navbar-expand-lg navbar-dark bg-primary">
        <li className="navbar-brand">Allot</li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <LoggedInAs />
        <li>
          <a href="#">
            <span class="glyphicon glyphicon-log-in"></span> Login
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
