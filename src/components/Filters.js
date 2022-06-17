import * as React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, List } from 'semantic-ui-react';

const Filters = ({ count, onChange, options }) => (
  <>
    <List horizontal>
      <List.Item>
        <b>Kraj pochodzenia:</b>
      </List.Item>
      {options.map((b) => (
        <List.Item key={b.value} data-testid="checkbox-filter">
          <Checkbox
            onChange={(e, { value, checked }) => onChange(value, checked)}
            value={b.value}
            id={b.value}
            label={b.text}
          />{' '}
          ({count[b.value] || 0})
        </List.Item>
      ))}
    </List>
  </>
);

Filters.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  count: PropTypes.object,
  onChange: PropTypes.func,
};

Filters.defaultProps = {
  options: [],
  count: {},
  onChange: undefined,
};

export default Filters;
