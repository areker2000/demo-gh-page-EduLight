import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import LoginoutButton from '../components/buttons/LoginoutButton';
import BorderButtonGreen from '../components/buttons/BorderButtonGreen';

const FrontendLayout = () => {
  const navigate = useNavigate();
  const { user, isLogin, logoutSettings, isFullLoading } = useAuth();

  const logout = () => {
    logoutSettings();
    navigate('/', { replace: true });
  };

  return (
    <>
      <nav className="bg-emerald-50/60 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="space-x-8 font-medium">
            <NavLink to="/" className="text-2xl font-bold text-emerald-600">
              EduLight
            </NavLink>
            <NavLink to="/news" className="hover:text-emerald-500 transition">
              最新消息
            </NavLink>
            <NavLink
              to="/teachers"
              className="hover:text-emerald-500 transition"
            >
              課程列表
            </NavLink>
          </div>
          <div className="space-x-8 font-medium">
            {isLogin && (
              <BorderButtonGreen
                classFont={'text-m'}
                text={`${user} 的購課紀錄`}
                clickFunc={() => navigate('/orders')}
              />
            )}
            <NavLink to="/cart" className="hover:text-emerald-500 transition">
              購物車
            </NavLink>

            {isLogin ? (
              <LoginoutButton
                disabled={!isLogin}
                login={false}
                text={'登出'}
                clickFunc={logout}
              />
            ) : (
              <LoginoutButton
                disabled={isLogin}
                login={true}
                text={'登入'}
                clickFunc={() => navigate('/login')}
              />
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Outlet />
      </main>
      {!isFullLoading && (
        <footer className="bg-white border-t border-gray-100 pb-8">
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-xs mb-4 md:mb-0">
                Copyright © 2026 EduLight All rights reserved
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default FrontendLayout;
