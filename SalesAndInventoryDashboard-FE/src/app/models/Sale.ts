import { SaleItem } from "./SaleItem";

export interface Sale {
    id: number;
    date: Date;
    items: SaleItem[];
}