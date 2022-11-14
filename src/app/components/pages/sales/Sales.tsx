import React, { useState } from 'react';

import SalesTable from '../../table/salesTable/SalesTable';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../Pagination';
import { useGetAllProductsQuery } from '../../../service/ProductServices';

import style from '../../../style/title/Title.module.scss';
import { useMediaQuery } from '@mui/material';

const Sales = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: products, error, isLoading: loading } = useGetAllProductsQuery();

    const soldProducts = products?.length ? products.filter(product => product.quantity): [];
    const count = soldProducts.length;

    const isTablet = useMediaQuery('(max-width:1199px)');
    const pageSize = isTablet ? 6 : 8;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const soldProductsCrop = paginate(soldProducts, currentPage, pageSize);

    if (loading) {
        return <h2>Loading...</h2>
    } else {
        return (
            <>
                {soldProductsCrop.length === 0
                    ? <div className={style.title__wrapper}>
                        <h2 className={style.title}>Sales not found</h2>
                    </div>
                    : <SalesTable
                        sellProducts={soldProductsCrop}
                    />
                }
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        )
    }
};

export default Sales;