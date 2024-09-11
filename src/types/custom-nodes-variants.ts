import { Node } from '@xyflow/react';
import { StyleNodeVariants } from './node-ui-variants';

export enum CustomNodesVariants {
  Text = 'text',
  TextUpdated = 'textUpdated',
  TextUpdatedRectangle = 'textUpdatedRectangle',
  Number = 'number',
  NumberUpdated = 'numberUpdated',
}

export type TextNodeData = { text: string; wrapperStyle: StyleNodeVariants };
export type NumberNodeData = { number: string; wrapperStyle: StyleNodeVariants };

export type UpdatedNodeData = TextNodeData | NumberNodeData;

export type TextNode = Node<TextNodeData, CustomNodesVariants.Text>;

export type NumberNode = Node<NumberNodeData, CustomNodesVariants.Number>;

export type UpdatedTextNode = Node<TextNodeData, CustomNodesVariants.TextUpdated>;

export type UpdatedNumberNode = Node<NumberNodeData, CustomNodesVariants.NumberUpdated>;

export type TextOrNumberNodeType = TextNode | NumberNode;

export type UpdatedNodeType = UpdatedTextNode | UpdatedNumberNode;
