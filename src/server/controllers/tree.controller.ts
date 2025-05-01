import { ExpressionTree } from '../../addon/binding';
import { CreateTreeRequest, CreateTreeResponse } from '../types/dto/create-tree';
import { GetGraphRequest, GetGraphResponse } from '../types/dto/get-graph';

class TreeController {
  async createTree(req: CreateTreeRequest, res: CreateTreeResponse) {
    const { expression } = req.query;
    try {
      const tree = ExpressionTree.createTree(expression);
      const json = tree.jsonTree();
      res.status(200).json({ tree: JSON.parse(json) });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }

  async getGraph(req: GetGraphRequest, res: GetGraphResponse) {}
}

export const treeController = new TreeController();
