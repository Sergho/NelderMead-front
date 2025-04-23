import axios from 'axios';
import { API } from '../constants';

export const createTree = async (expression: string) => {
  try {
    const result = await axios.get(API.create_tree, {
      params: { expression },
    });
    return result.data;
  } catch (err) {
    return { ...err.response.data, status: err.response.status };
  }
};
