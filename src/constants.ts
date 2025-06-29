import { Currency, Operation } from './types';

export const operations: { title: string; operation: Operation }[] = [
  {
    title: 'Add',
    operation: 'add',
  },
  {
    title: 'Subtract',
    operation: 'subtract',
  },
  {
    title: 'Add with Currency',
    operation: 'add-currency',
  },
  {
    title: 'Subtract with Currency',
    operation: 'subtract-currency',
  },
];

export const currencies: { symbol: string; currency: Currency }[] = [
  {
    symbol: '元',
    currency: 'TWD',
  },
  {
    symbol: '$',
    currency: 'USD',
  },
  {
    symbol: '¥',
    currency: 'JPY',
  },
  {
    symbol: '€',
    currency: 'EUR',
  },
];
