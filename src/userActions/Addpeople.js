import React , {useState , useContext} from "react";
import '../userSignIn/signin.css'
import { useNavigate } from 'react-router-dom';
import AuthContext from "../Authentication/AuthContext";
import { useDispatch } from "react-redux";
import { setCart } from "../Redux/Slice/cartSlice";

const AddingPeopleForm = () => {
  
    const data = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
            name: '',
            email: '',
            state: '',
            city: '',
            pinCode:''
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
      console.log(' peopleData ' ,  formData);
      dispatch(setCart(formData));
      const response = await fetch(`http://localhost:3001/addpeople/${data.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
       
    
  
      if (response.ok) {
        console.log('User added successfully');
       
        navigate('/people');
        // Handle success (e.g., show a success message)
      } else {
        console.error('Error saving user');
        // Handle error (e.g., show an error message)
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
            <label htmlFor="city">City:</label>
            <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            />
        </div>

        <div>
            <label htmlFor="state">State:</label>
            <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            />
        </div>
        <div>
            <label htmlFor="pinCode">Pincode:</label>
            <input
            type="number"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
            />
        </div>

        <button type="submit">Submit</button>
    </form>
    )
}

export default AddingPeopleForm