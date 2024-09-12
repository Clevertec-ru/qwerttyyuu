import { FC, PropsWithChildren } from 'react';

import { NodeUiVariants, StyleNodeVariants } from '../types/node-ui-variants';
import { EllipseNode } from '../ui/ellipse-node';
import { RectangleNode } from '../ui/rectangle-node';
import { RhombusNode } from '../ui/rhombus-node';
import { TriangleNode } from '../ui/triange-node';

type SwitchedUiComponentProps = {
  onDelete?: () => void;
  variant?: StyleNodeVariants;
};

export const SwitchedUiComponent: FC<PropsWithChildren<SwitchedUiComponentProps>> = ({
  onDelete,
  variant,
  children,
}) => {
  const Component = {
    [NodeUiVariants.Ellipse]: <EllipseNode onDelete={onDelete}>{children}</EllipseNode>,
    [NodeUiVariants.EllipseOutlined]: (
      <EllipseNode onDelete={onDelete} outlined={true}>
        {children}
      </EllipseNode>
    ),
    [NodeUiVariants.EllipseOutlinedDashed]: (
      <EllipseNode onDelete={onDelete} outlined={true} dashed={true}>
        {children}
      </EllipseNode>
    ),
    [NodeUiVariants.Rectangle]: <RectangleNode onDelete={onDelete}>{children}</RectangleNode>,
    [NodeUiVariants.RectangleOutlined]: (
      <RectangleNode onDelete={onDelete} outlined={true}>
        {children}
      </RectangleNode>
    ),
    [NodeUiVariants.Rhombus]: <RhombusNode onDelete={onDelete}>{children}</RhombusNode>,
    [NodeUiVariants.RhombusOutlined]: (
      <RhombusNode onDelete={onDelete} outlined={true}>
        {children}
      </RhombusNode>
    ),
    [NodeUiVariants.Triangle]: <TriangleNode onDelete={onDelete}>{children}</TriangleNode>,
    [NodeUiVariants.TriangleTop]: (
      <TriangleNode onDelete={onDelete} orientation='top'>
        {children}
      </TriangleNode>
    ),
  };
  return variant ? Component[variant] : Component[NodeUiVariants.Rectangle];
};
