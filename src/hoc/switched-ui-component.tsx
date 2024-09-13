import { FC, PropsWithChildren } from 'react';

import { NodeUiVariants, StyleNodeVariants } from '../types/node-ui-variants';
import { EllipseNode } from '../ui/ellipse-node';
import { RectangleNode } from '../ui/rectangle-node';
import { RhombusNode } from '../ui/rhombus-node';
import { TriangleNode } from '../ui/triangle-node';

type SwitchedUiComponentProps = {
  variant?: StyleNodeVariants;
};

export const SwitchedUiComponent: FC<PropsWithChildren<SwitchedUiComponentProps>> = ({ variant, children }) => {
  const Component = {
    [NodeUiVariants.Ellipse]: <EllipseNode>{children}</EllipseNode>,
    [NodeUiVariants.EllipseOutlined]: <EllipseNode outlined={true}>{children}</EllipseNode>,
    [NodeUiVariants.EllipseOutlinedDashed]: (
      <EllipseNode outlined={true} dashed={true}>
        {children}
      </EllipseNode>
    ),
    [NodeUiVariants.Rectangle]: <RectangleNode>{children}</RectangleNode>,
    [NodeUiVariants.RectangleOutlined]: <RectangleNode outlined={true}>{children}</RectangleNode>,
    [NodeUiVariants.Rhombus]: <RhombusNode>{children}</RhombusNode>,
    [NodeUiVariants.RhombusOutlined]: <RhombusNode outlined={true}>{children}</RhombusNode>,
    [NodeUiVariants.Triangle]: <TriangleNode>{children}</TriangleNode>,
    [NodeUiVariants.TriangleTop]: <TriangleNode orientation='top'>{children}</TriangleNode>,
  };
  return variant ? Component[variant] : Component[NodeUiVariants.Rectangle];
};
