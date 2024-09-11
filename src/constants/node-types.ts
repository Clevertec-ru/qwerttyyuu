import { NodeTypes } from '@xyflow/react';
import { CustomNodesVariants } from '../types/custom-nodes-variants';
import { UpdatedNode } from '../components/updated-node';
import { CustomTextNode } from '../components/custom-text-node';

export const nodeTypes: NodeTypes = {
  [CustomNodesVariants.TextUpdated]: UpdatedNode,
  [CustomNodesVariants.NumberUpdated]: UpdatedNode,
  [CustomNodesVariants.Text]: CustomTextNode,
  [CustomNodesVariants.Number]: CustomTextNode,
};
