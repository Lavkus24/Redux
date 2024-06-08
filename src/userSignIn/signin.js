import React, { useState , useContext} from 'react';
import './signin.css'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import { useDispatch } from 'react-redux'
import { setData } from '../Redux/Slice/userSlice';


const RegistrationForm = () => {
  
  const dispatch = useDispatch();
  const  {signIn , userId , setUserId} = useContext(AuthContext)
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    Cart: {
      items: [
        
        // Add more items if needed
      ],
    },
  });
   
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(' formData ');

    dispatch(setData(formData));
    
    const response = await fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });


    const data = await response.json();
    try {
      setUserId(data.userId)
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
   
    if (response.ok) {
      console.log('User saved successfully');

      localStorage.setItem('token', data.token);
      signIn();
      navigate('/');
    } else {
      console.error('Error saving user');
    }
    
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
