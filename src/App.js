import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router';
import Header from './components/Header';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';

function App() {
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
