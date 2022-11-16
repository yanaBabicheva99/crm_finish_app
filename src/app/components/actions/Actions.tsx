import React from 'react';
import {useNavigate} from 'react-router-dom';

import {ReactComponent as IconEdit} from '../../assets/img/action/edit.svg';
import {ReactComponent as IconDelete} from '../../assets/img/action/delete.svg';

import style from './Actions.module.scss';
import {IProduct, IProductActionProp} from "../../types/Product";


const Actions = ({element, handleDelete, onCurrentProduct, onVisibleEdit}: IProductActionProp) => {
    const navigate = useNavigate();

    const handleClickChange = () => {
        onCurrentProduct(element);

        if (onVisibleEdit) {
            onVisibleEdit();
        }
    }
    const handleClickSell = (element: IProduct) => {
        navigate('/', {
                state: {
                    id: element._id,
                    remains: element.remains

            }
        })
    }
    return (
        <div className={style.actions}>
            <button
                className={style.action}
                onClick={() => handleClickSell(element)}
            >
                Sell
            </button>
            <button
                className={style.action}
                onClick={handleClickChange}
            >
                <IconEdit />
            </button>
            <button
                className={style.delete}
                onClick={() => handleDelete(element._id)}
            >
                <IconDelete />
            </button>
        </div>
    );
};

export default Actions;