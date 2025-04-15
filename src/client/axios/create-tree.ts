import axios from 'axios';
import { API } from '../constants';

export const createTree = async (expression: string) => {
  const result = await axios.get(API.create_tree, {
    params: { expression },
  });
  return result.data;
};
