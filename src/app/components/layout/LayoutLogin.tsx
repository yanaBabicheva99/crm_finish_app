import React from 'react';
import loginImg from '../../assets/img/layout/login.jpg';

import style from './LayoutLogin.module.scss';

const LayoutLogin = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={style.layout__wrapper}>
            {children}
            <div className={style.layout__img}>
                <img src={loginImg} alt="Justice CRM"/>
            </div>
        </div>
    );
};

export default LayoutLogin;