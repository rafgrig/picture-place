import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Header from './components/Header';

function App() {
  return (
    
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<div>Home</div>}/>
      </Routes>
    </Router>
    
    
  );
}

export default App;
