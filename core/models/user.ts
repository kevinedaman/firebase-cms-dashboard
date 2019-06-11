import { firestore } from 'firebase';

import { UserDTO } from '../dto/user';

export class User implements UserDTO {
    archived: boolean;
    createdBy: string;
    createdOn: firestore.Timestamp;
    id: string;
    lastUpdatedOn: firestore.Timestamp;

    email: string;
    firstName: string;
    lastName: string;

    public constructor(properties?: any) {
      if (properties) {
        Object.keys(properties).forEach((key) => {
          this[key] = properties[key];
        });
      }
    }

    get fullName() {
      return this.firstName + ' ' + this.lastName;
    }
}