export interface BiblioLendingInfo {
    id?: string;
    dateIssued?: Date;
    endDate?: Date;
    estimatedDate?: Date;
    status: LendingStatus;
    readerId?: string;
    totalCost: number;
    bookId?: string;
}

export enum LendingStatus {
    InRental = 1,
    Available = 2,
    Unavailable = 3
}