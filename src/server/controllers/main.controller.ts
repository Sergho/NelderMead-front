import { ExpressionTree, NelderMeadMethod } from '../../addon/binding';
import {
  CreateTreeRequestDto,
  CreateTreeResponseDto,
} from '../../common/types/dto/create-tree.dto';
import { GetGraphRequestDto, GetGraphResponseDto } from '../../common/types/dto/get-graph.dto';
import {
  GetSolutionRequestDto,
  GetSolutionResponseDto,
} from '../../common/types/dto/get-solution.dto';
import { mainService } from '../services/tree.service';
import { DtoRequest } from '../types/dto/dto-request';
import { DtoResponse } from '../types/dto/dto-response';

class MainController {
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
      const points = mainService.getGraph(dto);
      res.status(200).json({ ...points });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getSolution(
    req: DtoRequest<GetSolutionRequestDto>,
    res: DtoResponse<GetSolutionResponseDto>,
  ) {
    const { expression } = req.query;
    try {
      const tree = ExpressionTree.createTree(expression);
      const method = new NelderMeadMethod(tree);
      const simplexes = method.minimumSearch();
      res.status(200).json({ simplexes });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const mainController = new MainController();
