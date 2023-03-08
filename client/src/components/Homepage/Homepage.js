import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {backendUrl} from "../../config";

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
    },[userId]);

    return(
        <div >
            <Navbar/>
            { name && <h2 style={{ marginTop: "30px", marginLeft: "300px" }}>Welcome back, {name}</h2> }


            {/*<Footer/>*/}

        </div>
    )

}
//export Home Component
export default Home;