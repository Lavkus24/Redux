import React from "react";
import { useQuery } from 'react-query';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import './about.css'
import { useNavigate } from 'react-router-dom';


const RestaurantList = () => {

    const navigate = useNavigate()

    const { data: users, isLoading, isError } = useQuery('getRestaurants', async () => {
        const response = await fetch('http://localhost:3001/getRestaurants');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    });
    if (isLoading) {
        return <div>Loading...</div>; // Render a loading indicator while data is being fetched
    }
    if (isError) {
        return <div>Error fetching data</div>; // Render an error message if fetching data fails
    }
    
    const handleClick = (userId) => {
         navigate(`/user/restaurantItems/${userId}`)
    }

    return (
        <div className="card-container">
            
                {users.map((user) => (
                    <Card key={user._id} className="card">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {user.restaurantName}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {user.restaurentAddress.stateName}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {user.restaurentAddress.districtName}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {user.restaurentAddress.pascalCode}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"
                                onClick={() => {handleClick(user._id)}}
                            >Go To RESTAURANTS</Button>
                        </CardActions>
                    </Card>
                ))}
          
        </div>
    );
}

export default RestaurantList;
