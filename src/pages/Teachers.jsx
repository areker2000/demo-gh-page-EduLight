import axios from 'axios';
import { useEffect, useState } from 'react';
import TeacherCard from '../components/cards/TeacherCard';
import TeacherModal from '../components/modals/TeacherModal';
import { useAuth } from '../context/AuthContext';
import LoadingBlock from '../components/LoadingBlock';
import PageTitle from '../components/PageTitle';
import SearchUnit from '../components/SearchUnit';

const Teachers = () => {
  const { API_BASE, API_PATH, setFullLoadingText, setIsFullLoading } =
    useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('所有類別');
  const [tmpQueryInput, setTmpQueryInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardId, setCardId] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const addCart = async (id, qty) => {
    try {
      const data = {
        product_id: id,
        qty: qty,
      };
      setFullLoadingText('正在加入購物車，請稍候');
      setIsFullLoading(true);

      const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });
      setShowModal(false);
      setTimeout(() => {
        setIsFullLoading(false);
      }, 300);
    } catch (error) {
      console.error('加入購物車失敗', error);
    }
  };

  useEffect(() => {
    const getTeachers = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
        setTeachers(res.data.products);
        // console.log(res.data.products);
      } catch (error) {
        console.error('取得產品失敗', error);
      } finally {
        setIsLoading(false);
      }
    };
    getTeachers();
  }, []);

  const filterOptions = [
    ...new Set(teachers.map((teacher) => teacher.category)),
  ];

  const filteredTeachers = teachers.filter(
    (teacher) =>
      (teacher.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.imagesUrl[0] // teacher's name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (selectedFilter === '所有類別' || teacher.category === selectedFilter),
  );

  const handleSearch = () => {
    setSearchQuery(tmpQueryInput);
  };

  const showSelectedTeacher = (id) => {
    setCardId(id);
    setTimeout(() => {
      setShowModal(true);
    }, 0);
  };

  return (
    <>
      <PageTitle title={'課程列表'} />

      <div className="flex items-center space-x-4 mb-8">
        <span className="text-gray-500">篩選條件：</span>
        <select
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 mr-8 focus:ring-2 focus:ring-emerald-500 outline-none"
          onChange={(e) => setSelectedFilter(e.target.value)}
          disabled={isLoading}
        >
          <option>所有類別</option>
          {filterOptions.map((opt, index) => (
            <option value={opt} key={index}>
              {opt}
            </option>
          ))}
        </select>

        <SearchUnit
          placeholder="搜尋科目名稱或教師"
          disabled={isLoading}
          textValue={tmpQueryInput}
          textChangeFunc={(e) => setTmpQueryInput(e.target.value)}
          btnClickFunc={handleSearch}
        />
      </div>

      {isLoading ? (
        <LoadingBlock />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTeachers.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400">
                找不到符合條件的教師，換個關鍵字試試看？
              </p>
            </div>
          ) : (
            filteredTeachers.map((teacher) => (
              <TeacherCard
                teacher={teacher}
                showModalFunc={() => showSelectedTeacher(teacher.id)}
                key={teacher.id}
              />
            ))
          )}
        </div>
      )}
      <TeacherModal
        isOpen={showModal}
        confirmFunc={addCart}
        closeModal={() => setShowModal(false)}
        data={teachers.find((teacher) => teacher.id === cardId)}
        initVal={1}
        btnText={['加入購物車', '回到選單']}
        selectedId={cardId}
      />
    </>
  );
};

export default Teachers;
