// import { startServer } from './utils/start-server';

// startServer();

import { ExpressionTree } from '../addon/binding';

const tree = ExpressionTree.createTree('5 + 5');
console.log(tree.jsonTree());
