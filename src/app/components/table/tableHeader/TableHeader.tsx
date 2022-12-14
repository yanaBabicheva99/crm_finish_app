import React from 'react';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

import {IProductSort} from "../../../types/Product";

const TableHeader = ({columns, onSort, selectedSort}: {
        columns: any,
        onSort?: (item: IProductSort) => void,
        selectedSort?: IProductSort
    }) => {
    const handleSort = (item: string) => {
        if (selectedSort?.path === item) {
           onSort && onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            });
        } else {
             onSort && onSort({ path: item, order: 'asc' });
        }
    };

    const renderSortArrow = (selectedSort: IProductSort, currentPath: string) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === 'asc') {
                return <ArrowDropDownRoundedIcon sx={{ fontSize: 30 }} color='primary'/>;
            } else {
                return <ArrowDropUpRoundedIcon sx={{ fontSize: 30 }} color='primary' />;
            }
        }
        return null;
    }

    return (
        <thead>
        {
            onSort && selectedSort
                ? (
                <tr>
                    {Object.keys(columns).map(column => (
                        <th
                            style={{cursor: (columns[column].path === 'productName' ||
                                    columns[column].path === 'store' ||
                                    columns[column].path === 'price') ? 'pointer' : 'false'}}
                            key={column}
                            onClick={columns[column].path === 'productName' ||
                            columns[column].path === 'store' ||
                            columns[column].path === 'price'
                                ? () => handleSort(columns[column].path)
                                : undefined
                            }
                        >
                            {columns[column].name}{" "}
                            {renderSortArrow(selectedSort, columns[column].path)}
                        </th>
                    ))}
                </tr>
            )
                : (
                    <tr>
                        {Object.keys(columns).map(column => (
                            <th key={column}>{columns[column].name}</th>
                        ))}
                    </tr>
                )

        }
        </thead>
    );
};

export default TableHeader;