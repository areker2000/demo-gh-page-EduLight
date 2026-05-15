interface ILoginoutButton {
  disabled: boolean;
  login: boolean;
  clickFunc: () => void;
  text: string;
}
const LoginoutButton = ({
  disabled = false,
  login,
  clickFunc,
  text,
}: ILoginoutButton) => {
  return (
    <button
      type="button"
      className={`
        ${login ? 'bg-white text-emerald-500' : 'bg-emerald-500 text-white'}
        ${
          !disabled &&
          `${login && 'hover:text-white'} hover:bg-emerald-600 hover:cursor-pointer`
        }
        border-emerald-500 border font-bold
        px-5 py-2 rounded-full transition
      `}
      disabled={disabled}
      onClick={clickFunc}
    >
      {text}
    </button>
  );
};

export default LoginoutButton;
