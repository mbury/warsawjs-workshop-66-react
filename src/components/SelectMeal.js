import * as React from 'react';
import axios from 'axios';
import { Loader, Button, Divider } from 'semantic-ui-react';

import Filters from './Filters';
import MealList from './MealList';
import ChartToggler from './ChartToggler';
import Paginate from '../commons/Paginate';

import { useQuery } from 'react-query';

import { FILTER_OPTIONS } from '../commons/const';
import * as utils from '../commons/utils';
import { useOrderFlow } from './OrderContext';
import lazyWithPreload from '../commons/lazyWithPreload';
import useToggle from '../commons/useToggle';

const RatingChart = lazyWithPreload(() => import('./RatingChart'));

const SelectMeal = (props) => {
  const [isChartVisible, toggleChartVisibility] = useToggle();

  const { isLoading, data = [] } = useQuery(
    'meals-list',
    () => axios('/meals').then(({ data }) => data),
    { refetchOnWindowFocus: false }
  );
  const [filters, setFilters] = React.useState({});
  const [isPending, startTransition] = React.useTransition();
  const { addToBasket } = useOrderFlow();

  const onChangeFilter = React.useCallback(
    (value, checked) =>
      startTransition(() =>
        setFilters((state) => ({
          ...state,
          [value]: checked,
        }))
      ),
    []
  );
  const mealsInFilter = React.useMemo(
    () => utils.countMealsByBedType(data),
    [data]
  );
  const filteredData = React.useMemo(
    () => utils.applyFilter(filters, data),
    [filters, data]
  );

  return (
    <React.Fragment>
      <ChartToggler
        isVisible={isChartVisible}
        onChange={toggleChartVisibility}
      />
      <React.Suspense fallback={<Loader active inline="centered" />}>
        {isChartVisible && (
          <div>
            <Divider hidden />
            <RatingChart data={filteredData} />
          </div>
        )}
      </React.Suspense>
      <Divider />
      <Filters
        count={mealsInFilter}
        options={FILTER_OPTIONS}
        onChange={onChangeFilter}
      />
      {isPending && <Loader active size="mini" inline />}
      <Divider />
      {isLoading ? (
        <Loader active inline="centered" />
      ) : (
        <Paginate pageSize={10}>
          {(page, paginate, next, previous) => {
            return (
              <React.Fragment>
                <MealList
                  meals={paginate(filteredData)}
                  onSelect={addToBasket}
                />
                <Button onClick={previous} icon="angle left" />
                <Button>strona: {page}</Button>
                <Button onClick={next} icon="angle right" />
              </React.Fragment>
            );
          }}
        </Paginate>
      )}
      <Divider hidden></Divider>
    </React.Fragment>
  );
};

export default SelectMeal;
