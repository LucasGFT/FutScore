import jwt, { Algorithm } from 'jsonwebtoken';
import fs from 'fs';
import IUser from '../interfaces/IUser';

const secretKey = fs.readFileSync('./jwt.evaluation.key');

const config = {
  algorithm: 'HS256',
  expiresIn: '1h',
};

const gnToken = (payloa: IUser) => jwt.sign(payloa, secretKey, config as { algorithm: Algorithm });

const decodedToken = (token: string) => jwt.decode(token, { complete: true });

// const token = gnToken({
//   id: user.id,
//   name: user.name,
//   email: user.email,
//   role: user.role,
// });

export { gnToken, decodedToken };