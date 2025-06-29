// Utilities
import { twMerge } from 'tailwind-merge';

// Types and constants
import { Operation } from '../../types';
import { operations } from '../../constants';

interface OperationSelectorProps {
  operation: Operation;
  setOperation: (operation: Operation) => void;
}

const OperationSelector = ({ operation, setOperation }: OperationSelectorProps) => {
  return (
    <div className="flex border-b border-grey-600">
      {operations.map((item) => (
        <div
          key={item.operation}
          onClick={() => setOperation(item.operation)}
          className={twMerge(
            'cursor-pointer select-none border-b-2 px-7 pb-2 pt-3 font-lexend text-sm font-medium transition-colors duration-300',
            item.operation === operation
              ? 'border-yellow text-white'
              : 'border-transparent text-grey-500 hover:text-white'
          )}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default OperationSelector;
