import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Test from "./components/Test";
import {Product} from "./components/Product/Product";


const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>

                    <Route path="/home" element={<Homepage/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/navbar" element={<Navbar/>}/>
                    <Route path="/Product" element={<Product/>}/>



                    <Route path="/test" element={<Test/>}/>





                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
