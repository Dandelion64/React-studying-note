import React from 'react';
import data from './data/products.json';
import './css/MapDemo.css';

function Products() {
    return (
        <table id="products">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>PICTURE</th>
                    <th>STOCK</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>TAGS</th>
                </tr>
            </thead>
            <tbody>
                {data.map((value, index) => {
                    return (
                        <tr key={value.id}>
                            <td>{value.id}</td>
                            <td>
                                <img src={value.picture} alt="" />
                            </td>
                            <td>{value.stock}</td>
                            <td>{value.name}</td>
                            <td>{value.price}</td>
                            <td>{value.tags}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Products;
