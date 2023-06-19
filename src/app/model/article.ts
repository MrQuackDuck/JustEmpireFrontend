import { Language } from "../enum/Language";
import { PostableType } from "../enum/PostableType";
import { Status } from "../enum/Status";

export class Article {
    public id : number;
    public authorId : number = 0;
    public originalId? : number;
    public title : string; 
    public titleImage : string;
    public language : Language = Language.EN;
    public type? : PostableType;
    public text? : string;
    public status? : Status;
    public lastChangeDate? : Date;
    public publishDate? : Date;
}