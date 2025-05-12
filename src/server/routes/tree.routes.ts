import { Router } from 'express';
import { mainController } from '../controllers/main.controller';

const router = Router();

router.get('/create-tree', mainController.createTree);
router.get('/get-graph', mainController.getGraph);
router.get('/get-solution', mainController.getSolution);

export const treeRouter = router;
