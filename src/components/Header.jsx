import { Link, useLocation } from "react-router-dom";
import profilePic from "../assets/profilePic.png"
import "./Header.css"

function Header() {
    const {pathname} = useLocation()
    return (
        <header style={{backgroundColor:"#FFC546"}}>
            <div className="wrapper">
                <Link style={{backgroundColor: pathname === "/" ? "black" : null, color: pathname === "/" ? "#FFC546" : "black",}} to="/">Home</Link>
                <Link style={{backgroundColor: pathname === "/contact" ? "black" : null, color: pathname === "/contact" ? "#FFC546" : "black",}} to="/contact">Contact</Link>
                <Link  style={{backgroundColor: pathname === "/about" ? "black" : null, color: pathname === "/about" ? "#FFC546" : "black",}} to="/about">About</Link>
                <Link to="/profile"><img src={profilePic} alt="profile_picture"/></Link>
            </div>
                
        </header>
    )
}

export default Header