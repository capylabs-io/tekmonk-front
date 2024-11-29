export type SingleResponseDto<T = any> = {
    status: boolean;
    message?: string;
    value?: T
}

export type CollectionResponseDto<T = any> = {
    status: boolean;
    message?: string;
    value?: ValueReturn<T>
}

type ValueReturn<T> = {
    length: number;
    page?: number;
    pageSize?: number;
    data?: T[];
}