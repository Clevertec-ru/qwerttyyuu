import { baseEdgesStyles } from '../constants/base-edges-styles';
import { initialEdges } from '../constants/initial-edges';

export const getInitialEdges = () => {
  return initialEdges.map((edge) => ({ ...edge, ...baseEdgesStyles }));
};
