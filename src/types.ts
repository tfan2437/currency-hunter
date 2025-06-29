export type Operation = 'add' | 'subtract' | 'add-currency' | 'subtract-currency';

export type Currency = 'USD' | 'TWD' | 'JPY' | 'EUR';
export type CurrencyData = { value: number; currency: Currency };
export type CurrencyInputs = {
  inputA: CurrencyData;
  inputB: CurrencyData;
  output: CurrencyData;
};

export type CurrencyTarget = 'inputA' | 'inputB' | 'output' | 'all';

export type ExchangeRates = {
  USD: number;
  TWD: number;
  JPY: number;
  EUR: number;
};
