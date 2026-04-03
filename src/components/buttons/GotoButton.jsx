import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const GotoButton = ({ target, text }) => {
  const navigate = useNavigate();
  const { setIsMenuOpen } = useAuth();

  return (
    <button
      type="button"
      onClick={() => {
        navigate(target);
        setIsMenuOpen(false);
      }}
      className="text-gray-400 hover:text-gray-600 text-sm flex items-center justify-center transition hover:cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {text}
    </button>
  );
};

export default GotoButton;

/*
<GotoButton 
  target={'/'} 
  text={'回到首頁'} 
/>;
*/
