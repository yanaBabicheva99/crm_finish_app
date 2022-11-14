import React from 'react';

import {ReactComponent as IconClose} from '../../assets/img/action/delete.svg';

import style from './Modal.module.scss';
import {IModal} from "../../types/Layout";

const Modal = ({children, visible, handleVisible, sell = false}: IModal) => {
    const rootClasses = () => {
        return visible ? [style.modal, style.active].join(' ') : style.modal;
    };

    return (
            <div className={rootClasses()} onClick={handleVisible}>
                <div className={!sell ? style.modal__content_wrapper : ''}>
                <div className={!sell ? style.modal__content: style.modal__content_sell}
                     onClick={(e) => e.stopPropagation()}
                >
                    {children}
                    <button
                        className={!sell ? style.modal__btn : [style.modal__btn, style.sell].join(' ')}
                        onClick={handleVisible}
                    >
                        <IconClose className={style.modal__btn_close}/>
                    </button>
                </div>
                </div>
            </div>
    );
};
export default Modal;