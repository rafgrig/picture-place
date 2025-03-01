import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firestore";
import "./authStyles.css";
import { Link, useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Register({ setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nickName, setNickName] = useState("")
    const [profilePic, setProfilePic] = useState("")
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

    const createUser = async (userId, userData) => {
        try {
            await setDoc(doc(db, "users", userId), userData)
        } catch (e) {
            console.log(e)
        }
    }

    const onRegisterClick = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                return createUser(user.uid, { 'email': email, 'nick_name': nickName, 'posts': [], 'profile_pic': profilePic })

            }).then(() => {
                navigate("/profile")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }

    return (
        <div className="container">
            <h2>REGISTER</h2>
            <div className="card">
                <div className="cardRegister">
                    <br />

                    <p style={{ fontSize: 35 }} >Nick Name</p>
                    <input
                        className="authInp"
                        type="text"
                        placeholder="Enter your Nick Name"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                    />
                    <br />
                    <br />

                    <p style={{ fontSize: 35 }} >Profile Picture</p>
                    <input
                        className="authInp"
                        type="text"
                        placeholder="Enter your Profile picture as URL"
                        value={profilePic}
                        onChange={(e) => setProfilePic(e.target.value)}
                    />
                    <br />
                    <br />

                    <p style={{ fontSize: 35 }} >Email</p>
                    <input
                        className="authInp"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                        position: "absolute", marginLeft: "-20px", top: "29.4rem"
                    }} onClick={() => { setIsShowing(!isShowing) }}>{isShowing ? <VisibilityOffIcon /> : <VisibilityIcon />}</button>

                    <button class="button-container" onClick={onRegisterClick} > Register</button>
                    <p className="link">Already have an account? <Link style={style} className="authLink" to="/login">Log in!</Link> </p>
                </div>

            </div>
        </div >
    )
}
export default Register