import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import InputForm from '../inputForm/InputForm';
import {AuthContext} from '../../../context/AuthContext';
import { useSignInMutation } from '../../../service/UserServices';
import {IUser} from "../../../types/User";

import style from '../../pages/login/Login.module.scss';
import styleForm from '../form.module.scss';
import {Validation} from "../../../constants/validationConstants";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email(Validation.isInvalid).required(Validation.isRequired),
    password: Yup
        .string()
        .required(Validation.isRequired)
});

const RegisterForm = () => {
    const authContext = useContext(AuthContext);
    const [signIn] = useSignInMutation();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (content: Pick<IUser, 'email' | 'password'>) => {
        if (authContext) {
            const {login} = authContext;
            signIn(content)
                .unwrap()
                .then((data) => login(data.token, data.userId))
                .catch(({data}) => toast.error(data.message))
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >{({
                   values,
                   errors,
                   touched,
                   handleChange,
                   handleBlur,
                   handleSubmit,
               }) => (
                <form className={styleForm.form} onSubmit={handleSubmit}>
                    <InputForm
                        label='Email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.email}
                        errors={errors.email}
                    />
                    <InputForm
                        label='Password'
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.password}
                        errors={errors.password}
                    />
                    <button
                        className={styleForm.form__btn}
                    >
                        Log in
                    </button>
                </form>
            )}
            </Formik>
            <p className={style.login__link_text}>Dont have account ?
                <Link className={style.login__link} to='/register'> Sign up</Link>
            </p>
        </>
    )
};

export default RegisterForm;
