import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Header from './components/Header';
import Profile from './components/Profile';

function App() {
  return (
    
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<div>Home</div>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
    
    
  );
}

export default App;
