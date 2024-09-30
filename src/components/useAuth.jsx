import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const UseAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/jwt/check', {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          navigate('/home');
        }
      } catch (error) {
        setIsLoggedIn(false);
        navigate('/login');
      }
    };
    checkLogin();
  }, [navigate]);

  return isLoggedIn;
};
export default UseAuth;