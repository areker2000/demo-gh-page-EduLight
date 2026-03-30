const FilledButton = ({
  type = 'button',
  classFont = 'font-bold',
  classSpace = 'px-8 py-3',
  classColorFill = 'emerald',
  classShadow = 'shadow-md shadow-gray-500/50',
  classOthers,
  disabled = false,
  clickFunc,
  text,
}) => {
  return (
    <button
      type={type}
      className={`
        ${
          !disabled
            ? `bg-${classColorFill}-500 text-white/90 hover:bg-${classColorFill}-400 hover:cursor-pointer`
            : `bg-${classColorFill}-500/30 text-gray-900/30`
        }
        ${classFont} 
        ${classSpace} 
        ${classShadow} 
        ${classOthers} 
        rounded-xl transition duration-300 active:scale-95
      `}
      disabled={disabled}
      onClick={clickFunc}
    >
      {text}
    </button>
  );
};

export default FilledButton;

/*
<FilledButton
  // type={'button'}
  // classFont={'font-bold'}
  // classSpace={'px-8 py-3'}
  // classColorFill={'emerald'}
  // classShadow={'shadow-md shadow-gray-500/50'}
  classOthers={''}
  // disabled={false}
  text={''}
  clickFunc={''}
/>
*/
