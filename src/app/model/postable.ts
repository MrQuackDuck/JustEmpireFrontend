import { PostableType } from "../enum/PostableType";
import { Queueable } from "./queueable";

export interface Postable extends Queueable {
    id : number;
    title : string;
    type : PostableType;
    lastChangeDate : Date;
    publishDate : Date;
}