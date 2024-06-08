import  React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'; // Import useQuery
import { Button } from '@mui/material'; // Import Button from @mui/material

const RestaurantItems = () => {
  
  const { restaurantId } = useParams(); // Destructure userId from useParams
  // console.log('userId', restaurantId);

  const { data: items, isLoading, isError } = useQuery(['getItems', restaurantId], async () => {
    const response = await fetch(`http://localhost:3001/getItems/${restaurantId}`);
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
  console.log('items' , items);

  return (
    <div>
      <p>My name</p>
      {items && Array.isArray(items) && items.map((item) => (
        <div key={item._id}>
          <h3>{item}</h3>
          <Button size="small">Add Items</Button>
        </div>
      ))}
    </div>
  );
}

export default RestaurantItems; // Use export default to export the component
