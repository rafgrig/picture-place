import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router';
import Header from './components/Header';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firestore'
import AboutUs from './components/AboutUs';  
import ContactUs from './components/ContactUs'; 
import HomePage from './components/HomePage';
import NewsPageFirst from './components/NewsPageFirst';
import NewsPageSecond from './components/NewsPageSecond';
import NewsPageThird from './components/NewsPageThird';

function App() {
    useEffect(() => onAuthStateChanged(auth, (user) => {    
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    }), [])
  return (
    
    <Router>
     <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path="/post/:userId/:postIndex" element={<PostPage />} />
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/news/1" element={<NewsPageFirst/>}/>
        <Route path="/news/2" element={<NewsPageSecond/>}/>
        <Route path="/news/3" element={<NewsPageThird/>}/>
      </Routes>
    </Router>
    
    
  );
}

export default App;
