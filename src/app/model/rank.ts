export class Rank {
    public id: number;
    public name: string;
    public weight: number;
    public createPostable: boolean;
    public editPostableOwn: boolean;
    public deletePostableOwn: boolean;
    public approvementToCreatePostable: boolean;
    public approvementToEditPostableOwn: boolean;
    public approvementToDeletePostableOwn: boolean;
    public editPostableOthers: boolean;
    public deletePostableOthers: boolean;
    public approvementToEditPostableOthers: boolean;
    public approvementToDeletePostableOthers: boolean;
  }