import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    return res.status(404).json({ message: error.message });
  }
}

export default ErrorHandler;
