import * as React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';

import { FILTER_OPTIONS } from '../commons/const';

import Filters from '../components/Filters';

afterEach(cleanup);

describe('Filter component:', () => {
  test.todo('render all filters');

  test.todo('call onChange with new filter value');

  test.todo('render 0 if no unit in filter');

  test.todo('render unit number in filter');
});
