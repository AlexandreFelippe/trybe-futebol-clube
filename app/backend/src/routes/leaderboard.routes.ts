import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboardController.getAllHome(req, res));

router.get('/away', (req: Request, res: Response) => leaderboardController.getAllAway(req, res));

export default router;
