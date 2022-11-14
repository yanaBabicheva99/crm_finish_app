import React from 'react';

import {ILogin} from "../../../types/User";

import style from './Login.module.scss'

const Login = ({ children, title }: ILogin) => {
  return (
    <div className={style.login__wrapper}>
      <section className={style.login}>
        <header className={style.login__header}>
          <h1>{title}</h1>
        </header>
        {children}
      </section>
    </div>
  );
};

export default Login;