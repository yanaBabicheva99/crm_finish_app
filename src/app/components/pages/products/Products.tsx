import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import ProductsTable from '../../table/productsTable/ProductsTable';
import Modal from '../../modal/Modal';
import ProductFormEdit from '../../form/productForm/ProductFormEdit';
import { useModal } from '../../../hooks/useModal';
import Pagination from '../../Pagination';
import { paginate } from '../../../utils/paginate';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../service/ProductServices';

import { Drawer, useMediaQuery } from '@mui/material';
import style from '../../../style/title/Title.module.scss';
import {IProduct} from "../../../types/Product";

const Products = () => {

  useEffect(() => {
     console.log('RENDER')
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

  const { data: products, error, isLoading: loading } = useGetAllProductsQuery();

  // const { data: products, error, isLoading: loading } = useGetAllProductsQuery(undefined, {
  //   selectFromResult: ({ data, error, isLoading }) => ({
  //     data: data?.filter((product: IProduct) => product.remains && !product.delete),
  //     error,
  //     isLoading
  //   }),
  // });

  const [deleteProduct, {}] = useDeleteProductMutation();

  const allProducts = useMemo(() => {
    return products?.length ? products.filter(product => product.remains && !product.delete) : [];
  }, [products]);

  const count = allProducts.length;

  const { visible, handleOpen, handleClose } = useModal()!;


  const isMobile = useMediaQuery('(max-width:599px)');
  const isTablet = useMediaQuery('(max-width:1199px)');

  const pageSize = isTablet ? 5 : 6;

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const handleDelete = useCallback( async (id: string) => {
    const updateProduct = {
      delete: true
    };
    await deleteProduct({id, content: updateProduct});
  }, [deleteProduct]);


  const handleCurrentProduct = useCallback((data: IProduct) => {
    setCurrentProduct(data);
  }, [setCurrentProduct]);

  const productsCrop = useMemo(() => paginate(allProducts, currentPage, pageSize), [allProducts, currentPage])

  useEffect(() => console.log('RR'), [productsCrop])

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
              onVisibleEdit={() => handleOpen('edit')}
            />
            {
              isMobile
                ? <Drawer
                  open={visible.edit}
                  onClose={handleClose}
                >
                    { currentProduct && (
                        <ProductFormEdit
                            data={currentProduct}
                            handleVisible={() => handleClose('edit')}
                        />)
                    }
                </Drawer>
                : <Modal
                  visible={visible.edit}
                  handleVisible={() => handleClose('edit')}
                >
                  {currentProduct && (
                    <ProductFormEdit
                      data={currentProduct}
                      handleVisible={() => handleClose('edit')}
                    />)
                  }
                </Modal>
            }
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
