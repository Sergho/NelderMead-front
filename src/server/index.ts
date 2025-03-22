import express from 'express';
import { CORS, ROUTES } from './config';
import { OperationResponse } from './types/operation-response.type';
import { OperationRequest } from './types/operation-request.type';
import { BACKEND_PORT, HOST } from '../settings';

const app = express();
app.use(CORS);

for (const route in ROUTES) {
	app.get(route, (req: OperationRequest, res: OperationResponse): void => {
		const { first, second } = req.query;
		let result = String(ROUTES[route]([+first, +second]));
		res.json(result);
	});
}

app.listen(BACKEND_PORT, () => {
	console.log(`Backend started: ${HOST}:${BACKEND_PORT}`);
});
