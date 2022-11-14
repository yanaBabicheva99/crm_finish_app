import React from 'react';
import ReactECharts from 'echarts-for-react';

import { usePie } from './usePie';

import style from '../../pages/main/Main.module.scss';
import {IProduct} from "../../../types/Product";

export const Pie = ({arrOptions}: {arrOptions:IProduct[]}) => {
     const {soldProducts, options} = usePie(arrOptions);

    return (
        <>
            {soldProducts.length !== 0 && (
                    <div className={style.statistics__day}>
                        <ReactECharts option={options}/>
                    </div>
                )
            }
        </>
    )
}