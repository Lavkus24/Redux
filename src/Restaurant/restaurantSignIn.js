import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './restaurant.css';
import { useNavigate } from 'react-router-dom';
;
const Restaurant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Address : {
        State: '',
        District: '',
        PascalCode: ''
    },
    dish : []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is nested under "Address"
    if (name.startsWith("Address:")) {
        const addressField = name.split(":")[1]; // Extract the nested field name
        setFormData(prevData => ({
            ...prevData,
            Address: {
                ...prevData.Address,
                [addressField]: value // Update the nested field value
            }
        }));
    } else {
        // If the field is at the top level
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData: ', formData);
    fetch('http://localhost:3001/restaurantSignIn', {
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
        <TextField id="email" name="Email" value={formData.Email} onChange={handleChange} label="Email" variant="standard" className="input" />
        <TextField id="password" name="Password" value={formData.Password} onChange={handleChange} label="Password" type="password" variant="standard" className="input" />
        <TextField id="confirm-password" name="ConfirmPassword" value={formData.ConfirmPassword} onChange={handleChange} label="Confirm Password" type="password" variant="standard" className="input" />
        <TextField id="state" name="Address:State" value={formData.Address.State}  onChange={handleChange} label="State" variant="standard" className="input" />
        <TextField id="district" name="Address:District" value={formData.Address.District} onChange={handleChange} label="District" variant="standard" className="input" />
        <TextField id="pascal-code" name="Address:PascalCode" value={formData.Address.PascalCode} onChange={handleChange} label="Pascal Code" variant="standard" className="input" />
        <div>
          <Button type="submit" variant="contained" className="btn">Submit</Button>
        </div>
      </Box>
    </form>
  )
}

export default Restaurant;
