import { twMerge } from 'tailwind-merge';
import { useState, useEffect, useCallback } from 'react';
// types
import { Currency, CurrencyInputs, CurrencyTarget, ExchangeRates, Operation } from '../types';
// Components
import CurrencySelector from './currency/currency-selector';
import OperationSelector from './currency/operation-selector';
import CurrencyInput from './currency/currency-input';
import Separator from './currency/output-separator';
import CurrencyOutput from './currency/currency-output';

// Custom hook
const useCurrencyCalculator = () => {
  const [operation, setOperation] = useState<Operation>('add');
  const [currencies, setCurrencies] = useState<CurrencyInputs>({
    inputA: { value: 0, currency: 'TWD' },
    inputB: { value: 0, currency: 'TWD' },
    output: { value: 0, currency: 'TWD' },
  });
  const [rates, setRates] = useState<ExchangeRates>({
    USD: 0,
    TWD: 0,
    JPY: 0,
    EUR: 0,
  });

  const withCurrency = operation === 'add-currency' || operation === 'subtract-currency';

  const fetchExchangeRates = useCallback(async () => {
    const throwError = () => {
      throw new Error('Failed to fetch exchange rates');
    };

    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/USD`);

      if (!response.ok) throwError();

      const data = await response.json();

      if (data.result === 'success') {
        setRates({
          USD: 1,
          TWD: data.rates.TWD,
          JPY: data.rates.JPY,
          EUR: data.rates.EUR,
        });
      } else {
        throwError();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to fetch exchange rates. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  useEffect(() => {
    console.log(rates);
  }, [rates]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: 'inputA' | 'inputB'
  ) => {
    // prevent negative value
    const newValue = Math.max(0, Number(e.target.value));
    setCurrencies({
      ...currencies,
      [input]: {
        value: newValue,
        currency: currencies[input].currency,
      },
    });
  };

  const handleInputAction = (input: 'inputA' | 'inputB', action: 'increase' | 'decrease') => {
    // prevent negative value
    const newValue =
      action === 'increase'
        ? currencies[input].value + 1
        : action === 'decrease' && currencies[input].value > 0
          ? currencies[input].value - 1
          : 0;

    setCurrencies({
      ...currencies,
      [input]: {
        value: newValue,
        currency: currencies[input].currency,
      },
    });
  };

  const handleSelectCurrency = (currency: Currency, target: CurrencyTarget) => {
    if (target === 'all') {
      setCurrencies((prev) => ({
        ...prev,
        inputA: { ...prev.inputA, currency: currency },
        inputB: { ...prev.inputB, currency: currency },
        output: { ...prev.output, currency: currency },
      }));
    } else {
      setCurrencies((prev) => ({
        ...prev,
        [target]: { ...prev[target], currency: currency },
      }));
    }
  };

  // Calculate output value based on operation
  const calculateOutput = () => {
    const inputAValue = currencies.inputA.value;
    const inputBValue = currencies.inputB.value;
    let outputValue = 0;

    // all same currency don't need to apply rates
    const sameCurrency =
      currencies.inputA.currency === currencies.inputB.currency &&
      currencies.inputA.currency === currencies.output.currency;

    // for with currency operation
    const aInUSD = inputAValue / rates[currencies.inputA.currency];
    const bInUSD = inputBValue / rates[currencies.inputB.currency];

    if (operation === 'add' || (operation === 'add-currency' && sameCurrency)) {
      outputValue = inputAValue + inputBValue;
    } else if (operation === 'subtract' || (operation === 'subtract-currency' && sameCurrency)) {
      outputValue = inputAValue - inputBValue;
    } else if (operation === 'add-currency') {
      outputValue = (aInUSD + bInUSD) * rates[currencies.output.currency];
    } else if (operation === 'subtract-currency') {
      outputValue = (aInUSD - bInUSD) * rates[currencies.output.currency];
    }

    setCurrencies((prev) => ({
      ...prev,
      output: {
        ...prev.output,
        value: Number(outputValue.toFixed(10)),
      },
    }));
  };

  useEffect(() => {
    calculateOutput();
  }, [
    operation,
    currencies.inputA.value,
    currencies.inputB.value,
    currencies.inputA.currency,
    currencies.inputB.currency,
    currencies.output.currency,
  ]);

  return {
    operation,
    setOperation,
    currencies,
    withCurrency,
    handleInputChange,
    handleInputAction,
    handleSelectCurrency,
  };
};

const CurrencyCalculator = () => {
  const {
    operation,
    setOperation,
    currencies,
    withCurrency,
    handleInputChange,
    handleInputAction,
    handleSelectCurrency,
  } = useCurrencyCalculator();

  return (
    <div className="flex h-fit w-auto flex-col items-center rounded-xl bg-grey-800">
      <OperationSelector operation={operation} setOperation={setOperation} />
      <form className="flex w-full flex-col gap-2 px-7 pb-6 pt-4">
        {(operation === 'add' || operation === 'subtract') && (
          <CurrencySelector
            currency={currencies.output.currency}
            target="all"
            onSelect={handleSelectCurrency}
          />
        )}
        <div
          className={twMerge('grid items-end gap-2', withCurrency ? 'grid-cols-2' : 'grid-cols-1')}
        >
          <CurrencyInput
            value={currencies.inputA.value}
            input="inputA"
            handleInputChange={handleInputChange}
            handleInputAction={handleInputAction}
          />
          {withCurrency && (
            <CurrencySelector
              currency={currencies.inputA.currency}
              target="inputA"
              onSelect={handleSelectCurrency}
            />
          )}
        </div>
        <div
          className={twMerge(
            'grid items-end gap-2',
            operation === 'add' || operation === 'subtract' ? 'grid-cols-1' : 'grid-cols-2'
          )}
        >
          <CurrencyInput
            value={currencies.inputB.value}
            input="inputB"
            handleInputChange={handleInputChange}
            handleInputAction={handleInputAction}
          />
          {withCurrency && (
            <CurrencySelector
              currency={currencies.inputB.currency}
              target="inputB"
              onSelect={handleSelectCurrency}
            />
          )}
        </div>
        <Separator />
        <CurrencyOutput
          output={currencies.output}
          operation={operation}
          currencySelector={
            operation === 'add' || operation === 'subtract' ? (
              <span className="w-9 text-sm text-grey-500">{currencies.output.currency}</span>
            ) : (
              <CurrencySelector
                currency={currencies.output.currency}
                target="output"
                onSelect={handleSelectCurrency}
              />
            )
          }
        />
      </form>
    </div>
  );
};

export default CurrencyCalculator;
