import React from "react";
import ReactECharts from 'echarts-for-react';

import {useBar} from "./useBar";
import {IProduct} from "../../../types/Product";


export const Bar = ({arrOptions}:{arrOptions:IProduct[]}) => {
    const {soldProductsDays, options} = useBar(arrOptions);

    return (
        <>
            {soldProductsDays.length !== 0 &&
                <ReactECharts
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    option={options}
                />
            }
        </>
    )
}