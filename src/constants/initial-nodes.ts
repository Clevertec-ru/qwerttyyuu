import { Node, Position } from '@xyflow/react';

import { CustomNodesVariants, HandleVariants, UpdatedNodeData } from '../types/custom-nodes-variants';
import { NodeUiVariants } from '../types/node-ui-variants';

export const initialNodes: Node<UpdatedNodeData, string>[] = [
  {
    id: '1',
    data: {
      text: 'Employee',
      wrapperStyle: NodeUiVariants.Rectangle,
      multipleHandles: {
        bottomHandles: 1,
        leftHandles: 0,
        rightHandles: 1,
        topHandles: 3,
        bottomHandleType: HandleVariants.SourceOnly,
      },
    },
    type: CustomNodesVariants.TextUpdatedMultiple,
    position: { x: 500, y: 100 },
    height: 40,
    width: 200,
    draggable: true,
  },
  {
    id: '2',
    data: { text: 'ISA', wrapperStyle: NodeUiVariants.Triangle },
    type: CustomNodesVariants.Text,
    position: { x: 525, y: 200 },
    height: 50,
    width: 150,
  },
  {
    id: '3',
    data: { text: 'Salesman', wrapperStyle: NodeUiVariants.Rectangle },
    type: CustomNodesVariants.Text,
    position: { x: 500, y: 300 },
    height: 40,
    width: 200,
    sourcePosition: Position.Right,
  },
  {
    id: '4',
    data: { text: 'Uses', wrapperStyle: NodeUiVariants.Rhombus },
    type: CustomNodesVariants.Text,
    position: { x: 750, y: 270 },
    height: 100,
    width: 100,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '5',
    data: { text: 'Company Car', wrapperStyle: NodeUiVariants.Rectangle },
    type: CustomNodesVariants.Text,
    position: { x: 900, y: 300 },
    height: 40,
    width: 200,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    data: { text: 'Plate', wrapperStyle: NodeUiVariants.Ellipse, handleTypes: HandleVariants.TargetOnly },
    type: CustomNodesVariants.Text,
    position: { x: 850, y: 400 },
    height: 60,
    width: 140,
  },
  {
    id: '7',
    data: { text: `Get's paid`, wrapperStyle: NodeUiVariants.RhombusOutlined },
    type: CustomNodesVariants.Text,
    position: { x: 760, y: 70 },
    height: 120,
    width: 120,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: '8',
    data: {
      text: `Wage`,
      wrapperStyle: NodeUiVariants.RectangleOutlined,
      multipleHandles: {
        topHandles: 2,
        topHandleType: HandleVariants.SourceOnly,
        leftHandles: 1,
        leftHandleType: HandleVariants.TargetOnly,
      },
    },
    type: CustomNodesVariants.TextUpdatedMultiple,
    position: { x: 950, y: 110 },
    height: 40,
    width: 180,
    targetPosition: Position.Left,
    sourcePosition: Position.Top,
  },
  {
    id: '9',
    data: {
      text: 'Amount',
      wrapperStyle: NodeUiVariants.EllipseOutlinedDashed,
      handleTypes: HandleVariants.TargetOnly,
    },
    type: CustomNodesVariants.Text,
    targetPosition: Position.Bottom,
    position: { x: 910, y: 20 },
    height: 40,
    width: 80,
  },
  {
    id: '10',
    data: { text: 'Date', wrapperStyle: NodeUiVariants.Ellipse, handleTypes: HandleVariants.TargetOnly },
    type: CustomNodesVariants.Text,
    targetPosition: Position.Bottom,
    position: { x: 1020, y: 20 },
    height: 40,
    width: 80,
  },
  {
    id: '11',
    data: { text: 'Number', wrapperStyle: NodeUiVariants.Ellipse, handleTypes: HandleVariants.TargetOnly },
    type: CustomNodesVariants.Number,
    targetPosition: Position.Bottom,
    position: { x: 400, y: 30 },
    height: 40,
    width: 100,
  },
  {
    id: '12',
    data: { text: 'Name', wrapperStyle: NodeUiVariants.Ellipse, handleTypes: HandleVariants.TargetOnly },
    type: CustomNodesVariants.Text,
    targetPosition: Position.Bottom,
    position: { x: 500, y: -20 },
    height: 40,
    width: 100,
  },
  {
    id: '13',
    data: { text: 'Skills', wrapperStyle: NodeUiVariants.EllipseOutlined, handleTypes: HandleVariants.TargetOnly },
    type: CustomNodesVariants.Text,
    targetPosition: Position.Bottom,
    position: { x: 600, y: 20 },
    height: 40,
    width: 80,
  },
  {
    id: '14',
    data: { text: 'Resizable', wrapperStyle: NodeUiVariants.Rectangle },
    type: CustomNodesVariants.ResizableUpdatable,
    targetPosition: Position.Bottom,
    position: { x: 500, y: 400 },
    height: 50,
    width: 100,
  },
];
