import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ChartSwitcher = ({ isVisible, onChange }) => {
  return (
    <Checkbox
      checked={isVisible}
      onChange={() => onChange()}
      toggle
      label={`${isVisible ? 'Ukryj' : 'Pokaż'} wykres`}
    />
  );
};
export default React.memo(ChartSwitcher);

ChartSwitcher.propTypes = {
  isVisible: PropTypes.bool,
  onChange: PropTypes.func,
};

ChartSwitcher.defaultProps = {
  isVisible: false,
  onChange: undefined,
};
