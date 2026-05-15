import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

import PageTitle from '../components/PageTitle';
import LoadingBlock from '../components/LoadingBlock';
import OrderCard from '../components/cards/OrderCard';
import SearchUnit from '../components/SearchUnit';
import GotoButton from '../components/buttons/GotoButton';

import type { IOrder } from '../types/orders';

const Orders = () => {
  const { isLogin, API_BASE, API_PATH } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryInput, setQueryInput] = useState('');
  const [searchResult, setSearchResult] = useState<IOrder[]>([]);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    } else {
      window.scrollTo(0, 0);
      const getOrder = async () => {
        try {
          setIsLoading(true);
          const resOrders = await axios.get(
            `${API_BASE}/api/${API_PATH}/orders`,
          );
          setOrders(resOrders.data.orders);
          // console.log(`resOrder=${JSON.stringify(resOrders.data.orders)}`);
          setSearchResult(resOrders.data.orders);
        } catch (error) {
          console.error('取得訂單失敗', error);
        } finally {
          setIsLoading(false);
        }
      };
      getOrder();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e.target.value.replace(/\D/g, ''));
  };

  const handleSearch = () => {
    setSearchResult(() =>
      queryInput.length === 0
        ? orders
        : orders?.filter((order) => order.create_at === Number(queryInput)),
    );
  };

  if (!isLogin) return null;

  return (
    <>
      <PageTitle title={'購課紀錄'}>
        <div className="m-3">
          <GotoButton target={'/teachers'} text={'回到課程列表'} />
        </div>
      </PageTitle>
      <div className="flex justify-end px-2 py-4">
        <SearchUnit
          placeholder="搜尋訂單編號"
          disabled={isLoading}
          textValue={queryInput}
          textChangeFunc={handleChange}
          btnClickFunc={handleSearch}
        />
      </div>

      {isLoading ? (
        <LoadingBlock />
      ) : searchResult?.length === 0 ? (
        <div className="col-span-full py-20 text-center">
          <p className="text-gray-400">查無此訂單編號</p>
        </div>
      ) : (
        <>
          {searchResult?.map((order) => {
            const lessonsOrdered = Object.values(order.products);
            const date = new Date(order.create_at * 1000).toLocaleDateString();
            const { name, address, email, tel } = order.user;
            let couponInfo = {
              couponFull: '',
              discount: 0,
              tmpFinalPrice: 0,
              finalPrice: 0,
            };
            try {
              couponInfo = JSON.parse(order.message);
            } catch (e) {
              console.error('Failed to parse order message:', order.message, e);
            }
            const { couponFull, discount, tmpFinalPrice, finalPrice } =
              couponInfo;
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
                {lessonsOrdered.map((lesson) => (
                  <OrderCard
                    item={lesson.product}
                    qty={Number(lesson.qty)}
                    key={lesson.id}
                  />
                ))}

                <div className="mx-4 mb-4 pt-6 border-t border-gray-100 flex justify-between items-start">
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

                  <div className="w-2/5 space-y-3">
                    {}
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
