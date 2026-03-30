import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import FilledButton from '../buttons/FilledButton';

const NewsModal = ({ isOpen, closeModal, newsData }) => {
  if (!newsData) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-8 md:p-12 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <span
                    className={`${newsData.category === '平台公告' ? 'bg-blue-500' : 'bg-emerald-500'} text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider`}
                  >
                    {newsData.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {newsData.date}
                  </span>
                </div>

                <Dialog.Title
                  as="h2"
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight"
                >
                  {newsData.title}
                </Dialog.Title>

                <div className="prose prose-emerald">
                  <div className="w-full h-64 rounded-2xl mb-6 flex items-center justify-center border border-dashed border-emerald-100 overflow-hidden relative">
                    <img
                      src={newsData.imgUrl}
                      alt={newsData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {newsData.content.map((item, index) => (
                    <p
                      className="text-gray-600 leading-relaxed text-sm md:text-base"
                      key={index}
                    >
                      {item}
                    </p>
                  ))}
                </div>

                <div className="mt-10 border-t border-gray-50 text-right">
                  <FilledButton text={'回到列表'} clickFunc={closeModal} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewsModal;

/*
<NewsModal
  isOpen={showModal}
  closeModal={() => setShowModal(false)}
  newsData={newsData[modalIndex]}
/>;
*/
