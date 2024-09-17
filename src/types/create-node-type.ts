import { HandleVariants } from './custom-nodes-variants.ts';
import { NodeUiVariants } from './node-ui-variants.ts';

export type CreateNodeType = {
  nodeText: string;
  nodeShape: NodeUiVariants;
  topDotsType: HandleVariants;
  botDotsType: HandleVariants;
  leftDotsType: HandleVariants;
  rightDotsType: HandleVariants;
  topDotsCount: number;
  botDotsCount: number;
  leftDotsCount: number;
  rightDotsCount: number;
  height: number;
  width: number;
  uniqueId: string;
}