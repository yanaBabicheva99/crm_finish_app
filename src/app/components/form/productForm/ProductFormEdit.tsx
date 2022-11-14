import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import InputForm from '../inputForm/InputForm';
import { useChangeProductMutation, useGetAllProductsQuery } from '../../../service/ProductServices';

import style from '../../modal/Modal.module.scss';
import styleForm from '../form.module.scss';
import {IProduct, IProductEditProp} from "../../../types/Product";

const AddProductSchema = Yup.object().shape({
    store: Yup
        .string()
        .required('Store is required')
        .min(2, 'Store is too short!')
        .max(25, 'Store is too long!'),
    price: Yup
        .string()
        .required('Price is required')
        .matches(
            /^(0|[1-9]\d*)$/,
            'Price is incorrect'
        )
        .matches(
            /^[1-9]{1}[0-9]*$/,
            'Price is incorrect'
        ),
    productName: Yup
        .string()
        .required('Product Name is required')
        .min(2, 'Product Name is too short!')
        .max(25, 'Product Name is too long!'),
    category: Yup
        .string()
        .required('Product Category is required')
        .min(2, 'Product Category is too short!')
        .max(25, 'Product Category is too long!'),

    remains: Yup
        .string()
        .required('Quantity of goods is required')
        .matches(
            /^(0|[1-9]\d*)$/,
            'Quantity of goods is incorrect'
        )
        .matches(
            /^[1-9]{1}[0-9]*$/,
            'Quantity of goods is incorrect'
        ),
    weight: Yup
        .string()
        .required('Weight is required')
        .matches(
            /^(0|[1-9]\d*)$/,
            'Weight is incorrect'
        )
        .matches(
            /^[1-9]{1}[0-9]*$/,
            'Weight is incorrect'
        )
});
const ProductFormEdit = ({handleVisible, data}: IProductEditProp) => {
    const {
        _id,
        creationData,
        quantity,
        __v,
        user,
        lastSalePrice,
        day,
        lastSale,
        revenue,
        delete: deleteProduct,
        ...dataProduct} = data;

    const { data: oldProduct, error, isLoading } = useGetAllProductsQuery(undefined, {
        selectFromResult: ({ data, error, isLoading }) => ({
            data: data?.find((item) =>  item._id === _id),
            error,
            isLoading
        }),
    });

    const [changeProduct, {}] = useChangeProductMutation();

    const initialValues = dataProduct;


    const Edit = async (data: Pick<IProduct, 'store' | 'productName' | 'category' | 'price' | 'weight' | 'remains'>) => {
        const content = {_id, ...data};

        if (oldProduct) {
            const {_id:productId, __v, ...product } = oldProduct;

            const changedProduct = {
                ...product,
                ...data
            };

            await changeProduct({id: content._id, content: changedProduct});
            handleVisible();
        }
    };

    return (
        <>
            <header className={style.modal__header}>
                <h2 className={style.modal__title}>
                    Editing a product
                </h2>
            </header>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={AddProductSchema}
                onSubmit={Edit}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit
                  }) => (
                    <form className={styleForm.form} onSubmit={handleSubmit}>
                        <InputForm
                            label='Store'
                            name='store'
                            value={values.store}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.store}
                            errors={errors.store}
                        />

                        <InputForm
                            label='Price'
                            name='price'
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.price}
                            errors={errors.price}
                        />
                        <InputForm
                            label='Product name'
                            name='productName'
                            value={values.productName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.productName}
                            errors={errors.productName}
                        />
                        <InputForm
                            label='Product Category'
                            name='category'
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.category}
                            errors={errors.category}
                        />
                        <InputForm
                            type='number'
                            label='Quantity of goods'
                            name='remains'
                            value={values.remains}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.remains}
                            errors={errors.remains}
                        />
                        <InputForm
                            label='Weight'
                            name='weight'
                            placeholder='Weight / Volume of one item'
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.weight}
                            errors={errors.weight}
                        />
                        <button
                            className={[styleForm.form__btn, styleForm.add].join(' ')}
                        >
                            Save changes
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
};
export default ProductFormEdit;