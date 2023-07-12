import { PostableType } from "../enum/PostableType";
import { Status } from "../enum/Status";
import { Postable } from "./postable";

export class ServiceImage implements Postable {
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