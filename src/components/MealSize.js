import React from 'react';
import { Label } from 'semantic-ui-react';

import useHover from '../commons/useHover';
import Hover from '../commons/Hover';
import withHover from '../commons/withHover';

const text = {
  SMALL: 'mała porcja',
  MEDIUM: 'średnia porcja',
  BIG: 'duża porcja',
};

export const MealSizeWithHook = (props) => {
  let [hoverRef, isHovered] = useHover();
  return (
    <span ref={hoverRef}>
      <MealSize showDetail={isHovered} {...props} />
    </span>
  );
};

export const MealSizeWithRenderProps = (props) => {
  return (
    <Hover>
      {(hoverRef, isHovered) => (
        <span ref={hoverRef}>
          <MealSize showDetail={isHovered} {...props} />
        </span>
      )}
    </Hover>
  );
};

export const MealSizeWithHOC = withHover((props) => {
  const { hoverRef, isHovered, ...rest } = props;
  return (
    <span ref={hoverRef}>
      <MealSize showDetail={isHovered} {...rest} />
    </span>
  );
});

const MealSize = (props) => (
  <Label
    icon="shopping basket"
    content={props.showDetail ? text[props.demand] : props.demand}
  />
);

export default MealSizeWithHOC;
