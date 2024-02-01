import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validations';
import Auth from '../middlewares/Auth';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateEmailPassword,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Auth.handle,
  (req: Request, res: Response) => UserController.validate(req, res),
);

export default router;
