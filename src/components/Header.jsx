import { Link, useLocation, useNavigate } from "react-router-dom";
import profilePic from "../assets/profilePic.png"
import "./Header.css"
import { auth } from "../firestore";
import { signOut } from "firebase/auth";

function Header({ isLogedIn }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  return (
    <header style={{ backgroundColor: "#FFC546" }}>
      <div className="wrapper">
        <Link style={{ backgroundColor: pathname === "/" ? "black" : null, color: pathname === "/" ? "#FFC546" : "black", }} to="/">Home</Link>
        <Link style={{ backgroundColor: pathname === "/contact" ? "black" : null, color: pathname === "/contact" ? "#FFC546" : "black", }} to="/contact">Contact Us</Link>
        <Link style={{ backgroundColor: pathname === "/about" ? "black" : null, color: pathname === "/about" ? "#FFC546" : "black", }} to="/about">About Us</Link>
        <Link to={isLogedIn ? "/profile" : "/login"}><img src={profilePic} alt="profile_picture" /></Link>
        <button style={{ display: isLogedIn ? "block" : "none" }} onClick={handleLogout}>Log Out</button>
      </div>

    </header>
  )
}

export default Header