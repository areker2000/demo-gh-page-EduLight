import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import LoginoutButton from '../components/buttons/LoginoutButton';
import BorderButtonGreen from '../components/buttons/BorderButtonGreen';
import { useState } from 'react';

const FrontendLayout = () => {
  const navigate = useNavigate();
  const {
    user,
    isLogin,
    logoutSettings,
    isFullLoading,
    isMenuOpen,
    setIsMenuOpen,
    cartCount,
  } = useAuth();
  const logout = () => {
    logoutSettings();
    setIsMenuOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <nav className="bg-emerald-50/60 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <NavLink
              to="/"
              className="text-2xl font-bold text-emerald-600 shrink-0"
              onClick={() => setIsMenuOpen(false)}
            >
              EduLight
            </NavLink>
            <div className="hidden md:flex space-x-6 font-medium flex items-center">
              <NavLink to="/news" className="hover:text-emerald-500 transition">
                最新消息
              </NavLink>
              <NavLink
                to="/teachers"
                className="hover:text-emerald-500 transition"
              >
                課程列表
              </NavLink>
              {isLogin && (
                <BorderButtonGreen
                  classFont={'text-sm md:text-base'}
                  classOthers={'max-w-[150px] truncate'}
                  text={`${user} 的購課紀錄`}
                  clickFunc={() => navigate('/orders')}
                />
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4 font-medium">
            <NavLink
              to="/cart"
              className=" mr-3 hover:text-emerald-500 transition relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="hidden sm:inline pr-2">購物車</span>
              <span className="sm:hidden text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
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
                clickFunc={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              />
            )}

            <button
              className="md:hidden p-2 text-emerald-600 hover:cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gray-100/70 border-b border-gray-100 flex flex-col p-4 space-y-4">
            <NavLink
              className="hover:bg-emerald-300/30 hover:cursor-pointer p-2"
              to="/news"
              onClick={() => setIsMenuOpen(false)}
            >
              最新消息
            </NavLink>
            <NavLink
              className="hover:bg-emerald-300/30 hover:cursor-pointer p-2"
              to="/teachers"
              onClick={() => setIsMenuOpen(false)}
            >
              課程列表
            </NavLink>
            {isLogin && (
              <button
                className="text-left hover:bg-emerald-300/30 hover:cursor-pointer p-2"
                onClick={() => {
                  navigate('/orders');
                  setIsMenuOpen(false);
                }}
              >
                {`${user} 的購課紀錄`}
              </button>
            )}
          </div>
        )}
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
