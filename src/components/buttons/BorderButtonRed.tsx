interface IBorderButtonRed {
  classFont?: string;
  classSpace?: string;
  classOthers?: string;
  disabled?: boolean;
  clickFunc?: () => void;
  text?: string;
}

const BorderButtonRed = ({
  classFont = 'text-base',
  classSpace = 'p-2',
  classOthers,
  disabled = false,
  clickFunc,
  text,
}: IBorderButtonRed) => {
  return (
    <button
      type="button"
      className={`
        ${
          !disabled
            ? 'text-red-500 hover:cursor-pointer border-red-500 hover:border-2 hover:font-bold'
            : 'text-gray-500 border-gray-500'
        } 
        ${classFont}
        ${classSpace}
        ${classOthers} 
        border rounded-xl
      `}
      disabled={disabled}
      onClick={clickFunc}
    >
      {text}
    </button>
  );
};

export default BorderButtonRed;
