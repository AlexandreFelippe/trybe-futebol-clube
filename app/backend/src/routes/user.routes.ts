import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateEmailPassword,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
