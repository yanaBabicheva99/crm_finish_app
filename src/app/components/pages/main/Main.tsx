import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetAllProductsQuery } from '../../../service/ProductServices';
import SellForm from '../../form/productForm/SellForm';
import Modal from '../../modal/Modal';
import { useModal } from '../../../hooks/useModal';
import { Pie } from '../../Charts/Pie/Pie';
import { Bar } from '../../Charts/Bar/Bar';
import { Line } from '../../Charts/Line/Line';

import style from './Main.module.scss';
import { Drawer, useMediaQuery } from '@mui/material';
import styleTitle from '../../../style/title/Title.module.scss';

const Main = () => {

  const lacationState = useLocation();
  const { visible, handleOpen: handleOpenModal, handleClose } = useModal()!;

  const { data: products, error, isLoading: loading } = useGetAllProductsQuery();

  const soldProducts = products?.length ? products.filter(product => product.quantity) : [];

  // const { data: oldProduct, error, isLoading } = useGetAllProductsQuery(undefined, {
  //   selectFromResult: ({ data, error, isLoading }) => ({
  //     data: data?.find((item) =>  item._id === _id),
  //     error,
  //     isLoading
  //   }),
  // });

  const { id, remains } = lacationState.state || { id: null, remains: null };
  const isMobile = useMediaQuery('(max-width:599px)');

  const handleOpen = () => {
    handleOpenModal('sell');
  };

  useEffect(() => {
    if (id !== null) {
      handleOpen();
    }
  }, []);

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (<>
      {soldProducts.length === 0
        ? <div className={styleTitle.title__wrapper}>
          <h2 className={styleTitle.title}>Sales not found</h2>
        </div>
        : <div className={style.statistics}>
          <div className={style.statistics__column}>
            <Pie arrOptions={soldProducts}/>
            <Line arrOptions={soldProducts}/>
          </div>
          <div className={style.statistics__overview}>
            <Bar arrOptions={soldProducts}/>
          </div>
        </div>
      }
      {
        id !== null && isMobile
          ? <Drawer
            anchor="bottom"
            open={visible.sell}
            onClose={() => handleClose('sell')}
          >
            <SellForm
              id={id}
              quantity={remains}
              handleVisible={() => handleClose('sell')}
            />
          </Drawer>

          : id !== null && (
          <Modal
            sell={true}
            visible={visible.sell}
            handleVisible={() => handleClose('sell')}
          >
            <SellForm
              id={id}
              quantity={remains}
              handleVisible={() => handleClose('sell')}
            />
          </Modal>)
      }
    </>
  );
};

export default Main;