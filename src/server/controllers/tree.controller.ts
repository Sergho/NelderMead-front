import { ExpressionTree } from '../../addon/binding';
import { treeService } from '../services/tree.service';
import { DtoRequest } from '../types/dto/dto-request';
import { DtoResponse } from '../types/dto/dto-response';
import { CreateTreeRequestDto, CreateTreeResponseDto } from '../types/dto/tree/create-tree.dto';
import { GetGraphRequestDto, GetGraphResponseDto } from '../types/dto/tree/get-graph.dto';

class TreeController {
  async createTree(req: DtoRequest<CreateTreeRequestDto>, res: DtoResponse<CreateTreeResponseDto>) {
    const { expression } = req.query;
    try {
      const tree = ExpressionTree.createTree(expression);
      const json = tree.jsonTree();
      res.status(200).json({ tree: JSON.parse(json) });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getGraph(req: DtoRequest<GetGraphRequestDto>, res: DtoResponse<GetGraphResponseDto>) {
    const dto = req.query;
    try {
      const points = treeService.getGraph(dto);
      res.status(200).json({ points });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const treeController = new TreeController();
