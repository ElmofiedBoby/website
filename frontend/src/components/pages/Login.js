import React from 'react';
import './Login.css';
import { motion } from "framer-motion"
import {useLocation, Navigate} from "react-router-dom";
import { useState , useEffect } from 'react';

const useFetch = url => {
    const [data, setData] = useState(null);
  
    async function fetchData() {
        const response = await fetch(url);
        setData(await response.json());
    }
  
    useEffect(() => {fetchData()},[]);
  
    return data;
}

function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}  

const Login = () => {
    let formattr = {action: window.localStorage.getItem('api')+'login', method: 'POST'};
    let token = new URLSearchParams(useLocation().search).get('token');
    window.localStorage.setItem('token', token);
    let logindata = useFetch(window.localStorage.getItem('api')+'login/?token='+token);

    if(token === null) {
        return (
            <><motion.div exit={{ opacity: 0 }}>
            <br/><br/>
            <div class="post">
                <h1>Login</h1>
                <form {...formattr}>
                    <label>Username: </label><input name="username" type="text"/><br/><br/>
                    <label>Password: </label><input name="password" type="password"/><br/><br/>
                    <input type="submit" value="Log in!"/>
                </form>
            </div>
            </motion.div></>
        );
    }
    else {
        sleep(1000).then(() => {
            if(logindata['loggedIn']) {
                window.localStorage.setItem('loggedIn', true);
                return <Navigate to="/"/>
            }
            else {
                window.localStorage.setItem('token', null);
                return <Navigate to="/login"/>
            }
        });
    }
}

export default Login;