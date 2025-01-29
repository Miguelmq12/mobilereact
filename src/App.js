import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      navigate('/landing'); 
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  return (
    <div>
      <h1>App login </h1>
    </div>
  );
}

export default App;
