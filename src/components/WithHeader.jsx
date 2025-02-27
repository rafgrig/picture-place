import { Route, Routes } from "react-router";
import Header from "./Header";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import PostPage from "./PostPage";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import HomePage from "./HomePage";
import Footer from "./Footer";


function WithHeader({ isLogedIn, userId }) {
    return (
        <>
            <Header isLogedIn={isLogedIn} />

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/profile' element={<Profile userId={userId} />} />
                <Route path='/create' element={<CreatePost userId={userId} />} />
                <Route path="/post/:userId/:postIndex" element={<PostPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs userId={userId} />} />
            </Routes>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default WithHeader