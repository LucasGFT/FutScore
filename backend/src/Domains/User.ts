import IUser from '../interfaces/IUser';

class User {
  protected email: string;
  protected password: string;
  protected cargo: string;

  constructor(user: IUser) {
    this.email = user.email;
    this.password = user.password;
    this.cargo = user.cargo || 'cliente';
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getCargo(): string {
    return this.cargo;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setCargo(cargo: string): void {
    this.cargo = cargo;
  }
}

export default User;
