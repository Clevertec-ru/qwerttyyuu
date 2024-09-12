import { UpdatedNodeData, TextNodeData } from '../types/custom-nodes-variants';

export const isTextNodeData = (data: UpdatedNodeData): data is TextNodeData =>
  typeof data === 'object' && 'text' in data;
