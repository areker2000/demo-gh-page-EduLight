import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageTitle from '../components/PageTitle';
import LoadingBlock from '../components/LoadingBlock';
import CartCard from '../components/cards/CartCard';

const Orders = () => {
  const { API_BASE, API_PATH } = useAuth();
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/orders`);
        console.log(res.data.orders);
        setOrders(res.data.orders);
      } catch (error) {
        console.error('取得訂單失敗', error);
      } finally {
        setIsLoading(false);
      }
    };
    getOrder();
  }, []);

  return (
    <>
      <PageTitle title={'購課紀錄'} />

      {isLoading ? (
        <LoadingBlock />
      ) : (
        <>
          {orders?.map((order) => {
            const lessons = Object.values(order.products);
            const date = new Date(order.create_at * 1000).toLocaleDateString();
            const { name, address, email, tel } = order.user;
            const { couponFull, discount, tmpFinalPrice, finalPrice } =
              JSON.parse(order.message); // couponInfo
            console.log(order);

            return (
              <div
                key={order.id}
                className="border border-gray-300 shadow-lg rounded-xl p-4 mb-6"
              >
                <div className="flex justify-between items-center">
                  <div className="p-2 text-xl font-bold text-emerald-600">
                    訂單編號：{order.create_at}
                  </div>
                  <div className="p-2 text-gray-500/80">訂購日期：{date}</div>
                </div>
                {lessons.map((lesson) => (
                  <CartCard item={lesson} key={lesson.id} isOrdered={true} />
                ))}

                <div className="mx-4 mb-4 pt-6 border-t border-gray-100 flex justify-between items-start">
                  {/* 左側：訂購人資訊 */}
                  <div className="space-y-2 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <span className="w-20 text-gray-400">持卡人姓名</span>
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20 text-gray-400">信用卡號</span>
                      <span className="font-medium tracking-wider">
                        {address}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20 text-gray-400">E-mail</span>
                      <span className="font-medium">{email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-20 text-gray-400">手機號碼</span>
                      <span className="font-medium">{tel}</span>
                    </div>
                  </div>

                  {/* 右側：金額明細 */}
                  <div className="w-2/5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">小計</span>
                      <span className="text-gray-600">
                        NT$ {tmpFinalPrice?.toLocaleString()}
                      </span>
                    </div>

                    {couponFull && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">使用優惠碼</span>
                        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-xs font-medium">
                          {couponFull}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">折扣</span>
                      <span className="text-rose-500">
                        - NT$ {discount?.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-dashed border-gray-200">
                      <div className="flex justify-between items-end">
                        <span className="text-gray-500 font-medium mb-1">
                          總計金額
                        </span>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-emerald-500 leading-none">
                            <span className="text-lg mr-1">NT$</span>
                            {finalPrice?.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Orders;
