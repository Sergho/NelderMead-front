import express, { Request, Response } from 'express';
import cors from 'cors';
import { Library } from 'ffi-napi';
import path from 'path';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

const lib = Library(path.resolve(__dirname, '../../build/libNelderMead'), {
  NM_addition: ['double', ['double', 'double']],
  NM_subtraction: ['double', ['double', 'double']],
  NM_multiplication: ['double', ['double', 'double']],
  NM_division: ['double', ['double', 'double']],
});

interface OperationDTO {
  first: string;
  second: string;
}

app.get(
  '/addition',
  (req: Request<{}, {}, {}, OperationDTO>, res: Response<string>): void => {
    const { first, second } = req.query;
    let result = String(lib.NM_addition(+first, +second));
    res.json(result);
  }
);
app.get(
  '/subtraction',
  (req: Request<{}, {}, {}, OperationDTO>, res: Response<string>): void => {
    const { first, second } = req.query;
    let result = String(lib.NM_subtraction(+first, +second));
    res.json(result);
  }
);
app.get(
  '/multiplication',
  (req: Request<{}, {}, {}, OperationDTO>, res: Response<string>): void => {
    const { first, second } = req.query;
    let result = String(lib.NM_multiplication(+first, +second));
    res.json(result);
  }
);
app.get(
  '/division',
  (req: Request<{}, {}, {}, OperationDTO>, res: Response<string>): void => {
    const { first, second } = req.query;
    let result = String(lib.NM_division(+first, +second));
    res.json(result);
  }
);

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
