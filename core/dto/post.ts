import { FirestoreDTO } from './firestore';
import { firestore } from 'firebase';

export interface PostDTO extends FirestoreDTO {
    name: string;
    author: string;
    permalink: string;
    published: boolean;
    publishedOn: firestore.Timestamp;
    content: string;
}