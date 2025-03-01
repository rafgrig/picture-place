import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firestore";
import "./authStyles.css";
import { Link, useNavigate } from "react-router";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LogIn({ setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowing, setIsShowing] = useState(false)
    const navigate = useNavigate()
    const style = {
        fontWeight: 500,
        fontSize: '20px',
        fontFamily: '"Bebas Neue", serif',
        lineHeight: '13.3px',
        letterSpacing: '0%',
        textDecoration: 'underline',
        textDecorationStyle: 'solid',
        textDecorationThickness: 'auto',
        textDecorationSkipInk: 'auto',
        margin: '15px 30px 20px 0px',
        border: 'none'
    };

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


        // 077719710
    }
    return (
        <div className="container">
            <h2>LOGIN</h2>
            <div className="card">
                <div className="cardLogin">
                    <br />
                    <br />

                    <p style={{ fontSize: 35 }}>Email</p>
                    <input
                        className="authInp"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br />
                    <br />
                    <br />

                    <p style={{ fontSize: 35 }} >Password</p>
                    <input
                        className="authInp"
                        type={isShowing ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> <button style={{
                        border: "none", backgroundColor: "transparent",
                        position: "absolute", marginLeft: "-20px", top: "21rem"
                    }} onClick={() => { setIsShowing(!isShowing) }}>{isShowing ? <VisibilityOffIcon /> : <VisibilityIcon />}</button>
                    <button className="button-container" onClick={onLogInClick}>Log In</button>
                    <p className="link">Have no account? <Link style={style} to="/register">Register!</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default LogIn