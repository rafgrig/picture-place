import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firestore";
import "./authStyles.css";
import { Link, useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";


function Register({ setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nickName, setNickName] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const navigate = useNavigate()

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

                <p>Nick Name</p>
                <input
                    className="authInp"
                    type="text"
                    placeholder="Enter your Nick Name"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                />

                <p>Profile Picture</p>
                <input
                    className="authInp"
                    type="text"
                    placeholder="Enter your Profile picture as URL"
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                />

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

                <button class="button-container" onClick={onRegisterClick}>Register</button>
                <p className="link">Already have an account? <Link to="/login">Log in!</Link> </p>
            </div>
        </div>
    )
}
export default Register