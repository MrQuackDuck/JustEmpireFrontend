import { Language } from "../enum/Language";
import { PostableType } from "../enum/PostableType";
import { Status } from "../enum/Status";

export class ServiceVersion {
    id : number;
    serviceId : number;
    originalId? : number;
    authorId : number;
    title : string;
    text : string;
    type : PostableType;
    status : Status;
    lastChangeDate : Date;
    publishDate : Date;
}