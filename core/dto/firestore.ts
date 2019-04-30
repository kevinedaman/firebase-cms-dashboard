import { firestore } from 'firebase';

export interface FirestoreDTO {
    archived: boolean;
    createdBy: string;
    createdOn: firestore.Timestamp;
    id: string;
    lastUpdatedOn: firestore.Timestamp;
}