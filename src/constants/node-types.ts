import { NodeTypes } from '@xyflow/react';

import { CustomNodesVariants } from '../types/custom-nodes-variants';
import { UpdatedNode } from '../components/updated-node';
import { CustomTextNode } from '../components/custom-text-node';
import { MultipleUpdatedNode } from '../components/multiple-updated-node';
import { ResizableNodeSelected } from '../components/resizable-node';

export const nodeTypes: NodeTypes = {
  [CustomNodesVariants.TextUpdated]: UpdatedNode,
  [CustomNodesVariants.NumberUpdated]: UpdatedNode,
  [CustomNodesVariants.Text]: CustomTextNode,
  [CustomNodesVariants.Number]: CustomTextNode,
  [CustomNodesVariants.TextUpdatedMultiple]: MultipleUpdatedNode,
  [CustomNodesVariants.ResizableUpdatable]: ResizableNodeSelected,
};
