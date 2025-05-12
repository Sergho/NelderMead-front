import { Router } from 'express';
import { treeController } from '../controllers/tree.controller';

const router = Router();

router.get('/create-tree', treeController.createTree);
router.get('/get-graph', treeController.getGraph);

export const treeRouter = router;
