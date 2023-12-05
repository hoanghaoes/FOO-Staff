import { useEffect, useState } from 'react';

const useAuth = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [token, setToken] = useState(null);

 useEffect(() => {
    const isAuth = sessionStorage.getItem('isAuthenticated');
    if (isAuth) {
      setIsAuthenticated(true);
      setToken(sessionStorage.getItem('accessKey'));
    }
 }, []);

 return { isAuthenticated, token };
};

export default useAuth;