import { PostableType } from "../enum/PostableType";
import { Status } from "../enum/Status";
import { Postable } from "./postable";

export class ServiceVersion implements Postable {
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