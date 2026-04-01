import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import LoadingBlock from '../components/LoadingBlock';
import CartCard from '../components/cards/CartCard';
import TeacherModal from '../components/modals/TeacherModal';
import BorderButtonRed from '../components/buttons/BorderButtonRed';
import BorderButtonGreen from '../components/buttons/BorderButtonGreen';
import FilledButton from '../components/buttons/FilledButton';
import FormInput from '../components/FormInput';

import visaIcon from '../assets/icon/visa.png';
import masterIcon from '../assets/icon/master.png';
import jcbIcon from '../assets/icon/jcb.png';
import checkIcon from '../assets/icon/cardCheck.png';
import { couponsData } from '../assets/WebData';
import RemoveButton from '../components/buttons/RemoveButton';
import { useNavigate } from 'react-router';
import PageTitle from '../components/PageTitle';
import GotoButton from '../components/buttons/GotoButton';
import SuccessOverlay from '../components/SuccessOverlay';

const FormLable = ({ forID, text }) => {
  return (
    <label
      className="block text-sm font-medium text-gray-500 my-2"
      htmlFor={forID}
    >
      {text}
    </label>
  );
};

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [editId, setEditId] = useState('');
  const [tmpFinalPrice, setTmpFinalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const {
    isLogin,
    isFullLoading,
    setIsFullLoading,
    setFullLoadingText,
    API_BASE,
    API_PATH,
  } = useAuth();
  const navigate = useNavigate();

  const selectedItem = useMemo(() => {
    return cartData?.find((teacher) => teacher.id === editId) || null;
  }, [cartData, editId]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartData(res.data.data.carts);
      setTmpFinalPrice(() =>
        res.data.data.carts.reduce(
          (sum, currClass) => sum + currClass.final_total,
          0,
        ),
      );

      // console.log(res.data);
    } catch (error) {
      console.error('取得購物車資訊失敗', error);
    } finally {
      setIsLoading(false);
      setIsFullLoading(false);
    }
  };

  const updateCart = async (id, qty) => {
    try {
      const data = {
        product_id: id,
        qty: qty,
      };
      setFullLoadingText('正在修改購物車，請稍候');
      setIsFullLoading(true);

      const res = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`, {
        data,
      });
      // console.log(res);
      setIsShowModal(false);
      getCart();
    } catch (error) {
      console.error('更新購物車失敗', error);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      setIsFullLoading(true);
      const res = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
      // console.log(res);
      getCart();
    } catch (error) {
      console.error('刪除單項購物車失敗', error);
    }
  };

  const deleteCartAll = async () => {
    try {
      setIsFullLoading(true);
      const res = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      // console.log(res);
      getCart();
    } catch (error) {
      console.error('刪除所有購物車失敗', error);
    }
  };

  // ========== Coupon - START ==========
  const [selectedCoupon, setSelectedCoupon] = useState([]);
  const [isCoupon, setIsCoupon] = useState(false);
  const [isWrongCoupon, setIsWrongCoupon] = useState(false);
  const [wrongCouponText, setWrongCouponText] = useState('false');
  const [discount, setDiscount] = useState(0);
  const [tmpCoupon, setTmpCoupon] = useState('');
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const couponCheck = () => {
    const checkedCoupon = couponsData.filter(
      (coupon) => coupon.code === tmpCoupon,
    );

    if (checkedCoupon.length === 0) {
      setIsCoupon(false);
      setIsWrongCoupon(true);
      setWrongCouponText(
        tmpCoupon.length === 0 ? '未輸入優惠碼' : '優惠碼不存在',
      );
    } else {
      const currCoupon = checkedCoupon[0];
      setSelectedCoupon(currCoupon);
      setIsCoupon(true);

      if (currCoupon.method === 'minus') {
        setDiscount(Number(currCoupon.value));
      } else if (currCoupon.method === 'percentage') {
        setDiscount(
          Math.round((tmpFinalPrice * (100 - currCoupon.value)) / 100),
        );
      }
    }
  };

  const deleteCoupon = () => {
    setIsCoupon(false);
    setDiscount(0);
    setIsWrongCoupon(false);
  };
  // ========== Coupon - END ==========

  // ========== Purchased Info Check - START ==========
  // Luhn Algorithm （Mod 10 check）
  const validateLuhn = (value) => {
    const nDigits = value.replace(/\D/g, '').length;
    if (nDigits < 13 || nDigits > 19) return false;

    let sum = 0;
    for (let i = 0; i < nDigits; i++) {
      let digit = parseInt(value[nDigits - 1 - i]);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { cardNumber: '', cardName: '' },
  });
  const onSubmit = (data) => {
    alter('資料已送出');
  };

  const { errors, isValid } = formState;
  const tmpCardNumber = useWatch({ control, name: 'cardNumber' }) || '';
  const showCheck =
    !errors.cardNumber && tmpCardNumber.replace(/\s+/g, '').length >= 13;
  const enableSubmitBtn_condition = isValid && cartData?.length !== 0;

  const getCardType = (number = '') => {
    const cleanNumber = number.replace(/\s+/g, '');
    if (cleanNumber.startsWith('4')) return visaIcon;
    if (/^5[1-5]/.test(cleanNumber)) return masterIcon;
    if (/^35/.test(cleanNumber)) return jcbIcon;
    return '';
  };

  const handleNumberOnly = (e) => {
    const input = e.target;
    const originalValue = input.value;
    const originCursor = input.selectionStart;

    const rawValue = originalValue.replace(/\D/g, '');
    const limitedValue = rawValue.slice(0, 16);
    const formattedValue = limitedValue.match(/.{1,4}/g)?.join(' ') || '';
    setValue('cardNumber', formattedValue, { shouldValidate: true });

    requestAnimationFrame(() => {
      const offset = formattedValue.length - originalValue.length;
      const newCursorPosition = originCursor + offset;
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    });
  };
  // ========== Purchased Info Check - END ==========

  const handleExternalSubmit = async () => {
    const formData = getValues();
    // console.log('驗證成功，準備送出資料：', formData);
    try {
      setFullLoadingText('訂單處理中，請稍候');
      setIsFullLoading(true);
      setFinalPrice(tmpFinalPrice - discount);
      const data = {
        user: {
          name: formData.cardName,
          email: formData.email,
          tel: formData.tel,
          address: formData.cardNumber,
        },
        message: JSON.stringify({
          couponFull:
            selectedCoupon?.length !== 0
              ? `${selectedCoupon?.code} (${selectedCoupon?.title})`
              : '',
          discount,
          tmpFinalPrice,
          finalPrice: tmpFinalPrice - discount,
        }),
      };
      // console.log(data);

      const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data,
      });
      // console.log(res);
      setSelectedCoupon([]);
      setDiscount(0);
      setIsCoupon(false);
      reset();
      setOrderId(res.data.create_at);
      setIsShowSuccess(true);
      getCart();
    } catch (error) {
      console.error('送出訂單失敗', error);
    }
  };

  return (
    <>
      {/* {JSON.stringify(cartData)} */}
      <PageTitle title={'購物車'} />
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            <section>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold ml-4 mb-6 text-gray-700">
                  您的選購課程
                </h2>
                <div className="pb-2">
                  <BorderButtonRed
                    disabled={cartData?.length === 0 || isLoading}
                    text={'清空購物車'}
                    clickFunc={deleteCartAll}
                  />
                </div>
              </div>
              {!cartData ? (
                <LoadingBlock />
              ) : cartData?.length === 0 ? (
                <div className="col-span-full py-20 text-center">
                  <p className="text-gray-400">
                    購物車裡沒有東西，快去選門有興趣的課吧！
                  </p>
                  <div className="text-center flex items-center justify-center pt-6">
                    <GotoButton target={'/teachers'} text={'去找課程'} />
                  </div>
                </div>
              ) : (
                <>
                  {cartData?.map((item) => (
                    <CartCard
                      item={item}
                      setIsShowModal={setIsShowModal}
                      setEditId={setEditId}
                      key={item.id}
                      deleteCartItem={deleteCartItem}
                      isOrdered={false}
                    />
                  ))}
                </>
              )}
            </section>

            {isLogin && (
              <form
                className="pt-6 border-t border-gray-100"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  付款資訊 (必填)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <FormLable forID={'cardName'} text={'持卡人姓名'} />
                    <FormInput
                      register={register}
                      errors={errors}
                      classSpace={'px-4 py-3 w-full'}
                      type={'text'}
                      id={'cardName'}
                      name={'cardName'}
                      placeholder={'請輸入姓名'}
                      rules={{ required: '姓名為必須項目' }}
                      disabled={isLoading}
                    />

                    <FormLable
                      forID={'cardNumber'}
                      text={
                        <>
                          信用卡卡號
                          <span className="pl-2 text-red-300">
                            (本欄位會檢查輸入是否符合信用卡號規範)
                          </span>
                        </>
                      }
                    />
                    <div className="relative">
                      {/* Visa(4), MasterCard(51-55), JCB(3528-3589) */}
                      <FormInput
                        register={register}
                        errors={errors}
                        classSpace={'px-4 py-3 w-full'}
                        type={'text'}
                        id={'cardNumber'}
                        name={'cardNumber'}
                        placeholder={'**** **** **** ****'}
                        rules={{
                          required: '卡號為必須項目',
                          validate: (value) => {
                            const cleanValue = value.replace(/\s+/g, '');
                            const isPatternValid =
                              /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|35(?:2[89]|[3-8][0-9])[0-9]{12})$/.test(
                                cleanValue,
                              );
                            if (!isPatternValid) return '卡號格式不正確';
                            const isLuhnValid = validateLuhn(cleanValue);
                            if (!isLuhnValid)
                              return '無效的卡號 (Luhn 檢查失敗)';
                            return true;
                          },
                        }}
                        maxLength={19}
                        disabled={isLoading}
                        changeFunc={handleNumberOnly}
                      />

                      <div className="absolute right-4 top-1.5 flex items-center gap-2">
                        {showCheck && (
                          <img src={checkIcon} alt="pass" className="h-5 w-5" />
                        )}
                        {getCardType(tmpCardNumber) === '' ? (
                          <span className="text-gray-300 text-sm py-2">
                            VISA / Master / JCB
                          </span>
                        ) : (
                          <img
                            src={getCardType(tmpCardNumber)}
                            alt="card icon"
                            className="h-10 w-10"
                          />
                        )}
                      </div>
                    </div>

                    <FormLable forID={'tel'} text={'手機號碼'} />
                    <FormInput
                      register={register}
                      errors={errors}
                      classSpace={'px-4 py-3 w-full'}
                      type={'number'}
                      id={'tel'}
                      name={'tel'}
                      placeholder={'請輸入手機號碼'}
                      rules={{
                        required: '手機號碼為必須項目',
                        pattern: {
                          value: /^09[0-9]{8}$/,
                          message: '手機號碼格式錯誤',
                        },
                      }}
                      disabled={isLoading}
                    />

                    <FormLable forID={'email'} text={'E-mail (選填)'} />
                    <FormInput
                      register={register}
                      errors={errors}
                      classSpace={'px-4 py-3 w-full'}
                      type={'text'}
                      id={'email'}
                      name={'email'}
                      placeholder={'請輸入E-mail'}
                      rules={{
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'E-mail格式錯誤',
                        },
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-gray-300/30 text-gray-900 p-8 rounded-3xl sticky top-24 shadow-2xl shadow-gray-200">
              <h2 className="text-lg font-medium mb-6 opacity-70">費用明細</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">小計</span>
                  <span>NT$ {tmpFinalPrice.toLocaleString()}</span>
                </div>
                {isLogin && (
                  <div>
                    <span className="opacity-60">優惠碼</span>
                    {isCoupon ? (
                      <div className="flex justify-between">
                        <div className="px-3 py-1 w-2/3">
                          <span className="text-sm">
                            {selectedCoupon?.code}
                          </span>
                          <br />
                          <span className="text-xs text-emerald-500">
                            {selectedCoupon?.title}
                          </span>
                        </div>

                        <RemoveButton
                          text={'刪除優惠碼'}
                          clickFunc={deleteCoupon}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between  mt-1">
                          <input
                            type="text"
                            className={`px-3 py-1 w-2/3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition 
                              ${isLoading ? 'bg-gray-200' : 'bg-white'}`}
                            placeholder="請輸入優惠碼"
                            disabled={isLoading}
                            onChange={(e) => setTmpCoupon(e.target.value)}
                            onMouseDown={() => setIsWrongCoupon(false)}
                          />
                          <BorderButtonGreen
                            classSpace={'px-3'}
                            text={'套用'}
                            disabled={isLoading}
                            clickFunc={couponCheck}
                          />
                        </div>
                        {isWrongCoupon && (
                          <div className="text-xs text-red-500 pl-2 mt-1">
                            {wrongCouponText}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="opacity-60">折扣</span>
                  <span className="text-emerald-500 font-bold">
                    - NT$ {discount.toLocaleString()}
                  </span>
                </div>
                <hr className="border-gray-800 my-4" />
                <div>
                  <div className="text-base pb-2">總計金額</div>
                  <div className="text-3xl font-bold text-emerald-500">
                    NT$ {(tmpFinalPrice - discount).toLocaleString()}
                  </div>
                </div>
              </div>

              {isLogin ? (
                <>
                  <FilledButton
                    classSpace={'mt-8 py-4 w-full'}
                    text={
                      enableSubmitBtn_condition
                        ? '確認並支付'
                        : `${isFullLoading ? '處理中' : '請先選課並填寫資訊'}`
                    }
                    disabled={!enableSubmitBtn_condition}
                    clickFunc={handleExternalSubmit}
                  />

                  <p className="text-center text-xs opacity-40 mt-4">
                    點擊按鈕送出後，
                    <br />
                    可至購課紀錄查看明細
                  </p>
                </>
              ) : (
                <div className="w-full text-center mt-8">
                  <BorderButtonRed
                    classSpace={'p-4'}
                    text={'請先登入以繼續購物'}
                    clickFunc={() => navigate('/login')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SuccessOverlay
        isOpen={isShowSuccess}
        onClose={() => setIsShowSuccess(false)}
        orderId={orderId}
        finalPrice={finalPrice}
      />

      <TeacherModal
        isOpen={isShowModal}
        confirmFunc={updateCart}
        closeModal={() => {
          setIsShowModal(false);
          setTimeout(() => {
            setEditId('');
          }, 200);
        }}
        data={selectedItem?.product}
        initVal={selectedItem?.qty || 1}
        btnText={['修改時數', '回到購物車']}
        selectedId={editId}
      />
    </>
  );
};

export default Cart;
