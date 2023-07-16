import { IEvent } from "../interfaces/IEvent";

export default interface IRequestServicePort {
    setEvent(event: any): IEvent
    setPayload(payload: any): any
    setQueryParams(event: any): any
    setToken(token: string): any
    setEventExecutionData(event: any): any
}