
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
// import * as React from 'react';

import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";

import AuthContext from '../Authentication/AuthContext';




const UserList = () => {
  // const [users, setUsers] = useState([]);
  const cart = useContext(AuthContext);


  const { data: users, isLoading, isError } = useQuery('people', async () => {
    const response = await fetch('http://localhost:3001/people');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    });

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (isError) {
      return <p>Error fetching data</p>;
    }
    
  return (

    <div>
    <h1>User List</h1>
    <ul style={{display:'flex' , flexDirection:'column'}}>
      {users.map((user) => (
             <Card key={user._id} sx={{ maxWidth: 275}}>
             <CardContent>
               <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                 {user.name}
               </Typography>
               <Typography sx={{ mb: 1.5 }} color="text.secondary">
               {user.email}
               </Typography>
               <Typography variant="body2">
                 well meaning and kindly.
                 <br />
                 {'"a benevolent smile"'}
               </Typography>
             </CardContent>
             <CardActions>
               <Button size="small" 
                onClick={() =>{
                      cart.setAddPeople([
                          ...cart.addpeople , {name : user.name , email : user.email}
                      ])
                }

               }>Add to Cart</Button>
             </CardActions>
           </Card>
      ))}
    </ul>
  </div>
   
  );
};

export default UserList;
