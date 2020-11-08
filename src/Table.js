import React from 'react';
import { Card } from '@material-ui/core';
import './Table.css';

const Table=({arr})=>{
    console.log(arr)
    return (
        <Card style={{padding:'20px',margin:'20px'}}>
            <h2><strong>Live Cases By Country</strong></h2>
            <Card className='table_card'>
            {arr.map((obj=>(
                <tr>
                    <td>{obj.name}</td>
                    <td>{obj.case}</td>
                </tr>
            )))}
        </Card>
        </Card>
    )
}

export default Table;