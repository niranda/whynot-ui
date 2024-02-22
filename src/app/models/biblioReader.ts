import { BiblioFine } from "./biblioFine";
import { BiblioLendingInfo } from "./biblioLending";

export interface BiblioReader {
    id?: string;
    firstName: string;
    lastName: string;
    surName: string;
    address: string;
    phone: string;
    email: string;
    discount: BiblioDiscount,
    biblioFines?: BiblioFine[],
    biblioLendingInfos?: BiblioLendingInfo[],
}

export interface BiblioDiscount {
    id?: string;
    discountAmount?: number;
}