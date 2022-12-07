import React from 'react';
import {Route, Routes as Switch, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

import Layout from "./components/layout/Layout";
import {Routes} from "./constants";
import Main from "./components/pages/main/Main";
import Products from "./components/pages/products/Products";
import Sales from "./components/pages/sales/Sales";
import Personal from "./components/pages/personal/Personal";
import Login from "./components/pages/login/Login";
import LoginForm from "./components/form/loginForm/LoginForm";
import RegisterForm from "./components/form/registerForm/RegisterForm";
import LayoutLogin from "./components/layout/LayoutLogin";
import {getToken} from "./service/TokenServices";


 const RoutesPage = () => {
    const isAuthenticated = useSelector(getToken());
    const pages = [
        {
            title: 'Sales statistics',
            subtitle: 'Welcome to CRM dashboard',
            path: Routes.MAIN,
            component: <Main />
        },
        {
            title: 'My product',
            subtitle: 'Product table',
            path: Routes.PRODUCTS,
            component: <Products />
        },
        {
            title: 'My sales',
            subtitle: 'Sales table',
            path: Routes.SALES,
            component: <Sales />
        },
        {
            title: 'Personal Cabinet',
            subtitle: 'Information about your account',
            path: Routes.PERSONAL,
            component: <Personal />
        }
    ];

    const loginPages = [
        {
            title: 'Sign in',
            path: Routes.LOGIN,
            component: <LoginForm />
        },
        {
            title: 'Create an account',
            path: Routes.REGISTER,
            component: <RegisterForm />
        },
    ];

    if (isAuthenticated) {
        return (
            <Switch>
                {
                    pages.map(item => (
                        <Route
                            key={item.title}
                            path={item.path}
                            element={
                                <Layout
                                    title={item.title}
                                    subtitle={item.subtitle}
                                >
                                    {item.component}
                                </Layout>
                            }/>
                    ))
                }
                <Route
                    path={Routes.LOGIN}
                    element={<Navigate to={Routes.MAIN} replace />}
                />
            </Switch>
        )
    }
    else {
        return (
            <Switch>
                {
                    loginPages.map(item => (
                        <Route
                            key={item.title}
                            path={item.path}
                            element={
                            <LayoutLogin>
                                <Login title={item.title}>
                                    {item.component}
                                </Login>
                            </LayoutLogin>
                            }/>
                    ))
                }
                <Route
                    path='*'
                    element={<Navigate to={Routes.LOGIN} replace />}
                />
            </Switch>
        )
    }
}

export default RoutesPage;