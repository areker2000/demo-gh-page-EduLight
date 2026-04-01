import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import FormInput from '../components/FormInput';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

import checkIcon from '../assets/icon/tickMark.png';
import FilledButton from '../components/buttons/FilledButton';
import GotoButton from '../components/buttons/GotoButton';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const { loginSetting } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data) => {
    const { username, password } = data;
    const userData = {
      username,
      password,
      isRemember,
    };
    localStorage.setItem('EduLightUser', JSON.stringify(userData));
    loginSetting(username);
    navigate(-1);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('EduLightUser'));
    if (savedUser) {
      const { username, password, isRemember } = savedUser;
      if (isRemember) {
        setValue('username', username);
        setValue('password', password);
        setIsRemember(isRemember);
      }
    }
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-emerald-200/20 rounded-3xl p-10 soft-shadow border border-gray-100">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800">登入</h1>
              <p className="text-gray-400 mt-3 text-sm">
                歡迎回到 EduLight，開始您的學習旅程
              </p>
              <p className="text-gray-400 text-sm text-center pt-2">
                (輸入<span className="underline font-bold">使用者名稱</span>
                與符合規則的<span className="underline font-bold">密碼</span>
                即可模擬登入)
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  使用者名稱
                </label>
                <div className="relative">
                  <FormInput
                    register={register}
                    errors={errors}
                    classSpace={'px-4 py-3 w-full'}
                    type={'text'}
                    id={'username'}
                    name={'username'}
                    placeholder={'請輸入使用者名稱'}
                    rules={{ required: '使用者名稱為必須項目' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  密碼
                </label>
                <div className="relative">
                  <FormInput
                    register={register}
                    errors={errors}
                    classSpace={'px-4 py-3 w-full'}
                    type={isShowPassword ? 'text' : 'password'}
                    id={'password'}
                    name={'password'}
                    placeholder={'8-16碼，含英文大小寫與數字，不含符號'}
                    rules={{
                      required: '密碼為必須項目',
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,16}$/,
                        message: '密碼格式不符合規定',
                      },
                    }}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className={`text-xs text-green-600 mt-2 mr-2 hover:cursor-pointer hover:text-green-500`}
                      onClick={() => setIsShowPassword((pre) => !pre)}
                    >
                      {isShowPassword ? '隱藏密碼' : '顯示密碼'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      onChange={() => setIsRemember((pre) => !pre)}
                      checked={isRemember}
                    />
                    <div
                      className={`
                        w-5 h-5
                        border-2 rounded-md bg-white
                        flex items-center justify-center
                        transition-all duration-200
                        ${isRemember ? 'border-emerald-500' : 'border-gray-200'}
                      `}
                    >
                      <img
                        src={checkIcon}
                        alt="checked"
                        className={`
                          h-3 w-3
                          transition-all duration-200 ease-in-out
                          ${
                            isRemember
                              ? 'peer-checked:scale-100 peer-checked:opacity-100'
                              : 'scale-0 opacity-0'
                          }
                        `}
                      />
                    </div>
                  </div>
                  <span className="ml-2.5 text-sm text-gray-500 group-hover:text-gray-700 transition">
                    記得我的登入資訊
                  </span>
                </label>
              </div>
              <FilledButton
                type={'submit'}
                classSpace={'w-full py-4 mt-2'}
                classOthers={'text-lg'}
                disabled={false}
                text={'登入'}
              />
            </form>
          </div>

          <div className="text-center mt-8 flex items-center justify-center">
            <GotoButton target={'/'} text={'回到首頁'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
