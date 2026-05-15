interface IRemoveButton {
  classFont?: string;
  classSpace?: string;
  classOthers?: string;
  disabled?: boolean;
  text?: string;
  clickFunc?: () => void;
}

const RemoveButton = ({
  classFont = 'text-xs',
  classSpace,
  classOthers,
  disabled = false,
  text,
  clickFunc,
}: IRemoveButton) => {
  return (
    <button
      type="button"
      className={`
        ${!disabled && 'hover:text-red-600 hover:cursor-pointer'} 
        ${classFont} 
        ${classSpace} 
        ${classOthers}
        text-red-400 
      `}
      disabled={disabled}
      onClick={clickFunc}
    >
      {text}
    </button>
  );
};

export default RemoveButton;
