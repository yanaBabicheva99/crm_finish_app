export interface IProduct {
    _id: string;
    user: string;
    store: string;
    productName: string;
    category: string;
    price: string;
    creationData: string;
    weight: string;
    remains: number;
    day: string;
    lastSale: string;
    quantity: number;
    lastSalePrice: string;
    revenue: number;
    delete: boolean;
    __v: number
}

export interface IProductInitialAdd extends Omit<IProduct, 'remains'>{
    remains: string;
}

export interface IProductAddProp {
    handleVisible: (() => void) | undefined;
}

export interface IProductEditProp extends IProductAddProp {
    data: IProduct;
}

export interface IProductSellProp extends IProductAddProp{
    quantity: number;
    id: string
}

export interface IProductInitialSell {
   quantity: number;
   day: string
}

export interface IProductInitialEdit extends Pick<IProduct, 'store' | 'productName' | 'category' | 'price' | 'weight' | 'remains'> {

}

export interface IProductTableProp {
    products: IProduct[];
    handleDelete: (id: string) => Promise<void>;
    onCurrentProduct: (data:IProduct) => void;
    onVisibleEdit: (() => void) | undefined;
}

export interface IProductActionProp extends Omit<IProductTableProp, 'products'>{
    element: IProduct;
}

export interface IProductTableBodyProp {
    columns: any;
    items: IProduct[];
}

export interface IPagination<T> {
    itemsCount: T,
    currentPage: T,
    onPageChange: (page: T) => void,
    pageSize: T
}

export interface IProductSold {
    value: number;
    name: string
}