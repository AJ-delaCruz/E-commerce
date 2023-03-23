import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import {backendUrl} from "../config";
import ProductList from "./ProductList";
// import Products from "../components/Product/Products";

const Home = () => {
    const [name, setName] = useState("");
    const userId = localStorage.getItem("user_id");


    useEffect(() => {
        const findName = async () => {
            try {
                const res = await axios.get(`${backendUrl}/user/find?userId=${userId}`);
                setName(res.data.name);
                console.log(res.data.name);

            } catch (err) {
                console.log(err);
            }
        };
        findName();
    }, [userId]);

    return (
        <div>
            <Navbar/>
            {name && <h2 style={{marginTop: "30px", marginLeft: "300px"}}>Welcome back, {name}</h2>}
            <ProductList/>

            {/*<Footer/>*/}

        </div>
    )

}
//export Home Component
export default Home;