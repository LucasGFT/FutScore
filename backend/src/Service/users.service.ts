import IUser from '../interfaces/IUser';
import UserDomain from '../Domains/User';
import UsersODM from '../Models/UsersODM';
import { decodedToken, gnToken } from '../utils/token.jwt';

class UserService {
  private createUserDomains(User: IUser) {
    return new UserDomain(User);
  }

  public async createUser(user: IUser) {
    const userODM = new UsersODM();
    const newUser = await userODM.create(user);
    const userToken = { email: user.email, password: user.password, cargo: newUser.cargo };
    const token = gnToken(userToken);
    this.createUserDomains(newUser);
    return token;
  }

  public async verifyRole(tokenHeader: string) {
    const userODM = new UsersODM();
    const parts = tokenHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return { token: 401, message: 'Token de autenticação inválido' };
    } 
    const token = parts[1];
    const jwtDecoded = decodedToken(token);
    if (jwtDecoded && typeof jwtDecoded !== 'string') {
      const { payload } = jwtDecoded;
      const { email } = JSON.parse(JSON.stringify(payload));
      const user = await userODM.findOne('email', email);
      return { token: 200, message: user };
    } 
    return { token: 401, message: 'Token inválido' };
  }

  public async getUsers(email: string) {
    const userODM = new UsersODM();
    const resultUser = await userODM.findOne('email', email);
    if (resultUser === null) return null;
    return this.createUserDomains(resultUser);
  }

  public async findUser(email: string, password: string) {
    const userODM = new UsersODM();
    const resultUser = await userODM.findByEmail(email);
    if (resultUser === null) return false;
    if(resultUser.password !== password) return false
    const userToken = { email: resultUser.email, password: resultUser.password, cargo: resultUser.cargo };
    const token = gnToken(userToken);
    return token;
  }

  
}

export default UserService;
