import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import NumberSelector from '../NumberSelector';
import FilledButton from '../buttons/FilledButton';

const TeacherModal = ({
  isOpen,
  confirmFunc,
  closeModal,
  data,
  initVal,
  btnText,
  selectedId,
}) => {
  const [qty, setQty] = useState(initVal);
  const btnClassSpace = 'w-32 px-6 py-2';

  useEffect(() => {
    setQty(initVal);
  }, [isOpen, initVal]);

  if (!data) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <img
                      src={data.imageUrl}
                      alt={data.imagesUrl[0]}
                      className="w-full h-48 md:h-64 object-cover rounded-xl shadow-inner"
                    />

                    <div className="flex justify-center flex-col space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-4">
                        預約時數 (小時)
                      </label>
                      <NumberSelector
                        qty={qty}
                        setQty={setQty}
                        classWidth={'w-auto'}
                      />
                      <div className="text-emerald-600 font-bold text-xl py-2">
                        小計：NT$ {(data.price * qty).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-2/3 flex flex-col">
                    <div className="mb-2">
                      <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-md font-bold uppercase">
                        {data.category}
                      </span>
                      <span
                        className={`px-2 py-1 bg-amber-100 rounded mb-4 text-amber-700 text-[14px] rounded-md font-bold uppercase`}
                      >
                        {data.unit}
                      </span>
                    </div>

                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-gray-900 mb-2"
                    >
                      {data.title}
                      <div className="text-emerald-600 font-bold text-xl py-2">
                        NT$ {data.price?.toLocaleString()} / 小時
                      </div>
                    </Dialog.Title>

                    <p className="text-gray-500 text-sm mb-4">
                      授課教師：{data.imagesUrl?.[0] || '專業講師'}
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg flex-1">
                      <h4 className="font-bold text-gray-700 text-sm mb-2 space-y-4">
                        講師介紹
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed pb-6">
                        {data.description}
                      </p>
                      <ul>
                        {data.imagesUrl.map((item, index) => {
                          if (index >= 1) {
                            return (
                              <li key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </span>
                                <span className="text-gray-600 text-sm">
                                  {item}
                                </span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between ">
                  <FilledButton
                    classSpace={btnClassSpace}
                    text={btnText[0]}
                    clickFunc={() => confirmFunc(selectedId, qty)}
                  />

                  <FilledButton
                    classSpace={btnClassSpace}
                    classColorFill={'amber'}
                    text={btnText[1]}
                    clickFunc={closeModal}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TeacherModal;

// <TeacherModal
//   isOpen={isShowModal}
//   confirmFunc={updateCart}
//   closeModal={() => setIsShowModal(false)}
//   data={selectedItem?.product}
//   initVal={selectedItem?.qty || 1}
//   btnText={['confirmBtnText', 'closeBtnText']}
//   selectedId={editId}
// />;
