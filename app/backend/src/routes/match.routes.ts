import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import auth from '../middlewares/Auth';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.patch(
  '/:id/finish',
  auth.handle,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
