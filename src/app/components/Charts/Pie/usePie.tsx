import React, {useState, useEffect} from 'react';

import { getData } from '../../../utils/Products';
import {IProduct, IProductSold} from "../../../types/Product";


export const usePie = (arrOptions: IProduct[]) => {

    const dayNow = getData();

    const [soldProducts, setSoldProducts] = useState<IProductSold[]>([]);

    useEffect(() => {
        const soldProductsToday = arrOptions.filter(product => product.lastSale === dayNow);
        const data = soldProductsToday.map(product => {
            return {
                value: product.quantity,
                name: product.productName
            }
        });
        setSoldProducts(data)
    }, [arrOptions]);

    const options = {
        title: {
            text: 'Sales schedule by day',
            left: 'left',
            top: '0px',
            color: '#2B3844',
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: 'Inter',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            icon: 'circle',
            top: '23%',
            orient: 'vertical',
            itemWidth: 10,
            right: '13%',
            itemGap: 15,
            color: '#2B3844'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['0%', '70%'],
                left: -20,
                bottom: 0,
                top: 10,
                width: 250,
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                    }
                },
                labelLine: {
                    show: false
                },
                data: soldProducts
            }
        ]
    }

    return {soldProducts, options}
};


