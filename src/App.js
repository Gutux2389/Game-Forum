import React from 'react';
import {Manageaccount} from './components/Manageaccounts';
import { Products } from './components/products';
import {Chosenproduct} from './components/chosenproduct';
import { Route,Routes } from 'react-router-dom';
import Nav from './components/navigation';
import Home from './components/home';
import { useState } from 'react';
import { Profile } from './components/profile';
function App(){
  const [pic,setPic] = useState('');
  return(
    <>
      <Nav pic={pic.name}/>
        <Routes>
            <Route path="/home" element={<Home />} />
						<Route path="/products/:name" element={<Chosenproduct />}/>
            <Route path="products" element={<Products />}/>
            <Route path="/profile" element={<Profile getProfilePic={setPic}/>} />
				</Routes>
    </>
  )
}
export default App;