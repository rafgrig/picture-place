import { Link, useLocation, useNavigate } from "react-router-dom";
import profilePic from "../assets/profilePic.png"
import "./Header.css"
import { auth } from "../firestore";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import picturePlaceLogo from "../images/picturePlaceLogo.png"

function Header({ isLoggedIn }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  let style = null
  let link = ''
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
    setOpen(false)
  }
  console.log(auth.currentUser)
  console.log(isLoggedIn)

  if (isLoggedIn && auth.currentUser?.isAnonymous) {
    style = { display: "none" }
    link = "/login"
  } else if (isLoggedIn) {
    style = { display: "block" }
    link = "/profile"
  } else if (!isLoggedIn) {
    style = { display: "none" }
    link = "/login"
  };
  return (
    <>
      <header style={{ backgroundColor: "#FFC546" }}>
        <div className="wrapper">
          <img onClick={() => { navigate("/") }} style={{ height: 100, position: "absolute", left: 0, cursor: "pointer" }} src={picturePlaceLogo} alt="logo" />
          <Link style={{ backgroundColor: pathname === "/" ? "black" : null, color: pathname === "/" ? "#FFC546" : "black", }} to="/">Home</Link>
          <Link style={{ backgroundColor: pathname === "/contact" ? "black" : null, color: pathname === "/contact" ? "#FFC546" : "black", }} to="/contact">Contact Us</Link>
          <Link style={{ backgroundColor: pathname === "/about" ? "black" : null, color: pathname === "/about" ? "#FFC546" : "black", }} to="/about">About Us</Link>
          <Link to={link}><img src={profilePic} alt="profile_picture" /></Link>
          <button className="logoutBtn" style={style} onClick={() => { setOpen(true) }}>Log Out</button>
        </div>
      </header>
      <Dialog open={open} onClose={() => { setOpen(false) }}>
        <DialogTitle sx={{ fontSize: 20, width: "80%", fontWeight: "bold" }}>Are you sure you want to log out?</DialogTitle>
        <DialogActions>
          <div className="btnWrapperHeader">
            <button className="commitBtn" style={{ backgroundColor: "rgb(177, 177, 177)", cursor: "pointer" }}
              onClick={handleLogout}>
              Yes</button>

            <button className="commitBtn" style={{ backgroundColor: "rgb(218, 218, 218)", cursor: "pointer" }}
              onClick={() => { setOpen(false) }}>
              No</button>
          </div>

        </DialogActions>
      </Dialog >
    </>


  )
}

export default Header