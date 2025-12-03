import { BaseResponseDto } from "./BaseResponseDto";

export interface CurrencyResponse extends BaseResponseDto {
    id: number;
    name: string;
    description?: string;
}

export interface CurrenciesResponse extends BaseResponseDto {
    currencies: CurrencyResponse[];
}

export interface CurrencyAddResponse extends BaseResponseDto {}

export interface CurrencyEditResponse extends BaseResponseDto {}

export interface CurrencyDeleteResponse extends BaseResponseDto {}
