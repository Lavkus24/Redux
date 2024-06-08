
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { name, email, passward } = useSelector((state) => state.form);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <ul>
        <h1>User Data</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Password: {passward}</p>
      </ul>
      <ul>
        <h1>This is my Cart Data</h1>
        {cartItems.map((cartItem, index) => (
          <li key={index}>
            <p>cartname: {cartItem.name}</p>
            <p>cartemail: {cartItem.email}</p>
            <p>cartcity: {cartItem.city}</p>
            <p>cartstate: {cartItem.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
