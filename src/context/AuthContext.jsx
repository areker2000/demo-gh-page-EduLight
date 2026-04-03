import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;

  const [user, setUser] = useState('');
  const [isLogin, setIsLogin] = useState(localStorage.getItem('EduLightLogin'));
  const [isFullLoading, setIsFullLoading] = useState(false);
  const [fullLoadingText, setFullLoadingText] = useState('處理中...');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (isLogin === 'true') {
      setIsLogin(localStorage.getItem('EduLightLogin'));
      setUser(JSON.parse(localStorage.getItem('EduLightUser'))?.username);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (isLogin) updateCartCount();
  }, [isLogin]);

  const updateCartCount = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartCount(res.data.data.carts.length);
    } catch (error) {
      console.error('更新購物車數量失敗', error);
    }
  };

  const showFullLoading = (text = '處理中...') => {
    setFullLoadingText(text);
    setIsFullLoading(true);
  };

  const loginSetting = (username) => {
    setUser(username);
    setIsLogin(true);
    localStorage.setItem('EduLightLogin', true);
    showFullLoading('登入中');
    setTimeout(() => {
      setIsFullLoading(false);
    }, 1000);
  };
  const logoutSettings = () => {
    setUser('');
    setIsLogin(false);
    localStorage.setItem('EduLightLogin', false);
    showFullLoading('登出中');
    setTimeout(() => {
      setIsFullLoading(false);
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        API_BASE,
        API_PATH,
        user,
        setUser,
        isLogin,
        setIsLogin,
        loginSetting,
        logoutSettings,
        isFullLoading,
        setIsFullLoading,
        fullLoadingText,
        setFullLoadingText,
        showFullLoading,
        isMenuOpen,
        setIsMenuOpen,
        cartCount,
        setCartCount,
        updateCartCount,
      }}
    >
      {children}
      {isFullLoading && (
        <div className="fixed inset-0 z-[9999] bg-white/80 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-emerald-600 font-medium">{fullLoadingText}</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
