import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

import Actions from '../../actions/Actions';
import TableHeader from '../tableHeader/TableHeader';
import TableBody from '../tableBody/TableBody';
import { useGetUserQuery } from '../../../service/UserServices';
import { getPrice, getWeight } from '../../../utils/Products';
import {getUserId} from "../../../service/TokenServices";

import styleBox from '../Table.module.scss';
import {IProductTableProp} from "../../../types/Product";
import {IProduct} from "../../../types/Product";

const ProductsTable = ({products, handleDelete, onSort, onCurrentProduct, selectedSort, onVisibleEdit}: IProductTableProp) => {

    const userId = useSelector(getUserId());
    const {data: user, error, isLoading: loading} = useGetUserQuery(userId!);

    if (loading) {
        return <h2>Loading...</h2>
    }

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
        price: {
            path: 'price',
            name: 'Price',
            component: (product: IProduct) => getPrice(product.price)
        },
        remains: {
            path: 'remains',
            name: 'Remains'
        },
        weight: {
            path: 'weight',
            name: 'Weight/Volume',
            component: (product: IProduct) => getWeight(product.weight)
        },
        actions: {
            path: 'actions',
            name: 'Actions',
            component: (product: IProduct) => (
                <Actions
                    element={product}
                    handleDelete={handleDelete}
                    onCurrentProduct={onCurrentProduct}
                    onVisibleEdit={onVisibleEdit}
                />
            )
        }
    }
    return(
        <div className={styleBox.box__wrapper}>
            <div className={styleBox.box}>
                <table>
                    <TableHeader selectedSort={selectedSort} onSort={onSort} columns={columns}/>
                    <TableBody columns={columns} items={products}/>
                </table>
            </div>
        </div>
    );
};

export default ProductsTable;