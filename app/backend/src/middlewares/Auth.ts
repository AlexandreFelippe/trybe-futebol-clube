import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default class AuthMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Não recebi o token' });
    }

    const [type, token] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      return res.status(401).json({ message: 'Tipo de token inválido' });
    }

    try {
      const secret = process.env.JWT_SECRET ?? 'secret_qualquer';
      const payload = jwt.verify(token, secret);
      res.locals.auth = payload;
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  }
}
