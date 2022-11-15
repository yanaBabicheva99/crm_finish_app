import React from 'react';
import { Formik } from 'formik';
import {toast} from "react-toastify";

import InputForm from '../inputForm/InputForm';
import { getData } from '../../../utils/Products';
import { useGetProductQuery, useUpdateProductMutation} from '../../../service/ProductServices';
import {schemaSellProduct} from '../../../validation/ValidationSchema';
import {IProductInitialSell, IProductSellProp} from "../../../types/Product";

import style from '../../modal/Modal.module.scss';
import styleForm from '../form.module.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SellForm = ({handleVisible, quantity, id}: IProductSellProp) => {

    const { data: oldProduct, error, isLoading } = useGetProductQuery(id);
    const [updateProduct, {}] = useUpdateProductMutation();

    const SellProductSchema = schemaSellProduct(quantity)

    const options = [
        {value: 'Mon', label: 'Monday'},
        {value: 'Tue', label: 'Tuesday'},
        {value: 'Wed', label: 'Wednesday'},
        {value: 'Thu', label: 'Thursday'},
        {value: 'Fri', label: 'Friday'},
        {value: 'Sat', label: 'Saturday'},
        {value: 'Sun', label: 'Sunday'},
    ];

    const day = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const initialValues = {
        quantity,
        day: days[day]
    };

    const sell = async ({quantity, day}: IProductInitialSell) => {
        if (oldProduct) {
            const product = oldProduct;
            const updatePrice = Number(product.price);

            const updatedProduct = {
                remains: product.remains - quantity || 0,
                quantity: product.quantity + quantity,
                day,
                lastSale: getData(),
                lastSalePrice: product.price,
                revenue: product.revenue + updatePrice * quantity
            };

             updateProduct({id, content: updatedProduct})
                 .unwrap()
                 .catch(err => toast.error('Something went wrong, try again later'))

            handleVisible();
        }
    };

    return (
        <>
            <header className={style.modal__header}>
                <h2 className={style.modal__title}>
                    Sell the product
                </h2>
            </header>
            <Formik
                initialValues={initialValues}
                validationSchema={SellProductSchema}
                enableReinitialize={true}
                onSubmit={sell}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleSubmit,
                      handleChange,
                      setFieldValue
                  }) => (
                    <form className={styleForm.form} onSubmit={handleSubmit}>
                        <InputForm
                            type='number'
                            label='Number of products'
                            name='quantity'
                            value={values.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.quantity}
                            errors={errors.quantity}
                        />

                        <FormControl className={style.select}>
                            <InputLabel id="demo-simple-select-autowidth-label">Day</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={values.day}
                                onChange={({target}) => setFieldValue('day', target.value)}
                                autoWidth
                                label='Day'
                            >
                                {
                                    options.map(option => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <button
                            className={[styleForm.form__btn, styleForm.add].join(' ')}
                        >
                            Sell product
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default SellForm;