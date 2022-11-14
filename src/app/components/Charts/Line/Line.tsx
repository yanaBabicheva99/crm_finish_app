import React from 'react';
import ReactECharts from 'echarts-for-react';

import { useLine } from './useLine';

import style from '../../pages/main/Main.module.scss';
import {IProduct} from "../../../types/Product";

export const Line = ({ arrOptions }: {arrOptions:IProduct[]}) => {
  const { amountSoldProducts, options } = useLine(arrOptions);

  return (
    <>
      {amountSoldProducts.length !== 0 && (
        <div className={style.statistics__day}>
          <ReactECharts option={options}/>
        </div>)
      }
    </>
  )
}