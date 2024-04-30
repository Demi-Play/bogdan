import { Button, Card, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Registration = () => {
    const [data, setData] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        number: '',
        email: '',
        password: '',
        // isAdmin: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/reg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            setData(data)
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            {Array.isArray(data) ? <Typography variant='h6' color='success'>Вы успешно зарегистрированы, пожалуйста пройдите авторизацию</Typography> :
                <>
                    <div>
                        <TextField required type="text" name="name" label="Имя" value={formData.name} onChange={handleChange} />
                        <TextField required type="text" name="surname" label="Фамилия" value={formData.surname} onChange={handleChange} />
                    </div>
                    <div>
                        <TextField required type="text" name="number" label="Номер" value={formData.number} onChange={handleChange} />
                        <TextField required type="email" name="email" label="Почта" value={formData.email} onChange={handleChange} />
                    </div>
                    <TextField required type="password" name="password" label="Пароль" value={formData.password} onChange={handleChange} />
                    <Button sx={{ backgroundColor: '#ff9100' }} color='success' aria-required variant='contained' onClick={handleSubmit}>Зарегистрироваться</Button>
                </>
            }
        </>
    );
};

export default Registration;