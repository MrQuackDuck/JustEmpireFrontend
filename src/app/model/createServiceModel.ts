import { Language } from "../enum/Language";

export class CreateServiceModel {
    title: string;
    titleImage: string;
    text: string;
    url: string;
    isDownloadable: boolean;
    categoryId: number;
    language: Language;
}