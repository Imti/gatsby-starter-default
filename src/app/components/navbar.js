import React from "react";
import { Link, navigate } from "gatsby";
import { useIdentityContext } from "react-netlify-identity-widget";

const NavBar = () => {
  const { user, isLoggedIn, logoutUser } = useIdentityContext();

  let message = isLoggedIn
    ? `Hello, ${user.user_metadata && user.user_metadata.full_name}`
    : "You are not logged in";

  const handleClick = async event => {
    console.log('in handle click', user, isLoggedIn, logoutUser);
    event.preventDefault();
    await logoutUser();
    navigate(`/app/login`);
  };

  return (
    <div>
      <span>{message}</span>
      <nav>
        <span>Navigate the app: </span>
        <Link to="/app/">Main</Link>
        <Link to="/app/profile">Profile</Link>
        <Link to="/app/implementations">Implementations</Link>
        {isLoggedIn ? (<a href="/" onClick={handleClick}>Logout</a>) : (<Link to="/app/login">Login</Link>)}
      </nav>
    </div>
  )
}

export default NavBar;