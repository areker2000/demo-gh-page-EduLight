import { useEffect, useState } from 'react';
import { newsData } from '../assets/WebData';
import NewsCard from '../components/cards/NewsCard';
import NewsModal from '../components/modals/NewsModal';
import PageTitle from '../components/PageTitle';

import type { INews } from '../types/localData';

const News = () => {
  const [data, setData] = useState<INews[]>([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setData(newsData);
  }, []);

  const showSelectedModal = (index: number) => {
    setModalIndex(index);
    setShowModal(true);
  };

  return (
    <>
      <PageTitle
        title={'最新消息'}
        subtitle={'追蹤 EduLight 平台的最新活動與教學資訊'}
      />
      <div className="space-y-6">
        {data.map((item, index) => (
          <NewsCard
            key={item.id}
            data={item}
            index={index}
            showModalFunc={() => showSelectedModal(index)}
          />
        ))}
      </div>

      <NewsModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        newsData={data[modalIndex]}
      />
    </>
  );
};

export default News;
