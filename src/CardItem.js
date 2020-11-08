import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';
import './CardItem.css'

const CardItem=({ title, todayCases, total })=>{
    return (
        <div className='cards'>
            <Card varient='outlined'>
                <CardContent>
                    <Typography>{title}</Typography>
                    <h2>+{todayCases}</h2>
                    <Typography>{total} Total</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardItem;