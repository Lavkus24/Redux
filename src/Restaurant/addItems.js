import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './restaurant.css';
import { useNavigate } from 'react-router-dom';

const Restaurant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Url: '',
    Price: '',
    Description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData: ', formData);
    fetch('http://localhost:3001/restaurantAddItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          console.log('User saved successfully');
          navigate('/user/restaurantItems');
        } else {
          console.error('Error saving user');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="Center">
      <Box className="container">
        <TextField id="name" name="Name" value={formData.Name} onChange={handleChange} label="Name" variant="standard" className="input" />
        <TextField id="url" name="Url" value={formData.Url} onChange={handleChange} label="Url" variant="standard" className="input" />
        <TextField id="price" name="Price" value={formData.Price} onChange={handleChange} label="Price" type="number" variant="standard" className="input" />
        <TextField id="description" name="Description" value={formData.Description} onChange={handleChange} label="Description" type="text" variant="standard" className="input" />
        <div>
          <Button type="submit" variant="contained" className="btn">Add</Button>
        </div>
      </Box>
    </form>
  )
}

export default Restaurant;
