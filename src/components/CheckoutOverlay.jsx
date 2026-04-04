import { useNavigate } from 'react-router';

import checkIcon from '../assets/icon/cardCheck.png';
import errorIcon from '../assets/icon/error.png';
import FilledButton from './buttons/FilledButton';
import PageTitle from './PageTitle';
import { useEffect, useState } from 'react';

const CheckoutOverlay = ({
  isOpen,
  onClose,
  orderId,
  finalPrice,
  duration = 5,
  isSuccess = true,
  checkoutErrorMsg = '請確認網路連線狀態',
}) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(duration);
  const statusConfig = {
    success: {
      icon: checkIcon,
      title: '訂單送出成功！',
      color: 'emerald',
      imageAlt: 'success',
    },
    error: {
      icon: errorIcon,
      title: '結帳失敗',
      color: 'red',
      imageAlt: 'fail',
    },
  };
  const { icon, title, color, imageAlt } =
    statusConfig[isSuccess ? 'success' : 'error'];

  useEffect(() => {
    if (!isOpen) {
      setCount(duration);
      return;
    }
    const timer = setInterval(() => {
      setCount((pre) => (pre > 0 ? pre - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, duration]);

  useEffect(() => {
    if (isOpen && count === 0) {
      onClose();
    }
  }, [count, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto px-4 py-10 outline-none focus:outline-none">
      {/* blur background */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" />

      <div
        className={`
        relative w-full max-w-lg mx-auto
        bg-white rounded-3xl shadow-2xl ${isSuccess ? 'shadow-emerald-500/10' : 'shadow-red-500/10'} 
        p-8 md:p-12
        transform transition-all duration-500 ease-out
        scale-100 opacity-100
        border border-gray-100
      `}
      >
        <div
          className={`
          absolute top-0 left-0 right-0 h-40
          bg-gradient-to-br ${isSuccess ? 'from-emerald-500 to-teal-600' : 'from-red-500 to-rose-300'} 
          rounded-t-3xl flex items-center justify-center
          overflow-hidden
        `}
        >
          {isSuccess && (
            <>
              <div className="absolute w-48 h-48 bg-white/10 rounded-full -top-10 -left-10" />
              <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-10 -right-10" />
            </>
          )}

          <div className="relative p-4 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
            <img
              src={icon}
              alt={imageAlt}
              className="h-16 w-16 filter brightness-0 invert" // convert icon to white
            />
          </div>
        </div>

        <div className="mt-36 text-center">
          <PageTitle title={title} />
          <p className="text-gray-500 mt-3 mb-8 text-base">
            {isSuccess ? '感謝您的購買！我們已收到您的訂單' : checkoutErrorMsg}
          </p>

          {isSuccess && (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-10 text-left space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">訂單編號</span>
                <span className="font-mono font-medium text-gray-800 text-xl">
                  {orderId || '載入中...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">實付金額</span>
                <span className={`text-2xl font-bold text-emerald-600`}>
                  NT$ {finalPrice?.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-12">
            {isSuccess ? (
              <>
                <FilledButton
                  classSpace={'py-4 w-full'}
                  classColorFill={color}
                  text={'查看購課紀錄'}
                  clickFunc={() => {
                    onClose();
                    navigate('/orders');
                  }}
                />
                <FilledButton
                  classSpace={'py-4 w-full'}
                  classColorFill={color}
                  text={'回到首頁'}
                  clickFunc={() => {
                    onClose();
                    navigate('/');
                  }}
                />
              </>
            ) : (
              <FilledButton
                classSpace={'py-4 w-full'}
                classColorFill={color}
                text={'回到購物車'}
                clickFunc={() => {
                  onClose();
                }}
              />
            )}
          </div>

          <p className="text-center text-sm opacity-40 mt-6">
            本視窗將於
            <span className={`font-mono font-bold text-emerald-600`}>
              {` ${count} `}
            </span>
            秒後自動關閉
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOverlay;
