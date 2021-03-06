import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Nav.css'
import 'react-pro-sidebar/dist/css/styles.css';

export default ({ authenticated, currentUser, className }) => {
  return authenticated && currentUser ? (
    <header className={className}>
      <nav>
        <NavLink
          activeClassName="nav-active"
          to="/"
          onClick={() => localStorage.clear()}
        >
          Sign Out
        </NavLink>
          <h1><a href='/profile'>memento</a></h1>
      </nav>
    </header>
  ) : (
    <header className={className}>
      <div className="icon"></div>
      <nav>
        <NavLink activeClassName="nav-active" to="/register">
          Sign Up
        </NavLink>
        <NavLink activeClassName="nav-active" to="/login">
          Sign In
        </NavLink>
        <h1><a href='/profile'>memento</a></h1>
      </nav>
    </header>
  )
}
