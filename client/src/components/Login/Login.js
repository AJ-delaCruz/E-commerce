import React, {useState} from "react";
import styled from "styled-components";
import {Button} from "@mui/material";
import axios from "axios";
import {backendUrl} from "../../config";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    //button to login
    const submitLogin = (e) => {
        e.preventDefault();
        const data = {username, password}

        //make a post request with the user data
        axios.post(`${backendUrl}/user/login`, data)
            .then(res => {
                console.log(data);

            })
            .catch(err => {
                console.log(err);
                //set invalid message
                // setError(err.response);
                setError((err.response.data.message));

            });

    }


    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form>
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
                            onClick={submitLogin}>
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
