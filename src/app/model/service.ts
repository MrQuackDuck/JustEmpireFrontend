import { Language } from "../enum/Language";
import { PostableType } from "../enum/PostableType";
import { Status } from "../enum/Status";

export class Service {
    id : number;
    originalId? : number;
    authorId : number;
    title : string;
    titleImage : string;
    type : PostableType;
    text : string;
    language : Language;
    url : string;
    isDownloadable : boolean;
    status : Status;
    lastChangeDate : Date;
    publishDate : Date;
    categoryId : number;
}