import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getToken } from './auth';

const Callback = () =>{
    const location = useLocation();

    useEffect(()=>{
        const handleRedirect = async () =>{
            const code = new URLSearchParams(location.search).get('code');
            if(code){
                await getToken(code);
                window.location.replace('/');
            }
        };
        handleRedirect();
    }, [location.search]);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}

export default Callback;