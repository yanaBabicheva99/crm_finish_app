import React, {FC} from 'react';
import _ from 'lodash';

import style from './Pagination.module.scss';
import {IPagination} from "../types/Product";

const Pagination: FC<IPagination<number>> = ({itemsCount, currentPage, onPageChange, pageSize}) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <div className={style.pagination__wrapper}>
            <ul className={style.pagination}>
                {pages.map(page => (
                    <li
                        key={page}
                        className={currentPage === page ? [style.pagination__item, style.active].join(' ') : style.pagination__item}
                        onClick={() => onPageChange(page)}
                    >{page}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;