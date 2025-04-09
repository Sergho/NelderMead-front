import { Router } from 'express';
import { treeController } from '../controllers/tree.controller';

const router = Router();

router.get('/create-tree', treeController.createTree);

export const treeRouter = router;
