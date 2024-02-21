import { BiblioLendingInfo } from "./biblioLending";

export interface BiblioBook {
    id?: string;
    title: string;
    author: string;
    genre: string;
    isAvailable: boolean;
    depositAmount: number;
    rentalCostPerDay: number;
}