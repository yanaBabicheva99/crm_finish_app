import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { useMediaQuery } from '@mui/material';

import ProductsTable from '../../table/productsTable/ProductsTable';
import Modal from '../../modal/Modal';
import ProductFormEdit from '../../form/productForm/ProductFormEdit';
import Pagination from '../../Pagination';
import { paginate } from '../../../utils/paginate';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../service/ProductServices';
import {IProduct} from "../../../types/Product";
import {ModalRef} from "../../../types/Modal";

import style from '../../../style/title/Title.module.scss';

const Products = () => {

  useEffect(() => {
     console.log('RENDER')
  });

  const isTablet = useMediaQuery('(max-width:1199px)');

  const modalRef = useRef<ModalRef>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

  const { data: products, error, isLoading: loading } = useGetAllProductsQuery();
  const [deleteProduct, {}] = useDeleteProductMutation();

  const allProducts = useMemo(() => {
    return products?.length ? products.filter(product => product.remains && !product.delete) : [];
  }, [products]);

  const count = allProducts.length;

  const pageSize = isTablet ? 5 : 6;

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleDelete = useCallback( async (id: string) => {
    const updateProduct = {
      delete: true
    };
    await deleteProduct({id, content: updateProduct});
  }, []);

  const handleCurrentProduct = useCallback((data: IProduct) => {
    setCurrentProduct(data);
  }, []);

  const handleOpenModal = useCallback(() => {
    modalRef.current?.open()
  }, []);

  const productsCrop = paginate(allProducts, currentPage, pageSize);

  if (loading) {
    return <h2>Loading...</h2>
  } else {
    return (
      <>
        {productsCrop.length === 0
          ? <div className={style.title__wrapper}>
            <h2 className={style.title}>Products not found</h2>
          </div>
          : <>
            <ProductsTable
              products={productsCrop}
              handleDelete={handleDelete}
              onCurrentProduct={handleCurrentProduct}
              onVisibleEdit={handleOpenModal}
            />
                  <Modal ref={modalRef}>
                    {currentProduct && (
                    <ProductFormEdit
                        data={currentProduct}
                        handleVisible={modalRef.current?.close}
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
