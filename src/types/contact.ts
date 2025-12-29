import { BaseResponseDto } from "./BaseResponseDto";

export interface ContactResponse extends BaseResponseDto {
    id: number;
    name: string;
    description?: string;
}

export interface ContactsResponse extends BaseResponseDto {
    contacts: ContactResponse[];
}

export interface ContactAddResponse extends BaseResponseDto {}

export interface ContactEditResponse extends BaseResponseDto {}

export interface ContactDeleteResponse extends BaseResponseDto {}