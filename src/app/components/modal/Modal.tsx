import React, {useState, useImperativeHandle} from 'react';
import {useMediaQuery, Drawer} from "@mui/material";

import {ReactComponent as IconClose} from '../../assets/img/action/delete.svg';
import {ModalProps, ModalReference} from "../../types/Modal";

import style from './Modal.module.scss';

const Modal: React.ForwardRefRenderFunction< ModalReference, ModalProps> = ((
    {children, sell = false}, ref) => {
    const [visible, setVisible] = useState(false);
    const isMobile = useMediaQuery('(max-width:599px)');

    const handleClose = () => setVisible(false);

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: handleClose
    }))

    const rootClasses = () => {
        return visible ? [style.modal, style.active].join(' ') : style.modal;
    };

    return (
        <> { isMobile
            ?  <Drawer
                anchor={sell ? 'bottom' : 'left'}
                open={visible}
                onClose={handleClose}
            >
                {children}
            </Drawer>
            : <div className={rootClasses()} onClick={handleClose}>
                <div className={!sell ? style.modal__content_wrapper : ''}>
                    <div className={!sell ? style.modal__content : style.modal__content_sell}
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
        }</>
    );
});

export default React.forwardRef(Modal);