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
});

interface OperationDTO {
  first: string;
  second: string;
}

app.get('/sum', (req: Request<{}, {}, {}, OperationDTO>, res: Response<string>): void => {
  const { first, second } = req.query;
  let result = String(lib.NM_addition(+first, +second));
  res.json(result);
});

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
