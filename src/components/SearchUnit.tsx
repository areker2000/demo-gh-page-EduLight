interface ISearchUnit {
  placeholder: string;
  disabled: boolean;
  textValue: string;
  textChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  btnClickFunc: () => void;
}

const SearchUnit = ({
  placeholder,
  disabled,
  textValue,
  textChangeFunc,
  btnClickFunc,
}: ISearchUnit) => {
  return (
    <>
      <input
        type="text"
        className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500/30 outline-none mr-2"
        placeholder={placeholder}
        value={textValue}
        onChange={textChangeFunc}
        disabled={disabled}
      />

      <button
        type="button"
        className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
        onClick={btnClickFunc}
        disabled={disabled}
      >
        搜尋
      </button>
    </>
  );
};

export default SearchUnit;
