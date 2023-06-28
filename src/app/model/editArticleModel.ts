import { Language } from "../enum/Language";

export class EditArticleModel {
    public id : number;
    public title : string; 
    public titleImage : string;
    public language : Language;
    public text : string;
}