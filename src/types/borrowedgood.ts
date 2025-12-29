import { BaseResponseDto } from "./BaseResponseDto";
import { ContactResponse } from "./contact";
import { ItemResponse } from "./item";
import { CurrencyResponse } from "./currency";

export interface BorrowedGoodResponse extends BaseResponseDto {
    id: number;
    contact?: ContactResponse;
    item?: ItemResponse;
    currency?: CurrencyResponse;
    amount?: number;
    endDate?: string;
    startDate: string;
}

export interface BorrowedGoodsResponse extends BaseResponseDto {
    borrowedGoods: BorrowedGoodResponse[];
}

export interface BorrowedGoodAddDataResponse extends BaseResponseDto {
    contacts: ContactResponse[];
    items: ItemResponse[];
    currencies: CurrencyResponse[];
}

export interface BorrowedGoodEditDataResponse extends BorrowedGoodAddDataResponse {
    borrowedGood?: BorrowedGoodResponse;
}

export interface BorrowedGoodAddResponse extends BaseResponseDto {}

export interface BorrowedGoodEditResponse extends BaseResponseDto {}

export interface BorrowedGoodDeleteResponse extends BaseResponseDto {}
