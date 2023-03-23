import React, {useState} from "react";
import styled from "styled-components";
import {Button} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import {backendUrl} from "../config";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    //button to login
    const submitLogin = (e) => {
        e.preventDefault();
        const data = {username, password}

        //make a post request with the user data
        axios.post(`${backendUrl}/user/login`, data)
            .then(res => {
                console.log("Response:", res);
                console.log("Data:", res.data);


                const {token} = res.data;
                const decoded = jwt_decode(token);
                console.log(decoded.username);

                // Save in local storage
                localStorage.setItem("token", token);
                localStorage.setItem("user_id", decoded._id);
                localStorage.setItem("username", decoded.username);
                localStorage.setItem("userType", decoded.userType);



                // Navigate to home page after successful login
                navigate('/');

            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data) {
                    //set invalid message
                    setError(err.response.data.message);
                } else {
                    setError("An error occurred");

                }
                console.log(error);
            });

    }


    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form  onSubmit={submitLogin}>
                    <Input placeholder="username" type="text" onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>

                    <Input placeholder="password" type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>

                    <Button style={{
                        width: "50%",
                        border: "none",
                        padding: "15px",
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer",
                        margin: "10px",
                    }}
                            type="submit"
                            /* onClick={submitLogin}> */
                        >
                        Log In
                    </Button>

                    {/*<button*/}
                    {/*onClick={submitLogin}/>*/}
                    {/*Log In*/}
                    {/*<button type="submit"   onClick={submitLogin}>Login</button>*/}

                    {error && <div>{error}</div>}
                </Form>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
width: 100vw;
height: 50vh;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: #f5fbfd;;
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
display: flex;
align-items: center;
justify-content: center;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
flex-direction: column;
align-items: center;
`;

const Input = styled.input`
flex: 1;
width: 500px;
margin: 20px 10px 0px 0px;
padding: 10px;
text-align: center
`;


export default Login;
