import React from 'react';

import {IInputProps} from '../../../types/Form';

import style from './InputForm.module.scss';

const InputForm = (
    {
        label,
        type = 'text',
        name,
        placeholder,
        value,
        onChange,
        onBlur,
        touched,
        errors
    } : IInputProps

) => {
    return (
        <div className={style.input__wrapper}>
            <label className={style.input__label} htmlFor={name}>{label}</label>
            <input
                className={style.input}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder || label}
                onChange={onChange}
                onBlur={onBlur}
            />
            {touched && errors && (
                <div className={style.input__error}>
                    <p>{errors}</p>
                </div>
            )}
        </div>
    );
};

export default InputForm;