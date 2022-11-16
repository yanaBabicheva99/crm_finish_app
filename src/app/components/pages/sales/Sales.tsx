import React, {useState, useMemo, useEffect, useCallback} from 'react';
import { useMediaQuery } from '@mui/material';

import SalesTable from '../../table/salesTable/SalesTable';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../Pagination';
import { useGetAllProductsQuery } from '../../../service/ProductServices';

import style from '../../../style/title/Title.module.scss';

const Sales = () => {
    const isTablet = useMediaQuery('(max-width:1199px)');
    const [currentPage, setCurrentPage] = useState(1);

    const { data: products, error, isLoading: loading } = useGetAllProductsQuery();

    const soldProducts = useMemo(() => {
        return  products?.length ? products.filter(product => product.quantity): [];
    }, [products]);

    const count = soldProducts.length;
    const pageSize = isTablet ? 6 : 8;

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

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