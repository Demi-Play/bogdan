import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';

const ProductEdit = () => {
    let { id } = useParams();

    const [productData, setProductData] = useState({
        buyerId: '',
        categoryId: '',
        name: '',
        description: '',
        cost: '',
        image: ''
    });

    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };
    const getCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/categories');
            setCategories(response.data);
            // console.log(categories)
        } catch (error) {
            console.error(error);
        }
    }; getCategories()

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/product/${id}`)
            .then(response => {
                const data = response.data;
                setProductData({
                    buyerId: data.buyerId,
                    categoryId: data.categoryId,
                    name: data.name,
                    description: data.description,
                    cost: data.cost,
                    image: data.image
                });
            })
            .catch(error => {
                console.error('Ошибка получения данных продукта:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://127.0.0.1:5000/product/${id}`, productData);
            alert('Продукт успешно обновлен');
        } catch (error) {
            console.error('Ошибка при обновлении продукта:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:5000/product/${id}`, { headers: { 'Content-Type': 'application/json' } });
            alert('Продукт успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
        }
    };

    return (
        <>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', minWidth: 400, gap: 1, placeItems: 'center' }}>
                <img style={{ width: 200, marginTop: 10, height: 200 }} src={productData.image} alt={productData.name} />
                <TextField disabled type="text" name="buyerId" value={productData.buyerId} onChange={handleInputChange} />
                {/* <TextField type="text" name="categoryId" value={productData.categoryId} onChange={handleInputChange} /> */}
                <select style={{ width: 210, height: 56, backgroundColor: '#fff', color: '#000' }} name="categoryId" onChange={handleChange}>
                    <option style={{ width: 210, height: 56 }} disabled value="">Выберите id категории</option>
                    {categories.map((category) => (
                        <option style={{ width: 210, height: 56, color: '#000' }} key={category.id} value={category.id}>{category.name} - {category.description}</option>
                    ))}
                </select>
                <TextField type="text" name="name" value={productData.name} onChange={handleInputChange} />
                <TextField type="text" name="description" value={productData.description} onChange={handleInputChange} />
                <TextField type="text" name="cost" value={productData.cost} onChange={handleInputChange} />
                <TextField type="text" name="image" value={productData.image} onChange={handleInputChange} />
                <Button color='success' onClick={handleUpdate}>Обновить Продукт</Button>
                <Button color='error' onClick={handleDelete}>Удалить Продукт</Button>
            </Card>
        </>
    );
};

export default ProductEdit;
