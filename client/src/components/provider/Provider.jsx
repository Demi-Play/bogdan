import { Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import Registration from './Registration'
import AuthBack from '../../assets/auth.png'
import Authorization from './Authorization'

export default function Provider() {
    const [switcher, setSwitcher] = useState(false)

    const handleSwitch = () => {
        setSwitcher(!switcher)
    }

    return (
        <Card sx={{ justifyContent: 'space-evenly', backgroundColor: '', display: 'flex', flexDirection: 'column', width: 800, height: 500, placeItems: 'center' }}>
            {switcher === false ?
                <Typography sx={{ color: '#ff9100' }} variant='h5'>Регистрация</Typography>
                :
                <Typography sx={{ color: '#ff9100' }} variant='h5'>Авторизация</Typography>
            }
            {switcher === false ?
                <Registration />
                :
                <Authorization />
            }
            <Button variant='text' onClick={handleSwitch}>{switcher === false ? 'Есть аккаунт?' : 'Нет аккаунта?'}</Button>
        </Card>
    )
}
