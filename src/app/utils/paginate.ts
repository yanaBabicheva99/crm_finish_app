import {IProduct} from "../types/Product";

export function paginate(items: IProduct[], pageNumber: number, pageSize: number) {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
}
