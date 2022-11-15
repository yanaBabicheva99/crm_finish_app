import React, { useState, useRef } from 'react';

import Menu from '../menu/Menu';
import Modal from '../modal/Modal';
import ProductFormAdd from '../form/productForm/ProductFormAdd';
import { ReactComponent as IconBtn } from '../../assets/img/layout/btn.svg';
import {useModal} from '../../hooks/useModal';
import Burger from '../Burger';
import {ILayoutProp} from "../../types/Layout";


import style from './Layout.module.scss';
import { useMediaQuery, Drawer } from '@mui/material';

const Layout = ({children, title, subtitle}: ILayoutProp) => {
   const isMobile = useMediaQuery('(max-width:599px)');

   const {visible, handleOpen, handleClose} = useModal()!;

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
                        onClick={() => handleOpen('create')}
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
                {
                    isMobile
                    ?  <Drawer
                            open={visible.create}
                            onClose={() => handleClose('create')}
                        >
                            <ProductFormAdd
                                handleVisible={() => handleClose('create')}
                            />
                        </Drawer>

                    :      <Modal
                            visible={visible.create}
                            handleVisible={() => handleClose('create')}
                        >
                            <ProductFormAdd
                                handleVisible={() => handleClose('create')}
                            />
                        </Modal>
                }
            </>
        </div>
    );
};

export default Layout;