import { LIB } from '../constants';
import { CreateTreeRequest, CreateTreeResponse } from '../types/create-tree';

class TreeController {
  async createTree(req: CreateTreeRequest, res: CreateTreeResponse) {
    const { expression } = req.query;
    const responsePtr = LIB.create_tree([expression]);
    if (LIB.has_error_tree([responsePtr])) {
      const error = LIB.get_error_tree([responsePtr]);
      res.status(401).json({ message: error });
      LIB.delete_response_tree([responsePtr]);
      return;
    }

    const treePtr = LIB.get_value_tree([responsePtr]);
    const json = LIB.print_tree([treePtr]);
    res.status(200).json({ tree: JSON.parse(json) });
  }
}

export const treeController = new TreeController();
