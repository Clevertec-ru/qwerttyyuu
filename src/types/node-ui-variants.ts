export enum NodeUiVariants {
  Rectangle = 'rectangle',
  RectangleOutlined = 'rectangleOutlined',
  Triangle = 'triangle',
  TriangleTop = 'triangleTop',
  Ellipse = 'ellipse',
  EllipseOutlined = 'ellipseOutlined',
  EllipseOutlinedDashed = 'ellipseOutlinedDashed',
  Rhombus = 'rhombus',
  RhombusOutlined = 'rhombusOutlined',
}

export type StyleNodeVariants = `${NodeUiVariants}`;

export const variantNames: Record<NodeUiVariants, string> = {
  [NodeUiVariants.Rectangle]: 'Rectangle',
  [NodeUiVariants.RectangleOutlined]: 'Outlined Rectangle',
  [NodeUiVariants.Triangle]: 'Triangle',
  [NodeUiVariants.TriangleTop]: 'Triangle',
  [NodeUiVariants.Ellipse]: 'Ellipse',
  [NodeUiVariants.EllipseOutlined]: 'Outlined Ellipse',
  [NodeUiVariants.EllipseOutlinedDashed]: 'Dashed Ellipse',
  [NodeUiVariants.Rhombus]: 'Rhombus',
  [NodeUiVariants.RhombusOutlined]: 'Rhombus',
};
