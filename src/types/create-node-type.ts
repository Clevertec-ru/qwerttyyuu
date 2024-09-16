import { HandleVariants } from './custom-nodes-variants.ts';

export type CreateNodeType = {
  nodeText: string;
  nodeShape: string;
  topDotsType: HandleVariants;
  botDotsType: HandleVariants;
  leftDotsType: HandleVariants;
  rightDotsType: HandleVariants;
  topDotsCount: number;
  botDotsCount: number;
  leftDotsCount: number;
  rightDotsCount: number;

}