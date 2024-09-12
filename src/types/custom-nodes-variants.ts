import { BuiltInNode, Node } from '@xyflow/react';
import { StyleNodeVariants } from './node-ui-variants';

export enum CustomNodesVariants {
  Text = 'text',
  TextUpdated = 'textUpdated',
  TextUpdatedMultiple = 'textUpdatedMultiple',
  TextUpdatedRectangle = 'textUpdatedRectangle',
  Number = 'number',
  NumberUpdated = 'numberUpdated',
}

export enum HandleVariants {
  SourceOnly = 'source',
  TargetOnly = 'target',
}

export type HandleTypes = `${HandleVariants}`;

export type MultipleHandlesType = {
  topHandles: number;
  rightHandles: number;
  leftHandles: number;
  bottomHandles: number;
  topHandleType: HandleVariants;
  bottomHandleType: HandleVariants;
  leftHandleType: HandleVariants;
  rightHandleType: HandleVariants;
};

export type TextNodeData = {
  text: string;
  wrapperStyle: StyleNodeVariants;
  handleTypes?: HandleTypes;
  multipleHandles?: Partial<MultipleHandlesType>;
};
export type NumberNodeData = {
  number: string;
  wrapperStyle: StyleNodeVariants;
  handleTypes?: HandleTypes;
  multipleHandles?: Partial<MultipleHandlesType>;
};

export type UpdatedNodeData = TextNodeData | NumberNodeData;

export type TextNode = Node<TextNodeData, CustomNodesVariants.Text>;

export type NumberNode = Node<NumberNodeData, CustomNodesVariants.Number>;

export type UpdatedTextNode = Node<TextNodeData, CustomNodesVariants.TextUpdated>;

export type UpdatedNumberNode = Node<NumberNodeData, CustomNodesVariants.NumberUpdated>;

export type TextOrNumberNodeType = TextNode | NumberNode;

export type AppNodeType = BuiltInNode | TextOrNumberNodeType;

export type UpdatedNodeType = UpdatedTextNode | UpdatedNumberNode;