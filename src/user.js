// routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TempComponent from './Navigation/temp'
import Restaurant from './Restaurant/restaurantSignIn';
import RestaurantItem from './Restaurant/restaurantItems';
import AddItems from './Restaurant/addItems';
const RoutesConfig = () => {
  return (
    <>
    <p>This is User Page </p>
    <Routes>
        <Route path="/temp" element={<TempComponent />} />
        <Route path="/restaurantSignIn" element={<Restaurant />} />
        <Route path="/restaurantItems/:restaurantId" element={<RestaurantItem />} />
        <Route path="/addItems" element={<AddItems />} />
    </Routes>
    </>
  );
};

export default RoutesConfig;
