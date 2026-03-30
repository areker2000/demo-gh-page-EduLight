const TeacherCard = ({ teacher, showModalFunc }) => {
  return (
    <div
      className="flex flex-col h-full bg-white rounded-2xl overflow-hidden soft-shadow hover:shadow-lg hover:shadow-emerald-100 hover:-translate-y-2 transition duration-300 border-emerald-300 border-1 hover:cursor-pointer"
      onClick={() => showModalFunc(teacher.id)}
    >
      <div className="h-40 bg-gray-200 relative">
        <div className="h-40 bg-gray-200 relative  overflow-hidden">
          <img
            src={teacher.imageUrl}
            alt={teacher.imagesUrl[0]}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="h-6 w-fit rounded mb-4">
          <span
            className={`px-2 py-1 bg-emerald-500 rounded mb-4 text-white text-[14px] rounded-md font-bold uppercase`}
          >
            {teacher.category}
          </span>
          <span
            className={`px-2 py-1 bg-amber-500 rounded mb-4 text-white text-[14px] rounded-md font-bold uppercase`}
          >
            {teacher.unit}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 transition">
            {teacher.title}
          </h2>

          <h4 className="text-emerald-600 font-bold pb-4">
            NT$ {teacher.price?.toLocaleString()} / 小時
          </h4>
          <h4 className="font-bold text-gray-800 transition">
            教師：{teacher.imagesUrl[0]}
          </h4>
          <p className="text-gray-500 text-sm mt-2">{teacher.description}</p>
        </div>

        <div className="text-center mt-auto">
          <div className="rounded-xl bg-emerald-50 text-emerald-600 font-bold mt-6 px-4 py-2">
            點擊卡片 查看更多
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;

/*
<TeacherCard
  teacher={''}
  showModalFunc={''}
/>
*/
