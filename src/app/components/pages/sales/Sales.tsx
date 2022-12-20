import React, {useState, useMemo, useCallback} from 'react';
import { useMediaQuery } from '@mui/material';
import {useSelector} from "react-redux";
import {ColorRing} from "react-loader-spinner";

import SalesTable from '../../table/salesTable/SalesTable';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../Pagination';
import { useGetAllProductsQuery } from '../../../service/ProductServices';
import {getUserId} from "../../../service/TokenServices";
import {useGetUserQuery} from "../../../service/UserServices";

import style from '../../../style/title/Title.module.scss';

const Sales = () => {
    const isTablet = useMediaQuery('(max-width:1199px)');
    const [currentPage, setCurrentPage] = useState(1);

    const { data: products, isLoading: productLoading } = useGetAllProductsQuery();

    const userId = useSelector(getUserId());
    const {data: user, isLoading: userLoading} = useGetUserQuery(userId!);

    const soldProducts = useMemo(() => {
        return  products?.length ? products.filter(product => product.quantity): [];
    }, [products]);

    const count = soldProducts.length;
    const pageSize = isTablet ? 6 : 8;

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const soldProductsCrop = paginate(soldProducts, currentPage, pageSize);

    if (productLoading || userLoading) {
        return <ColorRing
            visible={true}
            height="70"
            width="70"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#5382E7', '#5382E7', '#5382E7', '#5382E7', '#5382E7']}
        />
    } else {
        return (
            <>
                {soldProductsCrop.length === 0
                    ? <div className={style.title__wrapper}>
                        <h2 className={style.title}>Sales not found</h2>
                    </div>
                    : <SalesTable
                        user={user}
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