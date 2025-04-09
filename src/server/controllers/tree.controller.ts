import { LIB } from '../constants';
import { CreateTreeRequest, CreateTreeResponse } from '../types/create-tree';

class TreeController {
  async createTree(req: CreateTreeRequest, res: CreateTreeResponse) {
    const { expression } = req.query;
    const treePtr = LIB.create_tree([expression]);
    res.status(200).json({ pointer: treePtr });
  }
}

export const treeController = new TreeController();
