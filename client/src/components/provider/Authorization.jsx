import { Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log(data);
        if (data.message === 0) {
            alert('Такого пользователя не существует, пожалуйста пройдите регистрацию!')

        } else {
            navigate(`/${data.email}/products`)
            Cookies.set('userId', data.id)
        }
    };

    return (
        <>
            <TextField required type="email" label="Почта" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField required type="password" label="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button sx={{ backgroundColor: '#ff9100' }} color='success' aria-required variant='contained' onClick={handleLogin}>Войти</Button>
        </>
    );
};

export default Authorization;
