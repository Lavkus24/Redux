import Navbar from './Navigation/Navbar'
import { BrowserRouter as Router  , Route, Routes } from 'react-router-dom'
import React from 'react'
import About from './Navigation/About'
import AddPeople from './userActions/Addpeople'
import People from './userActions/People'
import Home from './Navigation/Home'
import Signin from './userSignIn/signin'
import AuthContextState from './Authentication/AuthContextState'
import UpdateCart from './userActions/updateCart'
import Cart from './userActions/cart'
import { QueryClient, QueryClientProvider } from 'react-query';
import Users from './user'

const queryClient = new QueryClient();

function App() {
  return (
    
    <QueryClientProvider client={queryClient}>
      <AuthContextState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/about" element={<About />} />
            <Route path="/addpeople" element={<AddPeople />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/updateCart" element={<UpdateCart />} />
            <Route path="/user/*" element={<Users />} />
          </Routes>
        </Router>
      </AuthContextState>
    </QueryClientProvider>
  );
}


export default App;
