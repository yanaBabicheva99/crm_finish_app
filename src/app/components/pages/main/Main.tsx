import React, {useCallback, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import {ColorRing} from "react-loader-spinner";

import { useGetAllProductsQuery } from '../../../service/ProductServices';
import SellForm from '../../form/productForm/SellForm';
import Modal from '../../modal/Modal';
import { Pie } from '../../Charts/Pie/Pie';
import { Bar } from '../../Charts/Bar/Bar';
import { Line } from '../../Charts/Line/Line';
import {ModalRef} from "../../../types/Modal";

import style from './Main.module.scss';
import styleTitle from '../../../style/title/Title.module.scss';

const Main = () => {
  const modalRef = useRef<ModalRef>(null);
  const lacationState = useLocation();

  const { data: products, error, isLoading: loading } = useGetAllProductsQuery();

  const soldProducts = products?.length ? products.filter(product => product.quantity) : [];
  const { id, remains } = lacationState.state || { id: null, remains: null };

  useEffect(() => {
    if (id !== null) {
      modalRef.current?.open()
    }
  }, []);

  if (loading) {
     return <ColorRing
        visible={true}
        height="70"
        width="70"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#5382E7', '#5382E7', '#5382E7', '#5382E7', '#5382E7']}
    />
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
          id !== null &&
          <Modal
              sell={true}
              ref={modalRef}
          >
            <SellForm
                id={id}
                quantity={remains}
                handleVisible={() => modalRef.current?.close()}
            />
          </Modal>
      }
    </>
  );
};

export default Main;