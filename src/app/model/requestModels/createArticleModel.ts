import { Language } from "../../enum/Language";

export class CreateArticleModel {
    public title : string; 
    public titleImage : string;
    public language : Language;
    public text : string;
}