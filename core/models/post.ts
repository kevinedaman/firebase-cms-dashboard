import { firestore } from 'firebase';
import { PostDTO } from 'dto/post';

export class Post implements PostDTO {
    archived: boolean;
    createdBy: string;
    createdOn: firestore.Timestamp;
    id: string;
    lastUpdatedOn: firestore.Timestamp;

    title: string;
    author: string;
    permalink: string;
    published: boolean;
    publishedOn: firestore.Timestamp;
    content: string;
}