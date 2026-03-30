const BorderButtonGreen = ({
  classFont = 'text-xs',
  classSpace = 'py-1 px-2 ml-4',
  classOthers,
  disabled = false,
  clickFunc,
  text,
}) => {
  return (
    <button
      type="button"
      className={`border rounded-xl
        ${!disabled ? 'text-emerald-500 border-emerald-500' : 'text-emerald-800 border-emerald-800'}
        ${!disabled && 'hover:text-emerald-600 hover:cursor-pointer hover:border-emerald-600'}
        ${classFont}
        ${classSpace}
        ${classOthers} 
      `}
      disabled={disabled}
      onClick={clickFunc}
    >
      {text}
    </button>
  );
};

export default BorderButtonGreen;

/*
<BorderButtonGreen
  // classFont={'text-xs'}
  // classSpace={'py-1 px-2 ml-4'}
  classOthers={''}
  // disabled={false}
  text={''}
  clickFunc={''}
/>
*/
