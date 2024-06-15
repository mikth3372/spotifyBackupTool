import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getToken } from './auth';

const Callback = () =>{
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        const handleRedirect = async () =>{
            const code = new URLSearchParams(location.search).get('code');
            if(code){
                await getToken(code);
                navigate('/menu');
            }
        };
        handleRedirect();
    }, [location.search, navigate]);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    )
}

export default Callback;