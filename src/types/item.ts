import { BaseResponseDto } from "./BaseResponseDto";

export interface ItemResponse extends BaseResponseDto {
    id: number;
    name: string;
    description?: string;
}

export interface ItemsResponse extends BaseResponseDto {
    items: ItemResponse[];
}

export interface ItemAddResponse extends BaseResponseDto {}

export interface ItemEditResponse extends BaseResponseDto {}

export interface ItemDeleteResponse extends BaseResponseDto {}
