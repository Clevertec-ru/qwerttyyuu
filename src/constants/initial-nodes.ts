import { Node } from '@xyflow/react';
import { CustomNodesVariants } from '../types/custom-nodes-variants';
import { NodeUiVariants } from '../types/node-ui-variants';

export const initialNodes: Node[] = [
  {
    id: '1',
    data: { text: 'Employee', wrapperStyle: NodeUiVariants.Rectangle },
    type: CustomNodesVariants.TextUpdated,
    position: { x: 500, y: 100 },
    height: 30,
    width: 200,
  },
  {
    id: '2',
    data: { text: 'ISA', wrapperStyle: NodeUiVariants.Triangle },
    type: CustomNodesVariants.Text,
    position: { x: 500, y: 400 },
    height: 30,
    width: 200,
  },
];
