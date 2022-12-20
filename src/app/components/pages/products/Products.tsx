import React, {useCallback, useMemo, useRef, useState} from 'react';
import _ from 'lodash';
import { useMediaQuery } from '@mui/material';
import { ColorRing } from 'react-loader-spinner';
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

import ProductsTable from '../../table/productsTable/ProductsTable';
import Modal from '../../modal/Modal';
import ProductFormEdit from '../../form/productForm/ProductFormEdit';
import Pagination from '../../Pagination';
import { paginate } from '../../../utils/paginate';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../service/ProductServices';
import {IProduct, IProductSort} from "../../../types/Product";
import {ModalRef} from "../../../types/Modal";
import {getUserId} from "../../../service/TokenServices";
import {useGetUserQuery} from "../../../service/UserServices";

import style from '../../../style/title/Title.module.scss';

const Products = () => {

  const isTablet = useMediaQuery('(max-width:1199px)');

  const modalRef = useRef<ModalRef>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<IProductSort>({ path: 'productName', order: 'asc' });
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

  const { data: products, isLoading: productLoading } = useGetAllProductsQuery();
  const [deleteProduct, {}] = useDeleteProductMutation();

  const userId = useSelector(getUserId());
  const {data: user, isLoading: userLoading} = useGetUserQuery(userId!);

  const allProducts = useMemo(() => {
    const filteredProducts = products?.length ? products.filter(product => product.remains && !product.delete) : [];
        return filteredProducts.length && sortBy
        ? _.orderBy(filteredProducts, [sortBy.path],[sortBy.order])
        : filteredProducts;
  }, [products, sortBy]);

  const count = allProducts.length;

  const pageSize = isTablet ? 5 : 6;

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSort = useCallback((item: IProductSort) => {
    setSortBy(item);
  }, []);

  const handleDelete = useCallback( async (id: string) => {
    const updateProduct = {
      delete: true
    };
    deleteProduct({id, content: updateProduct})
        .unwrap()
        .catch(err => toast.error('Something went wrong, try again later'))
    ;
  }, []);

  const handleCurrentProduct = useCallback((data: IProduct) => {
    setCurrentProduct(data);
  }, []);

  const productsCrop = paginate(allProducts, currentPage, pageSize);

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
        {productsCrop.length === 0
          ? <div className={style.title__wrapper}>
            <h2 className={style.title}>Products not found</h2>
          </div>
          : <>
            <ProductsTable
              user={user}
              products={productsCrop}
              selectedSort={sortBy}
              handleDelete={handleDelete}
              onSort={handleSort}
              onCurrentProduct={handleCurrentProduct}
              onVisibleEdit={() => modalRef.current?.open()}
            />
                  <Modal ref={modalRef}>
                    {currentProduct && (
                    <ProductFormEdit
                        data={currentProduct}
                        handleVisible={() => modalRef.current?.close()}
                    />)}
                  </Modal>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        }
      </>
    )
  }
};

export default Products;
