import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firestore";
import "./authStyles.css"; 
import { Link, useNavigate } from "react-router";

function LogIn({setUser}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onLogInClick = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                // console.log(user.uid)
                navigate("/profile")
            })
            .catch((error) => {
                console.log(error.messege)
            });

            
            
    }
    return (
        <div className="container">
            <h2>LOGIN</h2>
            <div className="card">
                <p>Email</p>
                <input
                    className="authInp"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>Password</p>
                <input
                    className="authInp"
                    type="text"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button-container" onClick={onLogInClick}>Log In</button>
                <p className="link">Have no account? <Link to="/register">Register!</Link> </p>
            </div>
        </div>
    )
} 

export default LogIn