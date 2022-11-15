import React, {useState, useImperativeHandle} from 'react';


import {ReactComponent as IconClose} from '../../assets/img/action/delete.svg';

import style from './Modal.module.scss';
import styleForm from "../form/form.module.scss";

interface ModalProps {
    children: React.ReactNode;
    sell?: boolean;
}

interface ModalRef {
    open: () => void,
    close: () => void
}

const Modal: React.ForwardRefRenderFunction< ModalRef, ModalProps> = ((
    {children, sell = false}, ref) => {
    const [visible, setVisible] = useState(false);

    const handleClose = () => setVisible(false);

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: handleClose
    }))

    const rootClasses = () => {
        return visible ? [style.modal, style.active].join(' ') : style.modal;
    };

    return (
            <div className={rootClasses()} onClick={handleClose}>
                <div className={!sell ? style.modal__content_wrapper : ''}>
                <div className={!sell ? style.modal__content: style.modal__content_sell}
                     onClick={(e) => e.stopPropagation()}
                >
                    {children}
                    <button
                        className={!sell ? style.modal__btn : [style.modal__btn, style.sell].join(' ')}
                        onClick={handleClose}
                    >
                        <IconClose className={style.modal__btn_close}/>
                    </button>
                </div>
                </div>
            </div>
    );
});

export default React.forwardRef(Modal);