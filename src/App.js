import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router';
import Header from './components/Header';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';

function App() {
  return (
    
    <Router>
     <Header/>
      <Routes>
        <Route path='/' element={<div>Home</div>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create' element={<CreatePost/>}/>

      </Routes>
    </Router>
    
    
  );
}

export default App;
