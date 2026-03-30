const NewsCard = ({ data, index, showModalFunc }) => {
  return (
    <article
      className="flex flex-col md:flex-row items-center p-5 bg-white rounded-2xl border border-emerald-300 soft-shadow shadow-lg group hover:shadow-emerald-400 transition-all duration-200 hover:cursor-pointer"
      onClick={() => showModalFunc(index)}
    >
      <div className="w-full md:w-48 h-32 bg-blue-50 rounded-xl flex-shrink-0 relative overflow-hidden">
        <img
          src={data.imgUrl}
          className="w-full h-full object-cover"
          alt={data.title}
        />
        <span
          className={`absolute top-2 left-2 ${data.category === '平台公告' ? 'bg-blue-500' : 'bg-emerald-500'} text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase`}
        >
          {data.category}
        </span>
      </div>
      <div className="mt-4 md:mt-0 md:ml-8 flex-1">
        <div className="flex items-center text-xs text-gray-400 mb-2">
          <span className="mr-3">{data.date}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 transition">
          {data.title}
        </h2>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {data.content}
        </p>
      </div>
      <div className=" w-1/8">
        <div className="font-bold p-4 text-emerald-400 flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;

/*
<NewsCard 
  data={''}
  index={''}
  showModalFunc={''}
/>
*/
