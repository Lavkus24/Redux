import React , {useContext} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';


const Navigation = () => {

  const  {isAuthenticated , signOut} = useContext(AuthContext)
  console.log(' isAuthenticated' , isAuthenticated);
  

  return (
    <nav className="navbar">
      <nav className='left-side'>
      <Link className='space' to="/">Home </Link>
      <Link className='space' to="/user">Users </Link>
      {isAuthenticated ? (<Link className='space' to="/addpeople">Add People </Link>) : (null)}
      <Link className='space' to="/about">About </Link>
      {isAuthenticated ? (<Link className='space' to="/people">People </Link>) : (null)}
      {isAuthenticated ? (<Link className='space' to="/cart">Go to Cart </Link>) : (null)}
      {isAuthenticated ? (<Link className='space' to="/updateCart">updateCart </Link>) : (null)}
      </nav>

      <div className="right-side">
        {isAuthenticated ? (
          <button className="space" onClick={signOut}>
            Sign out
          </button>
        ) : (
          <Link className="space" to="/signin">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
