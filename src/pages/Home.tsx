import MainImages from '../components/MainImages';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isFullLoading } = useAuth();

  return (
    <>
      {!isFullLoading && (
        <div className="w-full max-w-4xl mx-auto p-4">
          <MainImages />
          <div className=" px-6 py-6 col-span-1 md:col-span-1">
            <div className="text-2xl font-bold text-emerald-600 mb-4">
              EduLight溫柔點亮每一次學習
              <br />
              讓知識與技能，成為照亮未來最燦爛的光
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              EduLight 提供多元領域的一對一線上教學
              <br />
              從國英數等基礎學科，到
              3D建模、手工藝，甚至瑜伽等體育課程，皆由專業教師親自指導
              <br />
              學習者可依需求自由選擇課程與教師，彈性安排上課時段，並透過即時互動獲得精準回饋
              <br />
              讓每一段學習歷程，都更有效率且踏實成長
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
