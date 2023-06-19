import { PostableType } from "../enum/PostableType";
import { Status } from "../enum/Status";

export class ServiceImage {
    id : number;
    title : string;
    type : PostableType;
    lastChangeDate : Date;
    publishDate : Date;
    authorId : number;
    status : Status;
    originalId? : number;
    serviceId : number;
    image : string;
}