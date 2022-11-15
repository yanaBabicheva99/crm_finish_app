import { useEffect, useState } from 'react';

import {IProduct} from "../../../types/Product";

export const useLine = (arrOptions: IProduct[]) => {

    const [amountSoldProducts, setAmountSoldProducts] = useState<number[]>([]);

    useEffect(() => {
        const soldProducts = arrOptions.filter(product => product.revenue);

        if (soldProducts.length === 0) {
            return;
        }

        const data = soldProducts.map((product) => product.revenue);

        setAmountSoldProducts([0, ...data]);
    }, [arrOptions]);

    const options = {
        title: {
            text: 'Total earned',
            left: 'left',
            color: '#2B3844',
            top: '0px',
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: 'Inter',
            },
        },
        xAxis: {
            show: false,
            type: 'category',
            data: amountSoldProducts,
        },
        yAxis: {
            type: 'value',
            show: false
        },
        axisPointer: {
            show: false,
            type: 'none',
        },
        series: [
            {
                data: amountSoldProducts,
                type: 'line',
                color: '#1CAF7F'
            }
        ]
    };

    return {amountSoldProducts, options}
}