export interface BiblioFine {
    fineAmount: number;
    fineReason: FineReason;
    lendingInfoId: string;
}


export enum FineReason {
    BookRuined = 1,
    BookOverdue = 2,
    BookRuinedAndOverdue = 3
}