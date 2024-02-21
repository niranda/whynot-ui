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
    discountAmount?: number;
    biblioFines?: BiblioFine[],
    biblioLendingInfos?: BiblioLendingInfo[],
}