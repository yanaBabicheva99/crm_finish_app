import React from 'react';
import { Formik } from 'formik';

import InputForm from '../inputForm/InputForm';
import { getData } from '../../../utils/Products';
import { useAddProductMutation } from '../../../service/ProductServices';
import {IProductAddProp, IProductInitialAdd} from '../../../types/Product';
import {IReset} from "../../../types/Form";
import {schemaProduct} from '../../../validation/ValidationSchema'

import style from '../../modal/Modal.module.scss';
import styleForm from '../form.module.scss';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const AddProductSchema = schemaProduct;

const ProductFormAdd = ({handleVisible}: IProductAddProp) => {
    const [addProduct, {}] = useAddProductMutation();
    const navigate = useNavigate();

    const initialValues = {
        store: '',
        price: '',
        productName: '',
        category: '',
        remains: '',
        weight: ''
    };

    const add = async (data: Pick<IProductInitialAdd, 'store' | 'price' | 'productName' | 'category' | 'remains' | 'weight'>,  {resetForm}: IReset) => {
        const updateData = {...data, remains: Number(data.remains)};
        const product = {
            ...updateData,
            creationData: getData(),
        }
        addProduct(product)
           .unwrap()
           .then(data => navigate('/products'))
           .catch((err) => toast.error('Something went wrong, try again later'))

        if (handleVisible) {
            handleVisible();
        }
        resetForm();
    };

    return (
        <>
            <header className={style.modal__header}>
                <h2 className={style.modal__title}>
                    Creating a product
                </h2>
            </header>
            <Formik
                initialValues={initialValues}
                validationSchema={AddProductSchema}
                onSubmit={add}
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
                            Add Product
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default ProductFormAdd;