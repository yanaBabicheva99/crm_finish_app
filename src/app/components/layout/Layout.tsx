import React, { useState, useRef } from 'react';

import Menu from '../menu/Menu';
import Modal from '../modal/Modal';
import ProductFormAdd from '../form/productForm/ProductFormAdd';
import { ReactComponent as IconBtn } from '../../assets/img/layout/btn.svg';
import Burger from '../Burger';
import {ILayoutProp} from "../../types/Layout";
import {ModalRef} from "../../types/Modal";

import style from './Layout.module.scss';


const Layout = ({children, title, subtitle}: ILayoutProp) => {
    const modalRef = useRef<ModalRef>(null);

   const [openBurger, setOpenBurger] = useState<boolean>(false);
    const handleOpenBurger = () => {
        setOpenBurger(!openBurger);
    }

    return (
        <div className={style.layout__wrapper}>
            <Menu open={openBurger}/>
            <div className={openBurger ? [style.layout, style.active].join(' ') : style.layout}>
                <Burger
                    open={openBurger}
                    onClick={handleOpenBurger}
                />
                <header className={style.layout__header}>
                    <div>
                        <h1 className={style.layout__title}>{title}</h1>
                        <p className={style.layout__subtitle}>{subtitle}</p>
                    </div>
                    <button
                        className={style.layout__btn}
                        onClick={modalRef.current?.open}
                    >
                        <IconBtn className={style.layout__btn_add}/>
                        <span>Create a product</span>
                    </button>
                </header>
                <section className={style.layout__page}>
                    {children}
                </section>
            </div>
            <>
                {<Modal ref={modalRef}>
                    <ProductFormAdd
                        handleVisible={modalRef.current?.close}
                    />
                </Modal>
                }
            </>
        </div>
    );
};

export default Layout;