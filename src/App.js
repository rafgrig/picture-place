import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firestore'
import Login from "./components/Login"
import Register from "./components/Register"
import WithHeader from './components/WithHeader';


function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user?.uid)
  console.log(user)
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/register' element={<Register setUser={setUser} />} />
        <Route path='*' element={<WithHeader isLogedIn={!!user} userId={user?.uid} />} />
      </Routes>
    </Router>
  );


}

export default App;
