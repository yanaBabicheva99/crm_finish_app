import React from 'react';

import {IProduct, IProductTableBodyProp} from "../../../types/Product";

import '../Table.module.scss';

const TableBody = ({columns, items}: IProductTableBodyProp) => {
    const renderContent = (item: IProduct, column: any): any => {
          if (columns[column].component) {
              const component = columns[column].component;
              return component(item);
          }
          const path = columns[column].path;
          return item[path as keyof IProduct];

    }
    return (
            <tbody>
            {items.map(item => (
                <tr key={item._id}>
                    { Object.keys(columns).map(column => (
                        <td key={column}>
                            {renderContent(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
    );
};

export default TableBody;