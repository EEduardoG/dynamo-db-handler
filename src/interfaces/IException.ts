export interface IException {
    code: string
    body: any
    exceptionCode: ExceptionCode
}


export enum ExceptionCode {
    BAD_REQUEST = "BAD_REQUEST",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN"
}