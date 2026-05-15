import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const [second, setSecond] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    if (second <= 0) {
      navigate('/', { replace: true });
    }
    const timer = setTimeout(() => {
      setSecond((pre) => pre - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [second, navigate]);

  return (
    <>
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-16 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="relative w-64 h-64 mx-auto mb-10">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse opacity-50"></div>
            <div className="relative flex items-center justify-center h-full">
              <span className="text-8xl font-black text-emerald-500 tracking-tighter">
                404
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            哎呀！此頁面不存在
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            您尋找的頁面可能已經移動、刪除，或是不曾存在。
            <br />
            別擔心，我們將在{' '}
            <span id="countdown" className="text-emerald-600 font-bold text-xl">
              {second}
            </span>{' '}
            秒後帶您返回首頁。
          </p>

          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition transform active:scale-95"
          >
            返回首頁
          </a>

          <div className="mt-12 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-emerald-200 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-100 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-50 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
