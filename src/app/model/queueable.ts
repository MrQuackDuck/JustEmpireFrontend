import { Status } from "../enum/Status";

export interface Queueable {
    originalId? : number;
    authorId : number;
    status : Status;
}