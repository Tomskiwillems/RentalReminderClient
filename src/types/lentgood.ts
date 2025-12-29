import { BaseResponseDto } from "./BaseResponseDto";
import { ContactResponse } from "./contact";
import { ItemResponse } from "./item";
import { CurrencyResponse } from "./currency";

export interface LentGoodResponse extends BaseResponseDto {
    id: number;
    contact?: ContactResponse;
    item?: ItemResponse;
    currency?: CurrencyResponse;
    amount?: number;
    endDate?: string;
    startDate: string;
}

export interface LentGoodsResponse extends BaseResponseDto {
    lentGoods: LentGoodResponse[];
}

export interface LentGoodAddDataResponse extends BaseResponseDto {
    contacts: ContactResponse[];
    items: ItemResponse[];
    currencies: CurrencyResponse[];
}

export interface LentGoodEditDataResponse extends LentGoodAddDataResponse {
    lentGood?: LentGoodResponse;
}

export interface LentGoodAddResponse extends BaseResponseDto {}

export interface LentGoodEditResponse extends BaseResponseDto {}

export interface LentGoodDeleteResponse extends BaseResponseDto {}
