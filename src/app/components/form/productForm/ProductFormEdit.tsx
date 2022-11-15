import React from 'react';
import { Formik } from 'formik';

import InputForm from '../inputForm/InputForm';
import {useChangeProductMutation, useGetProductQuery} from '../../../service/ProductServices';
import {schemaProduct} from '../../../validation/ValidationSchema';

import style from '../../modal/Modal.module.scss';
import styleForm from '../form.module.scss';
import {IProduct, IProductEditProp} from "../../../types/Product";
import {toast} from "react-toastify";

const EditProductSchema = schemaProduct;
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

    const { data: oldProduct, error, isLoading } = useGetProductQuery(_id);

    const [changeProduct, {}] = useChangeProductMutation();

    const initialValues = dataProduct;


    const Edit = async (data: Pick<IProduct, 'store' | 'productName' | 'category' | 'price' | 'weight' | 'remains'>) => {
        const content = {_id, ...data};

        if (oldProduct) {
            const {_id: productId, __v, ...product } = oldProduct;

            const changedProduct = {
                ...product,
                ...data
            };

            changeProduct({id: content._id, content: changedProduct})
                .unwrap()
                .catch(err => toast.error('Something went wrong, try again later'))

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
                validationSchema={EditProductSchema}
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