import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router';
import Header from './components/Header';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firestore'
import MostPopular from './components/MostPopular';

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
        <Route path='/' element={<div>Home</div>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path="/post/:userId/:postIndex" element={<PostPage />} />
      </Routes>
    </Router>
    
    
  );
}

export default App;
