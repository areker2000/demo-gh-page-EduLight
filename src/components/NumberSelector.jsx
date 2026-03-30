import { useState } from 'react';

const NumberSelector = ({ qty, setQty, classWidth }) => {
  const increment = () => {
    setQty((pre) => Number(pre) + 1);
  };
  const decrement = () => {
    if (qty > 1) {
      setQty((pre) => Number(pre) - 1);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setQty(Number(val));
    }
    if (val <= 0 || val === '') {
      setQty(1);
    }
  };

  return (
    <>
      <div
        className={`flex items-center bg-gray-50 border border-gray-200 rounded-2xl p-1 ${classWidth}`}
      >
        <button
          onClick={decrement}
          disabled={qty <= 1}
          className={`w-10 h-5 flex items-center justify-center rounded-xl transition ${
            qty <= 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-emerald-600 hover:bg-white hover:shadow-sm'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M20 12H4"
            />
          </svg>
        </button>

        <input
          type="text"
          className="w-full text-center font-bold text-lg text-gray-800 select-none"
          value={qty ?? ''}
          onChange={handleChange}
        />

        <button
          onClick={increment}
          className={
            'w-10 h-5 flex items-center justify-center rounded-xl transitiontext-emerald-600 hover:bg-white hover:shadow-sm'
          }
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default NumberSelector;

/*
<NumberSelector
  qty={qty}
  setQty={setQty}
  classWidth={'w-auto'}
/>
*/
