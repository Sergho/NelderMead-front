import { ExpressionTree } from '../../addon/binding';
import { CreateTreeRequest, CreateTreeResponse } from '../types/create-tree';

class TreeController {
  async createTree(req: CreateTreeRequest, res: CreateTreeResponse) {
    const { expression } = req.query;
    try {
      const tree = ExpressionTree.createTree(expression);
      const json = tree.jsonTree();
      res.status(200).json({ tree: JSON.parse(json) });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

export const treeController = new TreeController();
