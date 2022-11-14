import  {useCallback, useEffect, useState} from 'react';

import {token, id} from '../types/User';

const storageName = 'userData';

const useAuth = () => {
    const [token, setToken] = useState<token>(null);
    const [userId, setUserId] = useState<id>(null);


    const login = useCallback((jwtToken: string, id: string) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName) || '{}');
        //return JSON.parse(localStorage.getItem('user') || '');

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login]);

    return { login, logout, token, userId }
};

export default useAuth;