import { Schema } from 'mongoose';
import IUser from '../interfaces/IUser';
import AbstractODM from './AbstractODM';

class UsersODM extends AbstractODM <IUser> {
  constructor() {
    super(
      new Schema<IUser>({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cargo: { type: String, required: true, default: 'cliente' },
      }),
      'users',
    );
  }
}

export default UsersODM;
