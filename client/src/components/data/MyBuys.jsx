import React, { useEffect, useState } from 'react';
import Navigation from '../UI/Nav';
import { Box, Card, Typography, Button } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MyBuys = () => {
    let { user } = useParams()
    const [coast, setCoast] = useState(0)
    let userid = Cookies.get('userId')

    const handleAddToCart = (id) => {
        fetch(`http://127.0.0.1:5000/product/${id}/sing`, {
            method: 'PUT',
            body: JSON.stringify({ buyerId: null, buyed: null }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('Ошибка:', error));
    }

    const [products, setProducts] = useState([]);

    useEffect(() => {
        let totalCoast = 0;
        const fetchData = async () => {
            try {
                setTimeout(async () => {
                    const response = await axios.get('http://127.0.0.1:5000/products');
                    setProducts(response.data);
                    console.log(products);
                    response.data.forEach(product => {
                        if (Number(product.buyerId) === Number(userid)) {
                            if (typeof product.cost === 'number') {
                                totalCoast += product.cost;
                                console.log(totalCoast)
                            } else if (typeof product.cost === 'string') {
                                totalCoast += parseFloat(product.cost);
                            }
                            setCoast(totalCoast);
                        }
                    });
                }, 1000);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <Card sx={{ minWidth: 1200, minHeight: 800 }}>
            <Navigation />
            <Box sx={{ marginTop: 3, marginLeft: 3, height: 50 }}>
                <Typography variant='h5'>Ваша корзина, {user}:</Typography>
            </Box>
            <Card sx={{ minWidth: 1200, minHeight: 800 }}>
                <Box sx={{ margin: 3 }}>
                    <Card sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2 }}>
                        {products.map(product => (
                            Number(product.buyerId) === Number(userid) ?
                                <Card sx={{ width: 350, height: 375, border: '1px solid', marginBottom: 2, marginRight: 5 }} key={product.id}>
                                    <img style={{ width: 250, height: 250 }} src={product.image} alt={product.name} />
                                    <Typography><strong>Название:</strong> {product.name}</Typography>
                                    <Typography sx={{ height: 50, overflow: 'hidden' }}><strong>Описание:</strong> {product.description}</Typography>
                                    <Button onClick={() => handleAddToCart(product.id)} color='error' sx={{ backgroundColor: '#ff9100' }} variant='contained'><strong>Удалить</strong></Button>
                                </Card>
                                : null
                        ))}
                    </Card>
                    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant='h5' >Сумма покупок: <strong>{coast}</strong> рублей</Typography>
                        <Button variant='contained' color='success' onClick={() => alert("Спасибо за покупку!")}>Оплатить</Button>
                    </Card>
                </Box>

            </Card>

        </Card>
    );
}

export default MyBuys;
