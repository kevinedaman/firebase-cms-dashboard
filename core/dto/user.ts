import { FirestoreDTO } from './firestore';

export interface UserDTO extends FirestoreDTO {
    firstName: string;
    lastName: string;
    email: string;
}