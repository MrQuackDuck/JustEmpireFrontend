import { PostableType } from "../enum/PostableType";
import { Queueable } from "./queueable";

export interface SearchPostable extends Queueable {
    id : number;
    title : string;
    text : string;
    type : PostableType;
    lastChangeDate : Date;
    publishDate : Date;
    url : string;
}