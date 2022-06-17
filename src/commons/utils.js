import { FILTER_OPTIONS } from './const';

/**
 *
 * @param {object} filters key - value representation on selected filter
 * @param {object} data list of meals to filter
 *
 * @example
 *
 * const filters = { POLAND: true, ITALY: false}
 * applyFilter(filters, data)
 */
export function applyFilter(filters, data) {
  const isFilterSet = FILTER_OPTIONS.find((b) => filters[b.value]);
  if (!isFilterSet) {
    return data;
  }
  const filtered = data.filter((h) => filters[h.origin]);
  return filtered;
}

export function prepareChartData(data) {
  return data.map((d) => ({
    rating: d.rating.average * 10,
    price: d.price.amount,
    reviews: d.rating.reviews,
    name: d.title,
  }));
}

export function countMealsByBedType(data) {
  return data.reduce(function (acc, v) {
    acc[v.origin] = acc[v.origin] ? acc[v.origin] + 1 : 1;
    return acc;
  }, {});
}

export function applySort(meals, sortField) {
  return meals.sort(sortMeals[sortField]).concat([]);
}

const sortMeals = {
  price: (a, b) => a.price.amount - b.price.amount,
  rating: (a, b) => b.rating.average - a.rating.average,
  reviews: (a, b) => b.rating.reviews - a.rating.reviews,
};

export const delay = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(true), ms));

export function getDeliveryCost(basket) {
  let sum = 0;
  basket.forEach((meal) => {
    let cost = 0;
    if (!meal.price.delivery) {
      cost = Math.round(meal.price.amount * 0.15);
      sum += Math.max(cost, 10);
    }
  });
  return sum;
}

export function getBasketCost(basket) {
  let sum = 0;
  basket.forEach((meal) => {
    sum += meal.price.amount;
  });
  return sum;
}
