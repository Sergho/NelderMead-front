import { LIB } from '../constants';
import { CreateTreeRequest, CreateTreeResponse } from '../types/create-tree';

class TreeController {
  async createTree(req: CreateTreeRequest, res: CreateTreeResponse) {
    const { expression } = req.query;
    const treePtr = LIB.create_tree([expression]);
    const json = LIB.print_tree([treePtr]);
    LIB.delete_tree([treePtr]);
    res.status(200).json({ tree: JSON.parse(json) });
  }
}

export const treeController = new TreeController();
