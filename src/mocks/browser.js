import { setupWorker, rest } from 'msw';
import { delay } from '../commons/utils';
import data from './data.json';

const handlers = [
  rest.get('/basket', async (req, res, ctx) => {
    await delay(500);
    const ids = req.url.searchParams.get('ids').split(',');
    const basket = ids.map((id) => data.find((meal) => meal.id === id));
    return res(ctx.json(basket));
  }),
  rest.get('/meals', async (req, res, ctx) => {
    await delay(500);
    return res(ctx.json(data));
  }),
];

export const worker = setupWorker(...handlers);
