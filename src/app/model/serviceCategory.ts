import { Language } from "../enum/Language";
import { PostableType } from "../enum/PostableType";
import { Status } from "../enum/Status";

export class ServiceCategory { 
    id : number;
    originalId? : number;
    authorId : number;
    title : string;
    type : PostableType;
    status : Status;
    lastChangeDate : Date;
    publishDate : Date;
    language : Language;
}