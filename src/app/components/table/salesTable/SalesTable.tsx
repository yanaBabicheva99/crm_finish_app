import React from 'react';
import { Link } from 'react-router-dom';

import TableHeader from '../tableHeader/TableHeader';
import TableBody from '../tableBody/TableBody';
import { getPrice, getWeight } from '../../../utils/Products';
import {IProduct, IProductSaleProp} from "../../../types/Product";
import {IUser} from "../../../types/User";

import styleBox from '../Table.module.scss';

const SalesTable = ({user, sellProducts}: IProductSaleProp) => {

    const columns = {
        productName: {
            path: 'productName',
            name: 'Product name',
        },
        store: {
            path: 'store',
            name: 'Store'
        },
        address: {
            path: 'address',
            name: 'Address',
            component: () => user?.address || <Link to='/personal'>address</Link>
        },
        category: {
            path: 'category',
            name: 'Category'
        },
        creationData: {
            path: 'creationData',
            name: 'Creation date',
        },
        lastSalePrice: {
            path: 'lastSalePrice',
            name: 'Last sale price',
            component: (product: IProduct) => getPrice(product.lastSalePrice)
        },
        quantity: {
            path: 'quantity',
            name: 'Sold items'
        },
        weight: {
            path: 'weight',
            name: 'Weight/Volume',
            component: (product: IProduct) => getWeight(product.weight)
        },
        lastSale: {
            path: 'lastSale',
            name: 'Last sale',
        },
    }
    return(
        <div className={styleBox.box__wrapper}>
            <div className={styleBox.box}>
                <table>
                    <TableHeader columns={columns}/>
                    <TableBody columns={columns} items={sellProducts}/>
                </table>
            </div>
        </div>
    );
};

export default SalesTable;