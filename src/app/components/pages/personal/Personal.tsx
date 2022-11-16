import React, { useContext } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import InputForm from '../../form/inputForm/InputForm';
import { AuthContext } from '../../../context/AuthContext';
import {changeUser} from "../../../validation/ValidationSchema";
import {IUserInitial} from '../../../types'
import {
  useChangeUserInfoMutation,
  useGetUserQuery,
  useUpdateUserInfoMutation
} from '../../../service/UserServices';

import style from './Personal.module.scss'

const PersonalSchema = changeUser;

const Personal = () => {
  const {userId} = useContext(AuthContext)!;
  const {data: user, error, isLoading: loading} = useGetUserQuery(userId!);
  const [changeUserInfo] = useChangeUserInfoMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Error</h2>
  }

  const { _id, __v, password, ...data } = user!;

  const initialValues: IUserInitial = { oldPassword: '', newPassword: '', ...data };

  const handleChange = async (data: IUserInitial) => {
    if (data.oldPassword && data.newPassword) {
      changeUserInfo({id: _id, content: data})
        .unwrap()
        .then((data) => toast.info('Personal data updated'))
        .catch(({data}) => toast.error(data.message))

    } else if (!data.oldPassword && data.newPassword || !data.newPassword && data.oldPassword) {
      toast.error('The password and new password fields must be filled');
    } else {
      const {oldPassword, newPassword, ...updatedData} = data;
      updateUserInfo({id: _id, content: updatedData})
        .unwrap()
        .then((data) => toast.info('Personal data updated'))
        .catch(({data}) => toast.error(data.message))
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonalSchema}
        onSubmit={handleChange}
      >{({
           values,
           errors,
           touched,
           handleChange,
           handleBlur,
           handleSubmit,
         }) => (
        <form className={style.personal_form} onSubmit={handleSubmit}>
          <div className={style.personal_form__wrapper}>
            <InputForm
              label="First Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.name}
              errors={errors.name}
            />
            <InputForm
              label="Last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.lastName}
              errors={errors.lastName}
            />
          </div>
          <div className={style.personal_form__wrapper}>
            <InputForm
              label="Company name"
              name="companyName"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.companyName}
              errors={errors.companyName}
            />
            <InputForm
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.email}
              errors={errors.email}
            />
          </div>
          <div className={style.personal_form__wrapper_single}>
            <InputForm
              label="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.address}
              errors={errors.address}
            />
          </div>
          <div className={style.personal_form__wrapper}>
            <InputForm
              label="Enter old password"
              type="password"
              name="oldPassword"
              value={values.oldPassword!}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.oldPassword}
              errors={errors.oldPassword}
            />
            <InputForm
              label="Enter a new password"
              type="password"
              name="newPassword"
              value={values.newPassword!}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.newPassword}
              errors={errors.newPassword}
            />
          </div>
          <button
            className={style.personal_form__btn}
            type="submit"
          >
            Save changes
          </button>
        </form>
      )}
      </Formik>
    </>)
};

export default Personal;

