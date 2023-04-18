import { NextFunction, Request, Response } from 'express';
import UserService from '../Service/users.service';

class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = {
      email, password,
    };
    try {
      const newUser = await this.service.createUser(user);
      return res.status(201).json({ token: newUser });
    } catch (error) {
      next(error)
    }
  }

  public async getUser(req: Request, res: Response) {
    const { email } = req.params;
    const resultUser = await this.service.getUsers(email);
    if (resultUser === null) return res.status(202).json(false);
    return res.status(201).json(true);
  }

  public async getLogin(req: Request, res: Response, _next: NextFunction) {
    const { email, password } = req.body;
    const resultUser  = await this.service.findUser(email, password)
    if (resultUser !== false) {
      return res.status(200).json({ token: resultUser }) 
    } else {
      return res.status(400).json('Email ou Senha incorreto')
    }
  }

  public async verifyToken(req: Request, res: Response, _next: NextFunction) {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) return res.status(401).json('Token não fornecido');
    const result = await this.service.verifyRole(tokenHeader);
    return res.status(result.token).json(result.message);
  }
}

export default UserController;
