import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
    let { user } = useParams()
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/categories');
            setCategories(response.data);
            console.log(categories)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();

        const productInterval = setInterval(fetchData, 500); // Обновление продуктов каждую секунду
        const categoryInterval = setInterval(getCategories, 1000); // Обновление категорий каждые 3 секунды

        return () => {
            clearInterval(productInterval);
            clearInterval(categoryInterval);
        };
    }, []);

    const [productData, setProductData] = useState({
        buyerId: '',
        categoryId: '',
        name: '',
        description: '',
        cost: '',
        image: ''
    });
    let userid = Cookies.get('userId')

    const handleAddToCart = (id) => {
        // setProductId(!productId)
        fetch(`http://127.0.0.1:5000/product/${id}/sing`, {
            method: 'PUT',
            body: JSON.stringify({ buyerId: userid, buyed: true }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Продукт успешно добавлен, продолжайте покупки!');
            })
            .catch(error => console.error('Ошибка:', error));
    }


    return (
        <Card sx={{ minWidth: 400, minHeight: 800 }}>
            <Typography variant='h3' sx={{ marginTop: 3 }}>Каталог продуктов:</Typography>
            <Box sx={{ margin: 3 }}>
                <Card sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, flexDirection: 'column' }}>
                    {categories.map(category => (
                        <>
                            <Typography variant='h5'>{`${category.name} - ${category.description}`}</Typography>
                            <Box sx={{ margin: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {products.map(product => (
                                    category.id === product.categoryId ?
                                        <Card sx={{ width: 350, height: 375, border: '1px solid', marginBottom: 2, marginRight: 5 }} key={product.id}>
                                            <img style={{ width: 250, height: 250 }} src={product.image} alt={product.name} />
                                            <Typography><strong>Название:</strong> {product.name}</Typography>
                                            <Typography sx={{ height: 50, overflow: 'hidden' }}><strong>Описание:</strong> {product.description}</Typography>
                                            {user === 'admin' ?
                                                <Link to={`/${user}/product/edit/${product.id}`}><Button color='success' sx={{ backgroundColor: '#ff9100' }} variant='contained'><strong>Редактировать</strong></Button></Link>
                                                :
                                                <>
                                                    <Button onClick={() => handleAddToCart(product.id)} color='success' sx={{ backgroundColor: '#ff9100' }} variant='contained'><strong>Цена: </strong> {' ' + product.cost} рублей</Button>
                                                </>
                                            }
                                        </Card>
                                        : null
                                ))}
                            </Box>
                        </>
                    ))}
                </Card>

            </Box>
        </Card>
    );

};

export default ProductComponent;
